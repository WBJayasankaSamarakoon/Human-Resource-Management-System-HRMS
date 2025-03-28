// allowances.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../../app.config';

@Component({
  selector: 'app-allowances',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss'],
})
export class AllowancesComponent {
  allowances: any[] = [];
  employees: any[] = [];
  allowanceTypes: any[] = [];
  currentAllowance: any = {
    id: null,
    emp_id: null,
    type: null,
    amount: '',
    payment_date: '',
    is_active: true,
  };
  isLoading: boolean = false;
  showEmployeeError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllAllowances();
    this.getAllEmployees();
    this.getAllAllowanceTypes();
  }

  // Fetch all allowances
  getAllAllowances() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/allowances`).subscribe(
      (resultData: any) => {
        this.allowances = Array.isArray(resultData) ? resultData : [];
        console.log(this.allowances); // Debugging
        this.isLoading = false;
      },
      () => {
        console.error('Error loading allowances.');
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

  // Fetch all allowance types
  getAllAllowanceTypes() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/addallowance`).subscribe(
      (resultData: any) => {
        this.allowanceTypes = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading allowance types.');
        this.isLoading = false;
      }
    );
  }

  // Open modal for adding a new allowance
  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
    this.removeModalFade();
  }

  // Open modal for editing an allowance entry
  openEditModal(allowance: any) {
    this.currentAllowance = { ...allowance };
    this.showEmployeeError = false;
    this.removeModalFade();
  }

  // Save allowance (either add or update)
  save() {
    if (!this.currentAllowance.emp_id || !this.currentAllowance.type) {
      this.showEmployeeError = true;
      return;
    }

    if (!this.currentAllowance.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Register a new allowance entry
  register() {
    this.http.post(`${apiBaseUrl}api/allowances`, this.currentAllowance).subscribe(
      () => {
        this.alertSuccess('Allowance added successfully!');
        this.getAllAllowances();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding allowance:', error);
        this.alertError('Failed to add allowance!');
      }
    );
  }

  // Update an existing allowance entry
  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/allowances/${this.currentAllowance.id}`, this.currentAllowance)
      .subscribe(
        () => {
          this.alertSuccess('Allowance updated successfully!');
          this.getAllAllowances();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating allowance:', error);
          this.alertError('Failed to update allowance!');
        }
      );
  }

  // Confirm deletion of an allowance entry
  confirmDelete(allowance: any) {
    this.currentAllowance = { ...allowance };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  // Delete an allowance entry
  deleteAllowance() {
    if (this.currentAllowance.id) {
      this.deleteRecord(this.currentAllowance);
      this.closeConfirmationModal();
    }
  }

  // Delete an allowance entry from the API
  deleteRecord(allowance: any) {
    this.http.delete(`${apiBaseUrl}api/allowances/${allowance.id}`).subscribe(
      () => {
        this.alertSuccess('Allowance deleted successfully!');
        this.getAllAllowances();
      },
      (error) => {
        console.error('Error deleting allowance:', error);
        this.alertError('Failed to delete allowance!');
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
    this.currentAllowance = {
      id: null,
      emp_id: null,
      type: null,
      amount: '',
      payment_date: '',
      is_active: true,
    };
    this.showEmployeeError = false;
  }

  // Track by function for better performance with ngFor
  trackById(index: number, allowance: any): number {
    return allowance.id;
  }

  // Close the modal
  closeModal() {
    const modal = document.getElementById('addAllowanceModal') as HTMLElement;
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

  // Toggle the active/inactive status
  toggleStatus(allowance: any) {
    const updatedStatus = !allowance.is_active;
    const updatedAllowance = { ...allowance, is_active: updatedStatus };

    // Update the status in the backend
    this.http
      .put(`${apiBaseUrl}api/allowances/${allowance.id}`, updatedAllowance)
      .subscribe(
        () => {
          this.alertSuccess(
            `Allowance status updated to ${
              updatedStatus ? 'Active' : 'Inactive'
            }!`
          );
          this.getAllAllowances();
        },
        (error) => {
          console.error('Error updating allowance status:', error);
          this.alertError('Failed to update allowance status!');
        }
      );
  }
}
