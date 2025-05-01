import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent {
  GenderArray: any[] = [];
  currentGender: any = {
    id: '',
    Name: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllGenders();
  }

  getAllGenders() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/gender`).subscribe(
      (resultData: any) => {
        this.GenderArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading genders.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
  const modalElement = document.getElementById('addGenderModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(genderItem: any) {
    this.currentGender = { ...genderItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentGender.Name?.trim();

    if (this.showNameError) {
      return;
    }

    if (!this.currentGender.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/gender`, this.currentGender).subscribe(
      () => {
        this.alertSuccess('Gender added successfully!');
        this.getAllGenders();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding gender:', error);
        this.alertError('Failed to add gender!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/gender/${this.currentGender.id}`,
        this.currentGender
      )
      .subscribe(
        () => {
          this.alertSuccess('Gender updated successfully!');
          this.getAllGenders();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating gender:', error);
          this.alertError('Failed to update gender!');
        }
      );
  }

  confirmDelete(gender: any) {
    this.currentGender = { ...gender };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteGender() {
    if (this.currentGender.id) {
      this.deleteRecord(this.currentGender);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(gender: any) {
    this.http.delete(`${apiBaseUrl}api/gender/${gender.id}`).subscribe(
      () => {
        this.alertSuccess('Gender deleted successfully!');
        this.getAllGenders();
      },
      (error) => {
        console.error('Error deleting gender:', error);
        this.alertError('Failed to delete gender!');
      }
    );
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
    this.currentGender = {
      id: '',
      Name: '',
    };
    this.showNameError = false;
  }

  trackById(index: number, genderItem: any): number {
    return genderItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addGenderModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        // fallback for first-time close
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
