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
  filteredLeaves: any[] = [];
  employeesArray: any[] = [];
  leaveTypesArray: any[] = [];
  leaveApprovalArray: any[] = [];
  leaveDayArray: any[] = [];

  currentLeave: any = {
    id: '',
    employeeId: '',
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    approve: '',
    leavedayId: '',
  };

  filters = {
    employeeId: '',
    year: '',
    month: ''
  };

  yearsArray: number[] = [];
monthsArray = [
  { value: 1, name: 'January' },
  { value: 2, name: 'February' },
  { value: 3, name: 'March' },
  { value: 4, name: 'April' },
  { value: 5, name: 'May' },
  { value: 6, name: 'June' },
  { value: 7, name: 'July' },
  { value: 8, name: 'August' },
  { value: 9, name: 'September' },
  { value: 10, name: 'October' },
  { value: 11, name: 'November' },
  { value: 12, name: 'December' },
];

ngOnInit() {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    this.yearsArray.push(i);
  }
}

resetFilters() {
  this.filters = { employeeId: '', year: '', month: '' };
  this.getAllLeaves();
}


  isLoading: boolean = false;
  showEmployeeError: boolean = false;
  showLeaveTypeError: boolean = false;
  showStartDateError: boolean = false;
  showEndDateError: boolean = false;
  showApproveError: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLeaves();
    this.getAllEmployees();
    this.getAllLeaveTypes();
    this.getAllLeaveApprovals();
    this.getAllLeaveDays();
  }

  applyFilters() {
    let filtered = this.leaveArray;

    const employeeId = this.filters.employeeId;
    const year = this.filters.year ? parseInt(this.filters.year, 10) : null;
    const month = this.filters.month ? parseInt(this.filters.month, 10) : null;

    if (employeeId) {
      filtered = filtered.filter(l => l.employee_id == employeeId);
    }

    if (year) {
      filtered = filtered.filter(l => {
        return new Date(l.start_date).getFullYear() === year;
      });
    }

    if (month) {
      filtered = filtered.filter(l => {
        return new Date(l.start_date).getMonth() + 1 === month;
      });
    }

    this.filteredLeaves = [...filtered]; // use this for view binding (see below)
  }

  getAllLeaves() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leave`).subscribe(
      (data: any) => {
        this.leaveArray = data;
        this.filteredLeaves = data; // initialize filtered leaves
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

  // Fetch all Leave Approve from the API
  getAllLeaveApprovals() {
    this.http.get(`${apiBaseUrl}api/leaveapprove`).subscribe((data: any) => {
      this.leaveApprovalArray = data;
    });
  }

  // Fetch all Leave Days from the API
  getAllLeaveDays() {
    this.http.get(`${apiBaseUrl}api/leaveday`).subscribe((data: any) => {
        this.leaveDayArray = data.map((day: any) => ({
            id: day.id,
            Name: day.Name, // Map the 'Name' field
        }));
        console.log('Leave Days:', this.leaveDayArray);
    });
}

  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
    this.showApproveError = false;
    this.showNameError = false;
  const modalElement = document.getElementById('addLeaveModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  // Open modal for editing a leave entry
  openEditModal(leave: any) {
    this.currentLeave = { ...leave };
    //this.currentLeave.employeeId = leave.employee.NameWithInitials;
    this.currentLeave.employeeId = leave.employee_id;
    this.currentLeave.leaveTypeId = leave.leave_type_id;
    this.currentLeave.startDate = leave.start_date;
    this.currentLeave.endDate = leave.end_date;
    this.currentLeave.approve = leave.approve;
    this.currentLeave.leaveadayId = leave.leaveaday_id;

    console.log(this.currentLeave);
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
    this.showApproveError = false;
    this.showNameError = false;
    this.removeModalFade();
  }

  // Save leave (either add or update)
  save() {
    // Check for empty required fields before saving
    this.showEmployeeError = !this.currentLeave.employeeId;
    this.showLeaveTypeError = !this.currentLeave.leaveTypeId;
    this.showStartDateError = !this.currentLeave.startDate;
    this.showEndDateError = !this.currentLeave.endDate;
    this.showApproveError = !this.currentLeave.approve;
    this.showNameError = !this.currentLeave.leavedayId;

    // If there are any validation errors, return early
    if (
      this.showEmployeeError ||
      this.showLeaveTypeError ||
      this.showStartDateError ||
      this.showEndDateError ||
      this.showApproveError ||
      this.showNameError
    ) {
      return;
    }

    // If there's no ID, it's a new leave; otherwise, it's an update
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
      approve: this.currentLeave.approve,
      leaveday_id: this.currentLeave.leavedayId,
    };

    // Save the current employee filter
    const currentEmployeeFilter = this.filters.employeeId;

    this.http.post(`${apiBaseUrl}api/leave`, leaveData).subscribe(
      () => {
        this.alertSuccess('Leave Registered Successfully');

        // Refresh all leaves
        this.http.get(`${apiBaseUrl}api/leave`).subscribe(
          (data: any) => {
            this.leaveArray = data;

            // Reapply the employee filter if it was set
            if (currentEmployeeFilter) {
              this.filters.employeeId = currentEmployeeFilter;
              this.filteredLeaves = this.leaveArray.filter(l => l.employee_id == currentEmployeeFilter);
            } else {
              this.filteredLeaves = [...this.leaveArray];
            }

            this.isLoading = false;
            this.resetForm();
            this.closeModal();
          },
          (error) => {
            console.error('Error loading leaves:', error);
            this.isLoading = false;
          }
        );
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
      approve: this.currentLeave.approve,
      leaveday_id: this.currentLeave.leavedayId,
    };

    // Save current filters
    const currentEmployeeFilter = this.filters.employeeId;
    const currentYearFilter = this.filters.year;
    const currentMonthFilter = this.filters.month;

    this.http
      .put(`${apiBaseUrl}api/leave/${this.currentLeave.id}`, leaveData)
      .subscribe(
        () => {
          this.alertSuccess('Leave Updated Successfully');

          // Refresh all leaves
          this.http.get(`${apiBaseUrl}api/leave`).subscribe(
            (data: any) => {
              this.leaveArray = data;

              // Reapply filters if they were set
              this.filters.employeeId = currentEmployeeFilter;
              this.filters.year = currentYearFilter;
              this.filters.month = currentMonthFilter;

              // Apply all active filters
              this.applyFilters();

              this.isLoading = false;
              this.resetForm();
              this.closeModal();
            },
            (error) => {
              console.error('Error loading leaves:', error);
              this.isLoading = false;
            }
          );
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
    // Save current filters
    const currentEmployeeFilter = this.filters.employeeId;
    const currentYearFilter = this.filters.year;
    const currentMonthFilter = this.filters.month;

    this.http.delete(`${apiBaseUrl}api/leave/${leave.id}`).subscribe(
      () => {
        this.alertSuccess('Leave Deleted Successfully');

        // Refresh all leaves
        this.http.get(`${apiBaseUrl}api/leave`).subscribe(
          (data: any) => {
            this.leaveArray = data;

            // Reapply filters if they were set
            this.filters.employeeId = currentEmployeeFilter;
            this.filters.year = currentYearFilter;
            this.filters.month = currentMonthFilter;

            // Apply all active filters
            this.applyFilters();
          },
          (error) => {
            console.error('Error loading leaves:', error);
          }
        );
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
      approve: '',
      leavedayId: '',
    };
    this.showEmployeeError = false;
    this.showLeaveTypeError = false;
    this.showStartDateError = false;
    this.showEndDateError = false;
    this.showApproveError = false;
    this.showNameError = false;
  }

  // Track leave data by ID
  trackById(index: number, leave: any) {
    return leave.id;
  }

  // closeModal() {
  //   const modal = document.getElementById('addLeaveModal') as HTMLElement;
  //   if (modal) {
      // modal.classList.remove('show');
      // modal.style.display = 'none';
      // this.removeModalFade();
  //   }
  // }

  closeModal() {
    const modalElement = document.getElementById('addLeaveModal') as HTMLElement;
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new (window as any).bootstrap.Modal(modalElement).hide();
      }

      // Manual adjustments
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
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
