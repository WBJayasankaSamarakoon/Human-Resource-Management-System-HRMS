import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  PositionArray: any[] = [];
  currentPosition: any = {
    id: '',
    Name: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllPositions();
  }

  getAllPositions() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/position`).subscribe(
      (resultData: any) => {
        this.PositionArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading positions.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;

    const modalElement = document.getElementById('addPositionModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(positionItem: any) {
    this.currentPosition = { ...positionItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentPosition.Name?.trim();

    if (this.showNameError) {
      return;
    }

    if (!this.currentPosition.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/position`, this.currentPosition).subscribe(
      () => {
        this.alertSuccess('Position added successfully!');
        this.getAllPositions();
        this.resetForm();
        this.closeModal(); // Close the modal after save
      },
      (error) => {
        console.error('Error adding position:', error);
        this.alertError('Failed to add position!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/position/${this.currentPosition.id}`, this.currentPosition)
      .subscribe(
        () => {
          this.alertSuccess('Position updated successfully!');
          this.getAllPositions();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating position:', error);
          this.alertError('Failed to update position!');
        }
      );
  }

  confirmDelete(position: any) {
    this.currentPosition = { ...position };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deletePosition() {
    if (this.currentPosition.id) {
      this.deleteRecord(this.currentPosition);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(position: any) {
    this.http.delete(`${apiBaseUrl}api/position/${position.id}`).subscribe(
      () => {
        this.alertSuccess('Position deleted successfully!');
        this.getAllPositions();
      },
      (error) => {
        console.error('Error deleting position:', error);
        this.alertError('Failed to delete position!');
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
    this.currentPosition = {
      id: '',
      Name: '',
    };
    this.showNameError = false;
  }

  trackById(index: number, positionItem: any): number {
    return positionItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addPositionModal');
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


  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
