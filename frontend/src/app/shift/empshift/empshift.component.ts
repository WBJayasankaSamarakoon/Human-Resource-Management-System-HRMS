import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-empshift',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empshift.component.html',
  styleUrls: ['./empshift.component.scss'],
})
export class EmpshiftComponent {
  EmpShiftArray: any[] = [];
  currentEmpShift: any = {
    id: '',
    Name: '',
    Description: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllEmpShifts();
  }

  getAllEmpShifts() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/empshift`).subscribe(
      (resultData: any) => {
        this.EmpShiftArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading employee shifts.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.removeModalFade();
  }

  openEditModal(empShiftItem: any) {
    this.currentEmpShift = { ...empShiftItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentEmpShift.Name?.trim();

    if (this.showNameError) {
      return;
    }

    if (!this.currentEmpShift.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/empshift`, this.currentEmpShift).subscribe(
      () => {
        this.alertSuccess('Employee shift added successfully!');
        this.getAllEmpShifts();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding employee shift:', error);
        this.alertError('Failed to add employee shift!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/empshift/${this.currentEmpShift.id}`,
        this.currentEmpShift
      )
      .subscribe(
        () => {
          this.alertSuccess('Employee shift updated successfully!');
          this.getAllEmpShifts();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating employee shift:', error);
          this.alertError('Failed to update employee shift!');
        }
      );
  }

  confirmDelete(empShift: any) {
    this.currentEmpShift = { ...empShift };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteEmpShift() {
    if (this.currentEmpShift.id) {
      this.http
        .delete(`${apiBaseUrl}api/empshift/${this.currentEmpShift.id}`)
        .subscribe(
          () => {
            this.alertSuccess('Employee shift deleted successfully!');
            this.getAllEmpShifts();
            this.closeConfirmationModal();
          },
          (error) => {
            console.error('Error deleting employee shift:', error);
            this.alertError('Failed to delete employee shift!');
          }
        );
    }
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
    this.currentEmpShift = {
      id: '',
      Name: '',
      Description: '',
    };
    this.showNameError = false;
  }

  closeModal() {
    const modal = document.getElementById('addEmpShiftModal') as HTMLElement;
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

  trackById(index: number, empShiftItem: any): number {
    return empShiftItem.id;
  }
}
