import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-leaveapproval',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leaveapproval.component.html',
  styleUrls: ['./leaveapproval.component.scss'],
})
export class LeaveApprovalComponent {
  leaveApprovalArray: any[] = [];
  currentLeaveApproval: any = {
    id: '',
    Name: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllLeaveApprovals();
  }

  getAllLeaveApprovals() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/leaveapprove`).subscribe(
      (resultData: any) => {
        this.leaveApprovalArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading leave approvals.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.removeModalFade();
  }

  openEditModal(leaveApprovalItem: any) {
    this.currentLeaveApproval = { ...leaveApprovalItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentLeaveApproval.Name?.trim();

    if (this.showNameError) {
      return;
    }

    if (!this.currentLeaveApproval.id) {
      this.addLeaveApproval();
    } else {
      this.updateLeaveApproval();
    }
  }

  addLeaveApproval() {
    this.http
      .post(`${apiBaseUrl}api/leaveapprove`, this.currentLeaveApproval)
      .subscribe(
        () => {
          this.alertSuccess('Leave approval added successfully!');
          this.getAllLeaveApprovals();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding leave approval:', error);
          this.alertError('Failed to add leave approval!');
        }
      );
  }

  updateLeaveApproval() {
    this.http
      .put(
        `${apiBaseUrl}api/leaveapprove/${this.currentLeaveApproval.id}`,
        this.currentLeaveApproval
      )
      .subscribe(
        () => {
          this.alertSuccess('Leave approval updated successfully!');
          this.getAllLeaveApprovals();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating leave approval:', error);
          this.alertError('Failed to update leave approval!');
        }
      );
  }

  confirmDelete(leaveApproval: any) {
    this.currentLeaveApproval = { ...leaveApproval };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteLeaveApproval() {
    if (this.currentLeaveApproval.id) {
      this.http
        .delete(`${apiBaseUrl}api/leaveapprove/${this.currentLeaveApproval.id}`)
        .subscribe(
          () => {
            this.alertSuccess('Leave approval deleted successfully!');
            this.getAllLeaveApprovals();
            this.closeConfirmationModal();
          },
          (error) => {
            console.error('Error deleting leave approval:', error);
            this.alertError('Failed to delete leave approval!');
          }
        );
    }
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
    this.currentLeaveApproval = {
      id: '',
      Name: '',
    };
    this.showNameError = false;
  }

  closeModal() {
    const modal = document.getElementById('addLeaveApprovalModal') as HTMLElement;
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

  trackById(index: number, leaveApprovalItem: any): number {
    return leaveApprovalItem.id;
  }
}
