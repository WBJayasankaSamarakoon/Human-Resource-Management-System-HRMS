import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
  AssetArray: any[] = [];
  currentAsset: any = {
    id: '',
    serial_no: '',
    name: '',
    description: ''
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllAssets();
  }

  getAllAssets() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/assets`).subscribe(
      (resultData: any) => {
        this.AssetArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading assets.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    const modalElement = document.getElementById('addAssetModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  openEditModal(assetItem: any) {
    this.currentAsset = { ...assetItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    if (!this.currentAsset.serial_no?.trim() || !this.currentAsset.name?.trim()) {
      this.showNameError = true;
      return;
    }

    this.showNameError = false;

    if (!this.currentAsset.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    const postData = {
      serial_no: this.currentAsset.serial_no,
      name: this.currentAsset.name,
      description: this.currentAsset.description
    };

    this.http.post(`${apiBaseUrl}api/assets`, postData).subscribe(
      () => {
        this.alertSuccess('Asset added successfully!');
        this.getAllAssets();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding asset:', error);
        this.alertError('Failed to add asset!');
      }
    );
  }

updateRecords() {
  const updateData = {
    serial_no: this.currentAsset.serial_no,
    name: this.currentAsset.name,
    description: this.currentAsset.description
  };

  this.http.put(`${apiBaseUrl}api/assets/${this.currentAsset.id}`, updateData).subscribe(
    () => {
      this.alertSuccess('Asset updated successfully!');
      this.getAllAssets();
      this.resetForm();
      this.closeModal();
    },
    (error) => {
      console.error('Error updating asset:', error);
      this.alertError('Failed to update asset!');
    }
  );
}

  confirmDelete(asset: any) {
    this.currentAsset = { ...asset };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteAsset() {
    if (this.currentAsset.id) {
      this.deleteRecord(this.currentAsset);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(asset: any) {
    this.http.delete(`${apiBaseUrl}api/assets/${asset.id}`).subscribe(() => {
      this.alertSuccess('Asset deleted successfully!');
      this.getAllAssets();
    });
  }

  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
  }

  alertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  alertError(message: string) {
    this.showAlert(message, 'error');
  }

  showAlert(message: string, type: string) {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.innerText = message;
      alertBox.className = `alert-box visible ${type}`;
      setTimeout(() => {
        alertBox.classList.remove('visible');
      }, 3000);
    }
  }

  resetForm() {
    this.currentAsset = {
      id: '',
      serial_no: '',
      name: '',
      description: ''
    };
  }

  clearValidationErrors() {
    const formElements = document.querySelectorAll(
      '.form-control.ng-dirty, .form-control.ng-touched'
    );
    formElements.forEach((element) => {
      element.classList.remove('ng-dirty', 'ng-touched');
    });
  }

  trackById(index: number, assetItem: any): number {
    return assetItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addAssetModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
