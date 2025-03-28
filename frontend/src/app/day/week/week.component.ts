import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent {
  WeekArray: any[] = [];
  currentWeek: any = { id: '', Day: '' };
  isLoading: boolean = false;
  showDaysError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllWeeks();
  }

  getAllWeeks() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/week`).subscribe(
      (resultData: any) => {
        this.WeekArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading weeks.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showDaysError = false;
    this.removeModalFade();
  }

  openEditModal(weekItem: any) {
    this.currentWeek = { ...weekItem };
    this.showDaysError = false;
    this.removeModalFade();
  }

  save() {
    if (!this.currentWeek.Day?.trim()) {
      this.showDaysError = true;
      return;
    }

    this.showDaysError = false;

    if (!this.currentWeek.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/week`, this.currentWeek).subscribe(
      () => {
        this.alertSuccess('Week Day added successfully!');
        this.getAllWeeks();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding Week Day:', error);
        this.alertError('Failed to add week!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/week/${this.currentWeek.id}`, this.currentWeek)
      .subscribe(
        () => {
          this.alertSuccess('Week Day updated successfully!');
          this.getAllWeeks();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating Week Day:', error);
          this.alertError('Failed to update Week Day!');
        }
      );
  }

  confirmDelete(week: any) {
    this.currentWeek = { ...week };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteWeek() {
    if (this.currentWeek.id) {
      this.deleteRecord(this.currentWeek);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(week: any) {
    this.http.delete(`${apiBaseUrl}api/week/${week.id}`).subscribe(() => {
      this.alertSuccess('Week Day deleted successfully!');
      this.getAllWeeks();
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
    this.currentWeek = { id: '', Day: '' };
  }

  trackById(index: number, weekItem: any): number {
    return weekItem.id;
  }

  closeModal() {
    const modal = document.querySelector('.modal.show') as HTMLElement;
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
