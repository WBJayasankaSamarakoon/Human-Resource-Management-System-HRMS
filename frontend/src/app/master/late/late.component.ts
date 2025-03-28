import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-late',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './late.component.html',
  styleUrls: ['./late.component.scss'],
})
export class LateComponent {
  lateDeductions: any[] = [];
  currentLate: any = {
    id: '',
    from_min: null,
    to_min: '',
    deduction_min: null,
  };
  isLoading: boolean = false;
  showEmployeeError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLateDeductions();
  }

  getAllLateDeductions() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/late`).subscribe(
      (resultData: any) => {
        this.lateDeductions = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading late deductions.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
    this.removeModalFade();
  }

  openEditModal(lateItem: any) {
    this.currentLate = { ...lateItem };
    this.showEmployeeError = false;
    this.removeModalFade();
  }


  save() {
    if (this.currentLate.from_min === null || this.currentLate.deduction_min === null) {
      this.alertError('From (min) and Deduction (min) are required!');
      return;
    }
    if (this.currentLate.id === '' || this.currentLate.id === null) {
      this.register();
    } else {
      this.updateRecords().then(() => this.closeEditModal());

    }
  }

  closeEditModal() {
    const editModal = document.getElementById('editLateModal') as HTMLElement;
    if (editModal) {
      editModal.classList.remove('show');
      editModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.removeModalFade();
    }
  }


  register() {
    this.http.post(`${apiBaseUrl}api/late`, this.currentLate).subscribe(
      () => {
        this.alertSuccess('Late deduction added successfully!');
        this.getAllLateDeductions();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding late deduction:', error);
        this.alertError('Failed to add late deduction!');
      }
    );
  }

  updateRecords() {
    return new Promise<void>((resolve, reject) => {
      this.http.put(`${apiBaseUrl}api/late/${this.currentLate.id}`, this.currentLate).subscribe(
        () => {
          this.alertSuccess('Late deduction updated successfully!');
          this.getAllLateDeductions();
          this.resetForm();
          resolve();
        },
        (error) => {
          console.error('Error updating late deduction:', error);
          this.alertError('Failed to update late deduction!');
          reject(error);
        }
      );
    });
  }

  confirmDelete(late: any) {
    this.currentLate = { ...late };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteLateDeduction() {
    if (this.currentLate.id) {
      this.deleteRecord(this.currentLate);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(late: any) {
    this.http.delete(`${apiBaseUrl}api/late/${late.id}`).subscribe(
      () => {
        this.alertSuccess('Late deduction deleted successfully!');
        this.getAllLateDeductions();
      },
      (error) => {
        console.error('Error deleting late deduction:', error);
        this.alertError('Failed to delete late deduction!');
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
    this.currentLate = {
      id: '',
      from_min: null,
      to_min: '',
      deduction_min: null,
    };
    this.showEmployeeError = false;
  }

  trackById(index: number, lateItem: any): number {
    return lateItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addLateModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
