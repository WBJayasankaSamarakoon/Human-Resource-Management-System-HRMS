import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../../app.config';

@Component({
  selector: 'app-deductions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.scss'],
})
export class DeductionsComponent {
  deductions: any[] = [];
  employees: any[] = [];
  deductionTypes: any[] = [];
  currentDeduction: any = {
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
    this.getAllDeductions();
    this.getAllEmployees();
    this.getAllDeductionTypes();
  }

  // Fetch all deductions
  getAllDeductions() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/deductions`).subscribe(
      (resultData: any) => {
        this.deductions = Array.isArray(resultData) ? resultData : [];
        console.log(this.deductions); //Debugging
        this.isLoading = false;
      },
      () => {
        console.error('Error loading deductions.');
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

  // Fetch all deduction types
  getAllDeductionTypes() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/adddeduction`).subscribe(
      (resultData: any) => {
        this.deductionTypes = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading deduction types.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showEmployeeError = false;
  const modalElement = document.getElementById('addDeductionModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  // Open modal for editing a deduction entry
  openEditModal(deduction: any) {
    this.currentDeduction = { ...deduction };
    this.showEmployeeError = false;
    this.removeModalFade();
  }

  // Save deduction (either add or update)
  save() {
    if (!this.currentDeduction.emp_id || !this.currentDeduction.type) {
      this.showEmployeeError = true;
      return;
    }

    if (!this.currentDeduction.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Register a new deduction entry
  register() {
    this.http.post(`${apiBaseUrl}api/deductions`, this.currentDeduction).subscribe(
      () => {
        this.alertSuccess('Deduction added successfully!');
        this.getAllDeductions();
        this.resetForm();
        this.closeModal(); // Close the modal after save
      },
      (error) => {
        console.error('Error adding deduction:', error);
        this.alertError('Failed to add deduction!');
      }
    );
  }

  // Update an existing deduction entry
  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/deductions/${this.currentDeduction.id}`, this.currentDeduction)
      .subscribe(
        () => {
          this.alertSuccess('Deduction updated successfully!');
          this.getAllDeductions();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating deduction:', error);
          this.alertError('Failed to update deduction!');
        }
      );
  }

  // Confirm deletion of a deduction entry
  confirmDelete(deduction: any) {
    this.currentDeduction = { ...deduction };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  // Delete a deduction entry
  deleteDeduction() {
    if (this.currentDeduction.id) {
      this.deleteRecord(this.currentDeduction);
      this.closeConfirmationModal();
    }
  }

  // Delete a deduction entry from the API
  deleteRecord(deduction: any) {
    this.http.delete(`${apiBaseUrl}api/deductions/${deduction.id}`).subscribe(
      () => {
        this.alertSuccess('Deduction deleted successfully!');
        this.getAllDeductions();
      },
      (error) => {
        console.error('Error deleting deduction:', error);
        this.alertError('Failed to delete deduction!');
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
    this.currentDeduction = {
      id: null,
      emp_id: null,
      type: null, // Reset the type field
      amount: '',
      payment_date: '',
      is_active: true,
    };
    this.showEmployeeError = false;
  }

  // Track by function for better performance with ngFor
  trackById(index: number, deduction: any): number {
    return deduction.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addDeductionModal');
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


  // Remove modal backdrop
  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }

  // Toggle the active/inactive status
  toggleStatus(deduction: any) {
    const updatedStatus = !deduction.is_active;
    const updatedDeduction = { ...deduction, is_active: updatedStatus };

    // Update the status in the backend
    this.http
      .put(`${apiBaseUrl}api/deductions/${deduction.id}`, updatedDeduction)
      .subscribe(
        () => {
          this.alertSuccess(
            `Deduction status updated to ${
              updatedStatus ? 'Active' : 'Inactive'
            }!`
          );
          this.getAllDeductions();
        },
        (error) => {
          console.error('Error updating deduction status:', error);
          this.alertError('Failed to update deduction status!');
        }
      );
  }
}
