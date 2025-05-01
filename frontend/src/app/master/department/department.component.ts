import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
  DepartmentArray: any[] = [];
  currentDepartment: any = {
    id: '',
    DepartmentName: '',
    DepartmentShortName: '',
    DepartmentCode: '',
    CreationDate: '',
  };
  isLoading: boolean = false;
  showDepartmentNameError: boolean = false;
  // showShortNameError: boolean = false;
  // showDepartmentCodeError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/tbldepartments`).subscribe(
      (resultData: any) => {
        this.DepartmentArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading departments.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showDepartmentNameError = false;
  const modalElement = document.getElementById('addDepartmentModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(departmentItem: any) {
    this.currentDepartment = { ...departmentItem };
    this.showDepartmentNameError = false;
    // this.showShortNameError = false;
    // this.showDepartmentCodeError = false;
    this.removeModalFade();
  }

  save() {
    this.showDepartmentNameError =
      !this.currentDepartment.DepartmentName?.trim();
    // this.showShortNameError = !this.currentDepartment.DepartmentShortName?.trim();
    // this.showDepartmentCodeError = !this.currentDepartment.DepartmentCode?.trim();

    // || this.showShortNameError || this.showDepartmentCodeError

    if (this.showDepartmentNameError) {
      return;
    }

    if (!this.currentDepartment.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/tbldepartments`, this.currentDepartment)
      .subscribe(
        () => {
          this.alertSuccess('Department added successfully!');
          this.getAllDepartments();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error adding department:', error);
          this.alertError('Failed to add department!');
        }
      );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/tbldepartments/${this.currentDepartment.id}`,
        this.currentDepartment
      )
      .subscribe(
        () => {
          this.alertSuccess('Department updated successfully!');
          this.getAllDepartments();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating department:', error);
          this.alertError('Failed to update department!');
        }
      );
  }

  confirmDelete(department: any) {
    this.currentDepartment = { ...department };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteDepartment() {
    if (this.currentDepartment.id) {
      this.deleteRecord(this.currentDepartment);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(department: any) {
    this.http
      .delete(`${apiBaseUrl}api/tbldepartments/${department.id}`)
      .subscribe(
        () => {
          this.alertSuccess('Department deleted successfully!');
          this.getAllDepartments();
        },
        (error) => {
          console.error('Error deleting department:', error);
          this.alertError('Failed to delete department!');
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
    this.currentDepartment = {
      id: '',
      DepartmentName: '',
      DepartmentShortName: '',
      DepartmentCode: '',
      CreationDate: '',
    };
    this.showDepartmentNameError = false;
    // this.showShortNameError = false;
    // this.showDepartmentCodeError = false;
  }

  trackById(index: number, departmentItem: any): number {
    return departmentItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addDepartmentModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        // fallback for first-time close
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }
  }


  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
