import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-adddeductions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adddeductions.component.html',
  styleUrl: './adddeductions.component.scss'
})
export class AdddeductionsComponent {

  deductionsArray: any[] = [];
  currentDeduction: any = {
    id: '',
    Name: '',
  };
  isLoading: boolean = false;
  showDeductionNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllDeductions();
  }

  getAllDeductions() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/adddeduction`).subscribe(
      (resultData: any) => {
        this.deductionsArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading deductions.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showDeductionNameError = false;
    this.removeModalFade();
  }

  openEditModal(deductionItem: any) {
    this.currentDeduction = { ...deductionItem };
    this.showDeductionNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showDeductionNameError = !this.currentDeduction.Name?.trim();

    if (this.showDeductionNameError) {
      return;
    }

    if (!this.currentDeduction.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/adddeduction`, this.currentDeduction)
      .subscribe(
        () => {
          this.alertSuccess('Deduction added successfully!');
          this.getAllDeductions();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding deduction:', error);
          this.alertError('Failed to add deduction!');
        }
      );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/adddeduction/${this.currentDeduction.id}`,
        this.currentDeduction
      )
      .subscribe(
        () => {
          this.alertSuccess('Deduction updated successfully!');
          this.getAllDeductions();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating deduction:', error);
          this.alertError('Failed to update deduction!');
        }
      );
  }

  confirmDelete(deduction: any) {
    this.currentDeduction = { ...deduction };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteDeduction() {
    if (this.currentDeduction.id) {
      this.deleteRecord(this.currentDeduction);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(deduction: any) {
    this.http
      .delete(`${apiBaseUrl}api/adddeduction/${deduction.id}`)
      .subscribe(
        () => {
          this.alertSuccess('Deduction deleted successfully!');
          this.getAllDeductions();
        },
        (error) => {
          console.error('Error deleting deduction:', error);
          this.alertError('Failed to delete deduction!');
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
    this.currentDeduction = {
      id: '',
      Name: '',
    };
    this.showDeductionNameError = false;
  }

  trackById(index: number, deductionItem: any): number {
    return deductionItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addDeductionModal') as HTMLElement;
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
