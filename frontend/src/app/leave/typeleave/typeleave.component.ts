import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-type',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './typeleave.component.html',
  styleUrls: ['./typeleave.component.scss'],
})
export class LeaveTypeComponent {
  leaveTypesArray: any[] = [];
  currentLeaveType: any = {
    id: '',
    LeaveType: '',
    Description: '',
  };
  isLoading: boolean = false;
  showLeaveTypeError: boolean = false;
  // showDescriptionError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLeaveTypes();
  }

  getAllLeaveTypes() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leavetypes`).subscribe(
      (resultData: any) => {
        this.leaveTypesArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading leave types.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showLeaveTypeError = false;
  const modalElement = document.getElementById('addLeaveTypeModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(leaveTypeItem: any) {
    this.currentLeaveType = { ...leaveTypeItem };
    this.showLeaveTypeError = false;
    // this.showDescriptionError = false;
    this.removeModalFade();
  }

  save() {
    this.showLeaveTypeError = !this.currentLeaveType.LeaveType?.trim();
    // this.showDescriptionError = !this.currentLeaveType.Description?.trim();

    // || this.showDescriptionError
    if (this.showLeaveTypeError) {
      return;
    }

    if (!this.currentLeaveType.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/leavetypes`, this.currentLeaveType).subscribe(
      () => {
        this.alertSuccess('Leave Type added successfully!');
        this.getAllLeaveTypes();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding leave type:', error);
        this.alertError('Failed to add leave type!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/leavetypes/${this.currentLeaveType.id}`,
        this.currentLeaveType
      )
      .subscribe(
        () => {
          this.alertSuccess('Leave Type updated successfully!');
          this.getAllLeaveTypes();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating leave type:', error);
          this.alertError('Failed to update leave type!');
        }
      );
  }

  confirmDelete(leaveType: any) {
    this.currentLeaveType = { ...leaveType };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteLeaveType() {
    if (this.currentLeaveType.id) {
      this.deleteRecord(this.currentLeaveType);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(leaveType: any) {
    this.http.delete(`${apiBaseUrl}api/leavetypes/${leaveType.id}`).subscribe(
      () => {
        this.alertSuccess('Leave Type deleted successfully!');
        this.getAllLeaveTypes();
      },
      (error) => {
        console.error('Error deleting leave type:', error);
        this.alertError('Failed to delete leave type!');
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
    this.currentLeaveType = {
      id: '',
      LeaveType: '',
      Description: '',
    };
    this.showLeaveTypeError = false;
    // this.showDescriptionError = false;
  }

  trackById(index: number, leaveTypeItem: any): number {
    return leaveTypeItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addLeaveTypeModal') as HTMLElement;
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
