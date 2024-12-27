import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent {
  SalaryArray: any[] = [];
  currentSalary: any = {
    id: '',
    Name: '',
    Value: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  // showValueError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllSalaries();
  }

  getAllSalaries() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/salarystructure`).subscribe(
      (resultData: any) => {
        this.SalaryArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading salaries.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    // this.showValueError = false;
    this.removeModalFade();
  }

  openEditModal(salaryItem: any) {
    this.currentSalary = { ...salaryItem };
    this.showNameError = false;
    // this.showValueError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentSalary.Name?.trim();
    // this.showValueError = !this.currentSalary.Value?.trim();

    // || this.showValueError
    if (this.showNameError) {
      return;
    }

    if (!this.currentSalary.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/salarystructure`, this.currentSalary).subscribe(
      () => {
        this.alertSuccess('Salary added successfully!');
        this.getAllSalaries();
        this.resetForm();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding salary:', error);
        this.alertError('Failed to add salary!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/salarystructure/${this.currentSalary.id}`,
        this.currentSalary
      )
      .subscribe(
        () => {
          this.alertSuccess('Salary updated successfully!');
          this.getAllSalaries();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating salary:', error);
          this.alertError('Failed to update salary!');
        }
      );
  }

  confirmDelete(salary: any) {
    this.currentSalary = { ...salary };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteSalary() {
    if (this.currentSalary.id) {
      this.deleteRecord(this.currentSalary);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(salary: any) {
    this.http.delete(`${apiBaseUrl}api/salarystructure/${salary.id}`).subscribe(
      () => {
        this.alertSuccess('Salary deleted successfully!');
        this.getAllSalaries();
      },
      (error) => {
        console.error('Error deleting salary:', error);
        this.alertError('Failed to delete salary!');
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
    this.currentSalary = {
      id: '',
      Name: '',
      Value: '',
    };
    this.showNameError = false;
    // this.showValueError = false;
  }

  trackById(index: number, salaryItem: any): number {
    return salaryItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addSalaryModal') as HTMLElement;
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
