import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaveday',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leaveday.component.html',
  styleUrls: ['./leaveday.component.scss'],
})
export class LeavedayComponent {
  leaveDaysArray: any[] = [];
  currentLeaveDay: any = {
    id: '',
    Name: '',
    Value: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  showValueError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLeaveDays();
  }

  getAllLeaveDays() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leaveday`).subscribe(
      (resultData: any) => {
        this.leaveDaysArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading leave days.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.showValueError = false;
    this.removeModalFade();
  }

  openEditModal(leaveDayItem: any) {
    this.currentLeaveDay = { ...leaveDayItem };
    this.showNameError = false;
    this.showValueError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentLeaveDay.Name?.trim();
    this.showValueError = !this.currentLeaveDay.Value;

    if (this.showNameError || this.showValueError) {
      return;
    }

    if (!this.currentLeaveDay.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/leaveday`, this.currentLeaveDay).subscribe(
      () => {
        this.alertSuccess('Leave Day added successfully!');
        this.getAllLeaveDays();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding leave day:', error);
        this.alertError('Failed to add leave day!');
      }
    );
  }

  updateRecords() {
    this.http.put(`${apiBaseUrl}api/leaveday/${this.currentLeaveDay.id}`, this.currentLeaveDay).subscribe(
      () => {
        this.alertSuccess('Leave Day updated successfully!');
        this.getAllLeaveDays();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating leave day:', error);
        this.alertError('Failed to update leave day!');
      }
    );
  }

  confirmDelete(leaveDay: any) {
    this.currentLeaveDay = { ...leaveDay };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteLeaveDay() {
    if (this.currentLeaveDay.id) {
      this.http.delete(`${apiBaseUrl}api/leaveday/${this.currentLeaveDay.id}`).subscribe(
        () => {
          this.alertSuccess('Leave Day deleted successfully!');
          this.getAllLeaveDays();
          this.closeConfirmationModal();
        },
        (error) => {
          console.error('Error deleting leave day:', error);
          this.alertError('Failed to delete leave day!');
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
    this.currentLeaveDay = {
      id: '',
      Name: '',
      Value: '',
    };
    this.showNameError = false;
    this.showValueError = false;
  }

  trackById(index: number, leaveDayItem: any): number {
    return leaveDayItem.id;
  }

  closeModal() {
    const addModal = document.getElementById('addLeaveDayModal') as HTMLElement;
    const editModal = document.getElementById('editLeaveDayModal') as HTMLElement;

    if (addModal && addModal.classList.contains('show')) {
      addModal.classList.remove('show');
      addModal.style.display = 'none';
    }

    if (editModal && editModal.classList.contains('show')) {
      editModal.classList.remove('show');
      editModal.style.display = 'none';
    }

    this.removeModalFade();
  }


  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
