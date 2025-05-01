import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-addallowances',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addallowances.component.html',
  styleUrls: ['./addallowances.component.scss'],
})
export class AddallowancesComponent {
  allowancesArray: any[] = [];
  currentAllowance: any = {
    id: '',
    Name: '',
  };
  isLoading: boolean = false;
  showAllowanceNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllAllowances();
  }

  getAllAllowances() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/addallowance`).subscribe(
      (resultData: any) => {
        this.allowancesArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading allowances.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showAllowanceNameError = false;
  const modalElement = document.getElementById('addAllowanceModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(allowanceItem: any) {
    this.currentAllowance = { ...allowanceItem };
    this.showAllowanceNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showAllowanceNameError = !this.currentAllowance.Name?.trim();

    if (this.showAllowanceNameError) {
      return;
    }

    if (!this.currentAllowance.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/addallowance`, this.currentAllowance).subscribe(
      () => {
        this.alertSuccess('Allowance added successfully!');
        this.getAllAllowances();
        this.resetForm();
        this.closeModal(); // Close the modal after save
      },
      (error) => {
        console.error('Error adding allowance:', error);
        this.alertError('Failed to add allowance!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/addallowance/${this.currentAllowance.id}`, this.currentAllowance)
      .subscribe(
        () => {
          this.alertSuccess('Allowance updated successfully!');
          this.getAllAllowances();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating allowance:', error);
          this.alertError('Failed to update allowance!');
        }
      );
  }

  confirmDelete(allowance: any) {
    this.currentAllowance = { ...allowance };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteAllowance() {
    if (this.currentAllowance.id) {
      this.deleteRecord(this.currentAllowance);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(allowance: any) {
    this.http.delete(`${apiBaseUrl}api/addallowance/${allowance.id}`).subscribe(
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

  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
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

  resetForm() {
    this.currentAllowance = {
      id: '',
      Name: '',
    };
    this.showAllowanceNameError = false;
  }

  trackById(index: number, allowanceItem: any): number {
    return allowanceItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addAllowanceModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
