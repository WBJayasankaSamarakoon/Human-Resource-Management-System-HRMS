import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-shift',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
})
export class ShiftComponent {
  ShiftArray: any[] = [];
  currentShift: any = {
    id: '',
    StartTime: '',
    EndTime: '',
    Week: '',
  };
  isLoading: boolean = false;
  // showStartTimeError: boolean = false;
  // showEndTimeError: boolean = false;
  showWeekError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllShifts();
  }

  getAllShifts() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/shift`).subscribe(
      (resultData: any) => {
        this.ShiftArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading shifts.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    // this.showStartTimeError = false;
    // this.showEndTimeError = false;
    this.showWeekError = false;
    this.removeModalFade();
  }

  openEditModal(shiftItem: any) {
    this.currentShift = { ...shiftItem };
    // this.showStartTimeError = false;
    // this.showEndTimeError = false;
    this.showWeekError = false;
    this.removeModalFade();
  }

  save() {
    // this.showStartTimeError = !this.currentShift.StartTime?.trim();
    // this.showEndTimeError = !this.currentShift.EndTime?.trim();
    this.showWeekError = !this.currentShift.Week?.trim();

    // this.showStartTimeError || this.showEndTimeError ||

    if (this.showWeekError ) {
      return;
    }

    if (!this.currentShift.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/shift`, this.currentShift).subscribe(
      () => {
        this.alertSuccess('Shift added successfully!');
        this.getAllShifts();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding shift:', error);
        this.alertError('Failed to add shift!');
      }
    );
  }

  updateRecords() {
    this.http.put(`${apiBaseUrl}api/shift/${this.currentShift.id}`, this.currentShift).subscribe(
      () => {
        this.alertSuccess('Shift updated successfully!');
        this.getAllShifts();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating shift:', error);
        this.alertError('Failed to update shift!');
      }
    );
  }

  confirmDelete(shift: any) {
    this.currentShift = { ...shift };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteShift() {
    if (this.currentShift.id) {
      this.deleteRecord(this.currentShift);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(shift: any) {
    this.http.delete(`${apiBaseUrl}api/shift/${shift.id}`).subscribe(
      () => {
        this.alertSuccess('Shift deleted successfully!');
        this.getAllShifts();
      },
      (error) => {
        console.error('Error deleting shift:', error);
        this.alertError('Failed to delete shift!');
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
    this.currentShift = {
      id: '',
      StartTime: '',
      EndTime: '',
      Week: '',
    };
    // this.showWeekError = false;
    // this.showStartTimeError = false;
    // this.showEndTimeError = false;
  }

  trackById(index: number, shiftItem: any): number {
    return shiftItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addShiftModal') as HTMLElement;
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
