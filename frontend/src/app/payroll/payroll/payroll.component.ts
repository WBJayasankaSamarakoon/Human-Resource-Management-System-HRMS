import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
})
export class PayrollComponent {
  payrolls: any[] = [];
  employees: any[] = [];
  currentPayroll: any = {
    id: null,
    emp_id: null,
    basic_salary: '',
    AttendanceIncentive: '',
    SuperAttendance: '',
    PerformanceIncentive: '',
    BRA1: '',
    BRA2: '',
    BRA3: '',
    deductions: '',
    year: '',
    month: '',
  };
  isLoading: boolean = false;
  showBasicSalaryError: boolean = false;

  incentiveFields = [
    'AttendanceIncentive',
    'SuperAttendance',
    'PerformanceIncentive',
    'BRA1',
    'BRA2',
    'BRA3',
  ];

  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  constructor(private http: HttpClient) {
    this.getAllPayrolls();
    this.getAllEmployees();
  }

  // Fetch all payrolls
  getAllPayrolls() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/payrolls`).subscribe(
      (resultData: any) => {
        this.payrolls = Array.isArray(resultData)
          ? resultData.map((payroll: any) => ({
              ...payroll,
              employee_name: payroll.employee
                ? payroll.employee.NameWithInitials
                : 'Unknown',
              EmpId: payroll.EmpId || 'Unknown', // Add EmpId to payrolls
            }))
          : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading payrolls.');
        this.isLoading = false;
      }
    );
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

  // Open modal for adding a new payroll entry
  openAddModal() {
    this.resetForm();
    this.showBasicSalaryError = false;  // Reset error when opening the modal
    this.removeModalFade();
  }

  // Open modal for editing a payroll entry
  openEditModal(payroll: any) {
    this.currentPayroll = { ...payroll };
    this.showBasicSalaryError = false;  // Reset error when opening the modal
    this.removeModalFade();
  }

  // Save payroll (either add or update)
  save() {
    if (!this.currentPayroll.emp_id) {
      this.showBasicSalaryError = true;  // Show error for employee if it's empty
      return;  // Prevent closing the modal
    }

    if (!this.currentPayroll.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Register a new payroll entry
  register() {
    this.http
      .post(`${apiBaseUrl}api/payrolls`, this.currentPayroll)
      .subscribe(
        () => {
          this.alertSuccess('Payroll added successfully!');
          this.getAllPayrolls();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error adding payroll:', error);
          this.alertError('Failed to add payroll!');
        }
      );
  }

  // Update an existing payroll entry
  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/payrolls/${this.currentPayroll.id}`, this.currentPayroll)
      .subscribe(
        () => {
          this.alertSuccess('Payroll updated successfully!');
          this.getAllPayrolls();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating payroll:', error);
          this.alertError('Failed to update payroll!');
        }
      );
  }

  // Confirm deletion of a payroll entry
  confirmDelete(payroll: any) {
    this.currentPayroll = { ...payroll };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  // Delete a payroll entry
  deletePayroll() {
    if (this.currentPayroll.id) {
      this.deleteRecord(this.currentPayroll);
      this.closeConfirmationModal();
    }
  }

  // Delete a payroll entry from the API
  deleteRecord(payroll: any) {
    this.http.delete(`${apiBaseUrl}api/payrolls/${payroll.id}`).subscribe(
      () => {
        this.alertSuccess('Payroll deleted successfully!');
        this.getAllPayrolls();
      },
      (error) => {
        console.error('Error deleting payroll:', error);
        this.alertError('Failed to delete payroll!');
      }
    );
  }

  // Close the confirmation modal
  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
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

  // Reset form to initial state
  resetForm() {
    this.currentPayroll = {
      id: null,
      emp_id: null,
      basic_salary: '',
      AttendanceIncentive: '',
      SuperAttendance: '',
      PerformanceIncentive: '',
      BRA1: '',
      BRA2: '',
      BRA3: '',
      deductions: '',
      year: '',
      month: '',
    };
    this.showBasicSalaryError = false;
  }

  // Track by function for better performance with ngFor
  trackById(index: number, payroll: any): number {
    return payroll.id;
  }

  // Close the modal
  closeModal() {
    const modal = document.getElementById('addPayrollModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  // Remove modal backdrop
  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
