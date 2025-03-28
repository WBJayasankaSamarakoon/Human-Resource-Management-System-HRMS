import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../../app.config';

@Component({
  selector: 'app-adrecord',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adrecord.component.html',
  styleUrls: ['./adrecord.component.scss'],
})
export class AdrecordComponent {
  records: any[] = [];
  employees: any[] = [];
  currentRecord: any = {
    emp_id: null,
    date: '',
    check_in: '',
    check_out: '',
  };
  isLoading: boolean = false;
  showEmployeeError: boolean = false;
  isModalOpen: boolean = false; // Track modal visibility

  constructor(private http: HttpClient) {
    this.getAllEmployees();
  }

  // Fetch all employees
  getAllEmployees() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe(
      (resultData: any) => {
        this.employees = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading employees.');
        this.isLoading = false;
      }
    );
  }

  // Open modal for adding a new employee record
  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
    this.isModalOpen = true; // Show modal
  }

  // Save the employee record (either add or update)
  saveRecord() {
    if (!this.currentRecord.emp_id || !this.currentRecord.date || !this.currentRecord.check_in || !this.currentRecord.check_out) {
      this.showEmployeeError = true;
      return;
    }

    this.registerRecord();
  }

  // Register a new employee record
  registerRecord() {
    this.http.post(`${apiBaseUrl}api/adrecords`, this.currentRecord).subscribe(
      () => {
        this.alertSuccess('Employee record added successfully!');
        this.resetForm();
        this.closeAddRecordModal();
      },
      (error) => {
        console.error('Error adding record:', error);
        this.alertError('Failed to add record!');
      }
    );
  }

  // Reset form to initial state
  resetForm() {
    this.currentRecord = {
      emp_id: null,
      date: '',
      check_in: '',
      check_out: '',
    };
    this.showEmployeeError = false;
  }

  // Show success alert
  alertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  // Show error alert
  alertError(message: string) {
    this.showAlert(message, 'error');
  }

  // Show alert box with message and type
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

  // Close the modal
  closeAddRecordModal() {
    this.isModalOpen = false; // Close modal
  }
}
