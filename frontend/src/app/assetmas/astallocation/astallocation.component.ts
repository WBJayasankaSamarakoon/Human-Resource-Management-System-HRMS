import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-astallocation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './astallocation.component.html',
  styleUrls: ['./astallocation.component.scss']
})
export class AstallocationComponent {
  AllocationArray: any[] = [];
  EmployeeArray: any[] = [];
  AssetArray: any[] = [];
  currentAllocation: any = {
    id: '',
    emp_id: '',
    asset_id: '',
    give_date: '',
    handover_date: '',
    description: ''
  };
  isLoading: boolean = false;
  showError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllAllocations();
    this.getAllEmployees();
    this.getAllAssets();
  }

  getAllAllocations() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/assetallocation`).subscribe(
      (resultData: any) => {
        this.AllocationArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading allocations.');
        this.isLoading = false;
      }
    );
  }

  getAllEmployees() {
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe(
      (resultData: any) => {
        this.EmployeeArray = Array.isArray(resultData) ? resultData : [];
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  getAllAssets() {
    this.http.get(`${apiBaseUrl}api/assets`).subscribe(
      (resultData: any) => {
        this.AssetArray = Array.isArray(resultData) ? resultData : [];
      },
      (error) => {
        console.error('Error loading assets:', error);
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showError = false;
    const modalElement = document.getElementById('addAllocationModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  openEditModal(allocationItem: any) {
    this.currentAllocation = { ...allocationItem };
    this.showError = false;
    const modalElement = document.getElementById('editAllocationModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  save() {
    if (!this.currentAllocation.emp_id || !this.currentAllocation.asset_id || !this.currentAllocation.give_date) {
      this.showError = true;
      return;
    }

    this.showError = false;

    if (!this.currentAllocation.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    const postData = {
      emp_id: this.currentAllocation.emp_id,
      asset_id: this.currentAllocation.asset_id,
      give_date: this.currentAllocation.give_date,
      handover_date: this.currentAllocation.handover_date,
      description: this.currentAllocation.description
    };

    this.http.post(`${apiBaseUrl}api/assetallocation`, postData).subscribe(
      () => {
        this.alertSuccess('Allocation added successfully!');
        this.getAllAllocations();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding allocation:', error);
        this.alertError('Failed to add allocation!');
      }
    );
  }

  updateRecords() {
    const updateData = {
      emp_id: this.currentAllocation.emp_id,
      asset_id: this.currentAllocation.asset_id,
      give_date: this.currentAllocation.give_date,
      handover_date: this.currentAllocation.handover_date,
      description: this.currentAllocation.description
    };

    this.http.put(`${apiBaseUrl}api/assetallocation/${this.currentAllocation.id}`, updateData).subscribe(
      () => {
        this.alertSuccess('Allocation updated successfully!');
        this.getAllAllocations();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating allocation:', error);
        this.alertError('Failed to update allocation!');
      }
    );
  }

  confirmDelete(allocation: any) {
    this.currentAllocation = { ...allocation };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteAllocation() {
    if (this.currentAllocation.id) {
      this.deleteRecord(this.currentAllocation);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(allocation: any) {
    this.http.delete(`${apiBaseUrl}api/assetallocation/${allocation.id}`).subscribe(() => {
      this.alertSuccess('Allocation deleted successfully!');
      this.getAllAllocations();
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
    this.currentAllocation = {
      id: '',
      emp_id: '',
      asset_id: '',
      give_date: '',
      handover_date: '',
      description: ''
    };
  }

  trackById(index: number, allocationItem: any): number {
    return allocationItem.id;
  }

  closeModal() {
    const addModal = document.getElementById('addAllocationModal');
    const editModal = document.getElementById('editAllocationModal');

    if (addModal) {
      const addModalInstance = (window as any).bootstrap?.Modal.getInstance(addModal);
      if (addModalInstance) {
        addModalInstance.hide();
      }
    }

    if (editModal) {
      const editModalInstance = (window as any).bootstrap?.Modal.getInstance(editModal);
      if (editModalInstance) {
        editModalInstance.hide();
      }
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
}
