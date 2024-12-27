import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  CompanyArray: any[] = [];
  currentCompany: any = {
    id: '',
    Name: '',
    Address: '',
    Email: '',
    Telephone: '',
    Fax: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/company`).subscribe(
      (resultData: any) => {
        this.CompanyArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading companies.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.removeModalFade();
  }

  openEditModal(companyItem: any) {
    this.currentCompany = { ...companyItem };
    this.showNameError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentCompany.Name?.trim();

    if (this.showNameError) {
      return;
    }

    if (!this.currentCompany.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/company`, this.currentCompany).subscribe(
      () => {
        this.alertSuccess('Company added successfully!');
        this.getAllCompanies();
        this.resetForm();
        this.closeModal(); // Close modal after save
      },
      (error) => {
        console.error('Error adding company:', error);
        this.alertError('Failed to add company!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/company/${this.currentCompany.id}`,
        this.currentCompany
      )
      .subscribe(
        () => {
          this.alertSuccess('Company updated successfully!');
          this.getAllCompanies();
          this.resetForm();
          this.closeModal(); // Close modal after update
        },
        (error) => {
          console.error('Error updating company:', error);
          this.alertError('Failed to update company!');
        }
      );
  }

  confirmDelete(company: any) {
    this.currentCompany = { ...company };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteCompany() {
    if (this.currentCompany.id) {
      this.deleteRecord(this.currentCompany);
      this.alertSuccess(
        `Company ${this.currentCompany.Name} deleted successfully!`
      );
      this.closeConfirmationModal();
    }
  }

  deleteRecord(company: any) {
    this.http.delete(`${apiBaseUrl}api/company/${company.id}`).subscribe(() => {
      this.alertSuccess('Company deleted successfully!');
      this.getAllCompanies();
    });
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
    this.currentCompany = {
      id: '',
      Name: '',
      Address: '',
      Email: '',
      Telephone: '',
      Fax: '',
    };
  }

  trackById(index: number, companyItem: any): number {
    return companyItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addCompanyModal') as HTMLElement;
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
