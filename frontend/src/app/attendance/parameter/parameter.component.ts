import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
})
export class ParameterComponent {
  ParameterArray: any[] = [];
  currentParameter: any = {
    id: '',
    work: 0,
    hours: 0,
    leave: 0,
    epfEmp: 0,
    epfCom: 0,
    etfCom: 0
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllParameters();
  }

  getAllParameters() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/parameter`).subscribe(
      (resultData: any) => {
        this.ParameterArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading parameters.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
  const modalElement = document.getElementById('addParameterModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }



  openEditModal(parameterItem: any) {
    this.currentParameter = { ...parameterItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentParameter.work?.toString().trim();
    if (this.showNameError) {
      return;
    }
    if (!this.currentParameter.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/parameter`, this.currentParameter)
      .subscribe(
        () => {
          this.alertSuccess('Parameter added successfully!');
          this.getAllParameters();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding parameter:', error);
          this.alertError('Failed to add parameter!');
        }
      );
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/parameter/${this.currentParameter.id}`, this.currentParameter)
      .subscribe(
        () => {
          this.alertSuccess('Parameter updated successfully!');
          this.getAllParameters();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating parameter:', error);
          this.alertError('Failed to update parameter!');
        }
      );
  }

  confirmDelete(parameter: any) {
    this.currentParameter = { ...parameter };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteParameter() {
    if (this.currentParameter.id) {
      this.deleteRecord(this.currentParameter);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(parameter: any) {
    this.http
      .delete(`${apiBaseUrl}api/parameter/${parameter.id}`)
      .subscribe(
        () => {
          this.alertSuccess('Parameter deleted successfully!');
          this.getAllParameters();
        },
        (error) => {
          console.error('Error deleting parameter:', error);
          this.alertError('Failed to delete parameter!');
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
    this.currentParameter = {
      id: '',
      work: 0,
      hours: 0,
      leave: 0,
      epfEmp: 0,
      epfCom: 0,
      etfCom: 0
    };
    this.showNameError = false;
  }

  trackById(index: number, parameterItem: any): number {
    return parameterItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addParameterModal');
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
