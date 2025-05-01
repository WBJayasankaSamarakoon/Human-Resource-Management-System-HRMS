import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../../app.config';

@Component({
  selector: 'app-special',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss'],
})
export class SpecialComponent {
  specialRecords: any[] = [];
  ParameterArray: any[] = [];
  leaveArray: any[] = [];
  employees: any[] = [];
  newRecord: any = {
    emp_id: null,
    payment_date: '',
    leave_count: 0,
    AttendanceIncentive: 0,
    type: 'full',
  };
  currentRecord: any = {};
  isLoading: boolean = false;
  showEmployeeError: boolean = false;
  isEditMode: boolean = false;

  constructor(private http: HttpClient) {
    this.loadSpecialRecords();
    this.getAllEmployees();
    this.getAllParameters();
    this.getAllLeaves();
  }

  // Load all special records
  loadSpecialRecords(): void {
    this.isLoading = true;
    this.http.get<any[]>(`${apiBaseUrl}api/special`).subscribe(
      (data) => {
        this.specialRecords = data;
        this.isLoading = false;
      },
      () => {
        console.error('Error loading special records');
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

  getAllParameters() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/parameter`).subscribe(
      (resultData: any) => {
        this.ParameterArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading parameters.');
        this.isLoading = false;
      }
    );
  }

  getAllLeaves() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leave`).subscribe(
      (data: any) => {
        this.leaveArray = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading leaves:', error);
        this.isLoading = false;
      }
    );
  }

  // Handle employee selection change
  onEmployeeChange(): void {
    if (this.newRecord.emp_id && this.newRecord.payment_date) {
      this.fetchCombinedData();
    }
  }

  // Handle payment date change
  onPaymentDateChange(): void {
    if (this.newRecord.emp_id && this.newRecord.payment_date) {
      this.fetchCombinedData();
    }
  }

  // Handle type change
  onTypeChange(): void {
    this.calculateAttendanceIncentive();
  }


// Fetch combined data for the selected employee, year, and month
fetchCombinedData(): void {
  const year = new Date(this.newRecord.payment_date).getFullYear();
  const month = new Date(this.newRecord.payment_date).getMonth() + 1;

  this.http
    .get<any>(`${apiBaseUrl}api/special-new/combined-data/${this.newRecord.emp_id}/${month}/${year}`)
    .subscribe(
      (response) => {
        if (response && response.data) {
          this.newRecord.leave_count = parseFloat(response.data.leave_days);
          // Format the AttendanceIncentive to 2 decimal places
          this.newRecord.AttendanceIncentive = parseFloat(response.data.AttendanceIncentive).toFixed(2);
          this.calculateAttendanceIncentive();
        } else {
          this.newRecord.leave_count = 0;
          this.newRecord.AttendanceIncentive = '0.00';
        }
      },
      (error) => {
        console.error('Error fetching combined data:', error);
      }
    );
}

// Calculate Attendance Incentive
calculateAttendanceIncentive(): void {
  // Fetch working days from the parameter table
  const workingDays = this.ParameterArray.length > 0 ? this.ParameterArray[0].work : 0;
  const maximumLeaveDays = this.ParameterArray.length > 0 ? this.ParameterArray[0].leave : 0;

  if (this.newRecord.type === 'full') {
    // Full incentive
    this.newRecord.AttendanceIncentive = parseFloat(this.newRecord.AttendanceIncentive).toFixed(2);
  } else if (this.newRecord.type === 'partial') {
    // Partial incentive
    const daysForAttendanceIncentive = workingDays - this.newRecord.leave_count;
    if (this.newRecord.leave_count >= maximumLeaveDays) {
      this.newRecord.AttendanceIncentive = '0.00';
    } else {
      this.newRecord.AttendanceIncentive = ((parseFloat(this.newRecord.AttendanceIncentive) / workingDays) * daysForAttendanceIncentive).toFixed(2);
    }
  }
}

  // openAddModal(): void {
  //   this.resetForm();
  //   this.newRecord = { type: 'full' };
  //   this.isEditMode = false;
  //   this.showEmployeeError = false;
  //   this.removeModalFade();
  // }

  openAddModal() {
    this.resetForm();
    this.newRecord = { type: 'full' };
    this.isEditMode = false;
    this.showEmployeeError = false;
  const modalElement = document.getElementById('addSpecialModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }



  // Open modal for editing an existing record
  openEditModal(record: any): void {
    this.currentRecord = { ...record };
    this.isEditMode = true;
    this.showEmployeeError = false;
    this.removeModalFade();
  }

  // Save or update the special record
  save(): void {
    if (!this.newRecord.emp_id || !this.newRecord.payment_date) {
      this.showEmployeeError = true;
      return;
    }

    if (this.isEditMode) {
      this.save();
    } else {
      this.register();
    }
  }

  // Register a new special record
  register(): void {
    this.http.post(`${apiBaseUrl}api/special`, this.newRecord).subscribe(
      () => {
        this.alertSuccess('Special Instruction Registered Successfully');
        this.loadSpecialRecords();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        this.alertError('Error adding special Instruction record');
        this.isLoading = false;
      }
    );
  }


  // Update an existing special record
  update(): void {
    this.http.put(`${apiBaseUrl}api/special/${this.currentRecord.id}`, this.currentRecord).subscribe(
      () => {
        this.alertSuccess('Special Instruction Registered Successfully');
        this.loadSpecialRecords();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        // console.error('Error updating special record:', error);
        this.alertError('Error updating special Instruction record');
        this.isLoading = false;
      }
    );
  }

  // Confirm deletion of a special record
  confirmDelete(record: any): void {
    this.currentRecord = record;
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  // Delete the special record
  deleteRecord(): void {
    this.http.delete(`${apiBaseUrl}api/special/${this.currentRecord.id}`).subscribe(
      () => {
        this.loadSpecialRecords();
        this.closeConfirmationModal();
      },
      (error) => {
        console.error('Error deleting special record:', error);
      }
    );
  }

  // Handle alert success messages
    alertSuccess(message: string) {
      this.showAlert(message, 'success');
    }

  // Handle alert error messages
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

  // Reset the current leave form
  resetForm() {
    this.newRecord = {
      emp_id: null,
      payment_date: '',
      leave_count: 0,
      AttendanceIncentive: 0,
      type: 'full',
    };
  }

  // Close the modal after saving or editing a record
  // closeModal(): void {
  //   this.newRecord = {};
  //   this.isEditMode = false;
  //   this.showEmployeeError = false;
  //   this.removeModalFade();
  // }

  closeModal() {
    const modalElement = document.getElementById('addSpecialModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }

    // Cleanup: Remove any leftover backdrop or modal-open class
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; // Allow scroll
  }


  // Close the confirmation modal
  closeConfirmationModal(): void {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
  }

    // Remove modal backdrop fade
    removeModalFade() {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }

  // Track items by their id for better performance
  trackById(index: number, item: any): number {
    return item.id;
  }
}
