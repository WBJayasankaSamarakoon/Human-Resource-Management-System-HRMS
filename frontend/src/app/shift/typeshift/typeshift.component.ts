import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-typeshift',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './typeshift.component.html',
  styleUrls: ['./typeshift.component.scss'],
})
export class TypeshiftComponent {
  TypeshiftArray: any[] = [];
  currentTypeshift: any = {
    id: '',
    Name: '',
    Value: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  showValueError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllTypeshifts();
  }

  getAllTypeshifts() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/typeshift`).subscribe(
      (resultData: any) => {
        this.TypeshiftArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading type shifts.');
        this.isLoading = false;
      }
    );
  }

  // openAddModal() {
  //   this.resetForm();
  //   this.showNameError = false;
  //   this.showValueError = false;
  //   this.removeModalFade();
  // }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.showValueError = false;
  const modalElement = document.getElementById('addTypeShiftModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  openEditModal(typeshiftItem: any) {
    this.currentTypeshift = { ...typeshiftItem };
    this.showNameError = false;
    this.showValueError = false;
    this.removeModalFade();
  }

    // Save (either add or update)
    save() {
      this.showNameError = !this.currentTypeshift.Name?.trim();
      this.showValueError = !this.currentTypeshift.Value;

      if (this.showNameError || this.showValueError) {
        return;
      }

      if (!this.currentTypeshift.id) {
        this.register();
      } else {
        this.updateRecords();
      }

    }

  register() {
    this.http
      .post(`${apiBaseUrl}api/typeshift`, this.currentTypeshift)
      .subscribe(
        () => {
          this.alertSuccess('Type shift updated successfully!');
          this.getAllTypeshifts();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding type shift:', error);
          this.alertError('Failed to add type shift!');
        }
      );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/typeshift/${this.currentTypeshift.id}`,
        this.currentTypeshift
      )
      .subscribe(
        () => {
          this.alertSuccess('Type shift updated successfully!');
          this.getAllTypeshifts();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating type shift:', error);
          this.alertError('Failed to update type shift!');
        }
      );
  }

  confirmDelete(typeshift: any) {
    this.currentTypeshift = { ...typeshift };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteTypeshift() {
    if (this.currentTypeshift.id) {
      this.http
        .delete(`${apiBaseUrl}api/typeshift/${this.currentTypeshift.id}`)
        .subscribe(
          () => {
            this.alertSuccess('Type shift deleted successfully!');
            this.getAllTypeshifts();
            this.closeConfirmationModal();
          },
          (error) => {
            console.error('Error deleting type shift:', error);
            this.alertError('Failed to delete type shift!');
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
    this.currentTypeshift = {
      id: '',
      Name: '',
      Value: '',
    };
    this.showNameError = false;
    this.showValueError = false;
  }

  closeModal() {
    const modal = document.getElementById('addTypeShiftModal') as HTMLElement;
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

  trackById(index: number, typeshiftItem: any): number {
    return typeshiftItem.id;
  }
}
