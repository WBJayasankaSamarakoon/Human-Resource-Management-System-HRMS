import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-allocation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss'],
})
export class AllocationComponent {
  allocationArray: any[] = [];
  filteredAllocations: any[] = [];
  employeesArray: any[] = [];
  leaveTypesArray: any[] = [];

  currentAllocation: any = {
    id: '',
    employee_id: '',
    employee_name: '',
    year: new Date().getFullYear(),
    leave_type_id: '',
    leave_type: '',
    leave_count: '',
  };

  yearsArray: number[] = [];

  isLoading: boolean = false;
  showEmployeeError: boolean = false;
  showYearError: boolean = false;
  showLeaveTypeError: boolean = false;
  showLeaveCountError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllAllocations();
    this.getAllEmployees();
    this.getAllLeaveTypes();
    this.generateYears();
  }

  ngOnInit() {
    this.generateYears();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.yearsArray.push(i);
    }
  }

  getAllAllocations() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/allocation`).subscribe(
      (resultData: any) => {
        // Expecting each item to have `employee` and `leave_type` objects
        this.allocationArray = Array.isArray(resultData) ? resultData : [];
        this.filteredAllocations = [...this.allocationArray];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading allocations.');
        this.isLoading = false;
      }
    );
  }


  getAllEmployees() {
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe((data: any) => {
      this.employeesArray = data;
    });
  }

  getAllLeaveTypes() {
    this.http.get(`${apiBaseUrl}api/leavetypes`).subscribe((data: any) => {
      this.leaveTypesArray = data.map((type: any) => ({
        id: type.id,
        typeName: type.LeaveType,
      }));
    });
  }

  openAddModal() {
    this.resetForm();
    this.clearErrors();
    const modal = document.getElementById('addAllocationModal');
    if (modal) {
      const instance = new (window as any).bootstrap.Modal(modal);
      instance.show();
    }
  }

  openEditModal(allocation: any) {
    this.currentAllocation = { ...allocation };
    this.clearErrors();
    const modal = document.getElementById('editAllocationModal');
    if (modal) {
      const instance = new (window as any).bootstrap.Modal(modal);
      instance.show();
    }
  }


  save() {
    this.validateForm();

    if (this.hasErrors()) return;

    this.register();
  }

  update() {
    this.validateForm();

    if (this.hasErrors()) return;

    this.updateRecord();
  }

  validateForm() {
    this.showEmployeeError = !this.currentAllocation.employee_id;
    this.showYearError = !this.currentAllocation.year;
    this.showLeaveTypeError = !this.currentAllocation.leave_type_id;
    this.showLeaveCountError = !this.currentAllocation.leave_count;
  }

  hasErrors(): boolean {
    return this.showEmployeeError ||
           this.showYearError ||
           this.showLeaveTypeError ||
           this.showLeaveCountError;
  }

  clearErrors() {
    this.showEmployeeError = false;
    this.showYearError = false;
    this.showLeaveTypeError = false;
    this.showLeaveCountError = false;
  }

  register() {
    this.isLoading = true;
    this.http.post(`${apiBaseUrl}api/allocation`, this.currentAllocation).subscribe(
      () => {
        this.alertSuccess('Allocation added successfully!');
        this.getAllAllocations();
        this.closeModal('addAllocationModal');
        this.isLoading = false;
      },
      (error) => {
        console.error('Error adding allocation:', error);
        this.alertError('Failed to add allocation!');
        this.isLoading = false;
      }
    );
  }

  updateRecord() {
    this.isLoading = true;
    this.http.put(`${apiBaseUrl}api/allocation/${this.currentAllocation.id}`, this.currentAllocation).subscribe(
      () => {
        this.alertSuccess('Allocation updated successfully!');
        this.getAllAllocations();
        this.closeModal('editAllocationModal');
        this.isLoading = false;
      },
      (error) => {
        console.error('Error updating allocation:', error);
        this.alertError('Failed to update allocation!');
        this.isLoading = false;
      }
    );
  }

  confirmDelete(allocation: any) {
    this.currentAllocation = { ...allocation };
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.classList.add('visible');
    }
  }

  deleteAllocation() {
    this.isLoading = true;
    this.http.delete(`${apiBaseUrl}api/allocation/${this.currentAllocation.id}`).subscribe(
      () => {
        this.alertSuccess('Allocation deleted successfully!');
        this.getAllAllocations();
        this.closeConfirmationModal();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error deleting allocation:', error);
        this.alertError('Failed to delete allocation!');
        this.isLoading = false;
      }
    );
  }

  closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.classList.remove('visible');
    }
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const instance = (window as any).bootstrap.Modal.getInstance(modal);
      if (instance) {
        instance.hide();
      }
    }
    this.removeModalFade();
  }

  resetForm() {
    this.currentAllocation = {
      id: '',
      employee_id: '',
      employee_name: '',
      year: new Date().getFullYear(),
      leave_type_id: '',
      leave_type: '',
      leave_count: '',
    };
    this.clearErrors();
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

  trackById(index: number, item: any): number {
    return item.id;
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
  }
}
