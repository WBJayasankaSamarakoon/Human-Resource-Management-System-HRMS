import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
})
export class HolidayComponent {
  HolidayArray: any[] = [];
  currentHoliday: any = {
    id: '',
    Title: '',
    Date: '',
  };
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.getAllHolidays();
  }

  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }

  getAllHolidays() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/events`).subscribe(
      (resultData: any) => {
        this.HolidayArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading holidays.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
  }

  openEditModal(holidayItem: any) {
    this.currentHoliday = { ...holidayItem };
  }

  save() {
    if (!this.currentHoliday.Title?.trim()) {
      this.alertError('Holiday Title is required!');
      return;
    }

    if (!this.currentHoliday.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/events`, this.currentHoliday).subscribe(
      () => {
        this.alertSuccess('Holiday added successfully!');
        this.getAllHolidays();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding holiday:', error);
        this.alertError('Failed to add holiday!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/events/${this.currentHoliday.id}`,
        this.currentHoliday
      )
      .subscribe(
        () => {
          this.alertSuccess('Holiday updated successfully!');
          this.getAllHolidays();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating holiday:', error);
          this.alertError('Failed to update holiday!');
        }
      );
  }

  confirmDelete(holiday: any) {
    this.currentHoliday = { ...holiday };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteHoliday() {
    if (this.currentHoliday.id) {
      this.deleteRecord(this.currentHoliday);
      this.closeConfirmationModal();
    }
  }

  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
  }

  deleteRecord(holiday: any) {
    this.http.delete(`${apiBaseUrl}api/events/${holiday.id}`).subscribe(
      () => {
        this.alertSuccess('Holiday deleted successfully!');
        this.getAllHolidays();
      },
      (error) => {
        console.error('Error deleting holiday:', error);
        this.alertError('Failed to delete holiday!');
      }
    );
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
      alertBox.className = `visible ${type}`;
      setTimeout(() => {
        alertBox.classList.remove('visible', type);
      }, 3000);
    }
  }

  resetForm() {
    this.currentHoliday = {
      id: '',
      Title: '',
      Date: '',
    };
  }

  trackById(index: number, holidayItem: any): number {
    return holidayItem.id;
  }
}
