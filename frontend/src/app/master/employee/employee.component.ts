import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  EmployeeArray: any[] = [];
  CompanyArray: any[] = [];
  shiftArray: any[] = [];
  DepartmentArray: any[] = [];
  currentEmployee: any = {
    id: '',
    EmpId: null,
    NameWithInitials: '',
    EPFNumber: '',
    EpfEligible: false,
    Phone: '',
    CurrentAddress: '',
    PermanentAddress: '',
    PersonalEmail: '',
    CompanyEmail: '',
    DateOfJoining: '',
    Status: '',
    Designation: '',
    Branch: '',
    Department: '',
    Company: '',
    DefaultShift: '',
  };

  isLoading: boolean = false;
  showEmployeeEmpIdError: boolean = false;
  showEmployeeNameWithInitialsError: boolean = false;
  showDefaultShiftError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllEmployees();
    this.getAllCompanies();
    this.getAllDepartments();
    this.getAllEmpShifts();
  }

  // Fetch all companies
  getAllCompanies() {
    this.http.get(`${apiBaseUrl}api/company`).subscribe(
      (resultData: any) => {
        this.CompanyArray = Array.isArray(resultData) ? resultData : [];
      },
      (error) => {
        console.error('Error loading companies:', error);
      }
    );
  }

  // Fetch all companies
  getAllDepartments() {
    this.http.get(`${apiBaseUrl}api/tbldepartments`).subscribe(
      (resultData: any) => {
        this.DepartmentArray = Array.isArray(resultData) ? resultData : [];
        console.log('Fetched departments:', this.DepartmentArray);
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }

  // Load shifts from service
  getAllEmpShifts() {
    this.http.get(`${apiBaseUrl}api/empshift`).subscribe(
      (data: any) => {
        this.shiftArray = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error loading employee shifts:', error);
      }
    );
  }

  // Fetch all employees
  getAllEmployees() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe(
      (resultData: any) => {
        this.EmployeeArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false;
      }
    );
  }

  // Open Add Modal
  openAddModal() {
    this.resetForm();
    this.showEmployeeEmpIdError = false;
    this.showEmployeeNameWithInitialsError = false;
    this.showDefaultShiftError = false;
    this.removeModalFade();
  }

  // Open Edit Modal
  openEditModal(employeeItem: any) {
    this.currentEmployee = { ...employeeItem };
    this.showEmployeeEmpIdError = false;
    this.showEmployeeNameWithInitialsError = false;
    this.showDefaultShiftError = false;
    this.removeModalFade();
  }

  // Save action based on current mode (Add or Edit)
  save() {
    if (!this.currentEmployee.NameWithInitials?.trim()) {
      this.showEmployeeEmpIdError = true;
      this.showEmployeeNameWithInitialsError = true;
      this.showDefaultShiftError = true;
      return;
    }

    if (!this.currentEmployee.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Register a new employee
  register() {
    this.http
      .post(`${apiBaseUrl}api/tblemployees`, this.currentEmployee)
      .subscribe(
        () => {
          this.alertSuccess('Employee added successfully!');
          this.getAllEmployees();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error adding employee:', error);
          this.alertError('Failed to add employee!');
        }
      );
  }

  // Update employee details
  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/tblemployees/${this.currentEmployee.id}`,
        this.currentEmployee
      )
      .subscribe(
        () => {
          this.alertSuccess('Employee updated successfully!');
          this.getAllEmployees();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.alertError('Failed to update employee!');
        }
      );
  }

  // Confirm delete employee
  confirmDelete(employee: any) {
    this.currentEmployee = { ...employee };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  // Delete an employee
  deleteEmployee() {
    if (this.currentEmployee.id) {
      this.deleteRecord(this.currentEmployee);
      this.closeConfirmationModal();
    }
  }

  // Delete record from API
  deleteRecord(employee: any) {
    this.http.delete(`${apiBaseUrl}api/tblemployees/${employee.id}`).subscribe(
      () => {
        this.alertSuccess('Employee deleted successfully!');
        this.getAllEmployees();
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.alertError('Failed to delete employee!');
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

  // Show alert messages
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

  // Reset the form fields
  resetForm() {
    this.currentEmployee = {
      id: '',
      EmpId: null,
      NameWithInitials: '',
      EPFNumber: '',
      EpfEligible: false,
      Phone: '',
      CurrentAddress: '',
      PermanentAddress: '',
      PersonalEmail: '',
      CompanyEmail: '',
      DateOfJoining: '',
      Status: '',
      Designation: '',
      Branch: '',
      Department: '',
      Company: '',
      DefaultShift: '',
    };
    this.showEmployeeEmpIdError = false;
    this.showEmployeeNameWithInitialsError = false;
    this.showDefaultShiftError = false;
  }

  // Track by ID for ngFor
  trackById(index: number, employeeItem: any): number {
    return employeeItem.id;
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('addEmployeeModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  // Remove modal fade
  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
