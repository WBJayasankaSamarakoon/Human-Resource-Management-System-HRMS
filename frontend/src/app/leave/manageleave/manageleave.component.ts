import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-manage-leave',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manageleave.component.html',
  styleUrls: ['./manageleave.component.scss'],
})
export class ManageLeaveComponent {
  leaveArray: any[] = [];
  employeesArray: any[] = [];
  leaveTypesArray: any[] = [];
  currentLeave: any = {
    id: '',
    employeeId: '',
    leaveTypeId: '',
    startDate: '',
    endDate: '',
  };
  isLoading: boolean = false;
  showEmployeeError: boolean = false;
  showLeaveTypeError: boolean = false;
  showStartDateError: boolean = false;
  showEndDateError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLeaves();
    this.getAllEmployees();
    this.getAllLeaveTypes();
  }

  // Fetch all leave records from the API
  getAllLeaves() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leave`).subscribe(
      (data: any) => {
        this.leaveArray = data.map((leave: any) => ({
          ...leave,
          employeeName: leave.employee ? leave.employee.NameWithInitials : 'Unknown',
          leaveType: leave.leaveType ? leave.leaveType.LeaveType : 'Unknown',
          startDate: leave.start_date,
          endDate: leave.end_date,
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading leaves:', error);
        this.isLoading = false;
      }
    );
  }

  // Fetch all employees from the API
  getAllEmployees() {
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe((data: any) => {
      this.employeesArray = data;
    });
  }

  // Fetch all leave types from the API
  getAllLeaveTypes() {
    this.http.get(`${apiBaseUrl}api/leavetypes`).subscribe((data: any) => {
      this.leaveTypesArray = data.map((type: any) => ({
        id: type.id,
        typeName: type.LeaveType,
      }));
    });
  }

  // Open modal for adding a new leave entry
  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
    this.removeModalFade();
  }

  // Open modal for editing a leave entry
  openEditModal(leave: any) {
    this.currentLeave = { ...leave };
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
    this.removeModalFade();
  }

  // Save leave (either add or update)
  save() {
    this.showEmployeeError = !this.currentLeave.employeeId?.trim();
    this.showLeaveTypeError = !this.currentLeave.leaveTypeId?.trim();
    this.showStartDateError = !this.currentLeave.startDate?.trim();
    this.showEndDateError = !this.currentLeave.endDate?.trim();

    if (this.showEmployeeError || this.showLeaveTypeError || this.showStartDateError || this.showEndDateError) {
      return;
    }

    if (!this.currentLeave.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Register a new leave record
  register() {
    this.isLoading = true;
    const leaveData = {
      employee_id: this.currentLeave.employeeId,
      leave_type_id: this.currentLeave.leaveTypeId,
      start_date: this.currentLeave.startDate,
      end_date: this.currentLeave.endDate,
    };
    this.http.post(`${apiBaseUrl}api/leave`, leaveData).subscribe(
      () => {
        this.alertSuccess('Leave Registered Successfully');
        this.getAllLeaves();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        this.alertError('Failed to register leave');
        this.isLoading = false;
      }
    );
  }

  // Update an existing leave record
  updateRecords() {
    this.isLoading = true;
    const leaveData = {
      employee_id: this.currentLeave.employeeId,
      leave_type_id: this.currentLeave.leaveTypeId,
      start_date: this.currentLeave.startDate,
      end_date: this.currentLeave.endDate,
    };
    this.http.put(`${apiBaseUrl}api/leave/${this.currentLeave.id}`, leaveData).subscribe(
      () => {
        this.alertSuccess('Leave Updated Successfully');
        this.getAllLeaves();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        this.alertError('Failed to update leave');
        this.isLoading = false;
      }
    );
  }

  // Delete a leave record
  confirmDelete(leave: any) {
    this.currentLeave = { ...leave };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteLeave() {
    if (this.currentLeave.id) {
      this.deleteRecord(this.currentLeave);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(leave: any) {
    this.http.delete(`${apiBaseUrl}api/leave/${leave.id}`).subscribe(
      () => {
        this.alertSuccess('Leave Deleted Successfully');
        this.getAllLeaves();
      },
      (error) => {
        this.alertError('Failed to delete leave');
      }
    );
  }

  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
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
    this.currentLeave = {
      id: '',
      employeeId: '',
      leaveTypeId: '',
      startDate: '',
      endDate: '',
    };
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
  }

  // Track leave data by ID
  trackById(index: number, leave: any) {
    return leave.id;
  }

  closeModal() {
    const modal = document.getElementById('addLeaveModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  // Remove modal backdrop fade
  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
