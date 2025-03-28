import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
    Logo: ''
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  selectedFile: File | null = null;
  previewLogo: string | null = null;

  constructor(private http: HttpClient) {
    this.getAllCompanies();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.selectedFile = file;
        // Preview logo
        const reader = new FileReader();
        reader.onload = e => {
            this.previewLogo = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
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
  this.previewLogo = this.currentCompany.Logo;
  this.removeModalFade();
}

  save() {
    if (!this.currentCompany.Name?.trim()) {
      this.showNameError = true;
      return;
    }

    this.showNameError = false;

    if (!this.currentCompany.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    const formData = new FormData();
    formData.append('Name', this.currentCompany.Name);
    formData.append('Address', this.currentCompany.Address);
    formData.append('Email', this.currentCompany.Email);
    formData.append('Telephone', this.currentCompany.Telephone);
    formData.append('Fax', this.currentCompany.Fax);
    if (this.selectedFile) {
        formData.append('Logo', this.selectedFile);
    }

    this.http.post(`${apiBaseUrl}api/company`, formData).subscribe(
        () => {
            this.alertSuccess('Company added successfully!');
            this.getAllCompanies();
            this.resetForm();
            this.closeModal();
        },
        (error) => {
            console.error('Error adding company:', error);
            this.alertError('Failed to add company!');
        }
    );
}

updateRecords() {
  const formData = new FormData();
  formData.append('Name', this.currentCompany.Name);
  formData.append('Address', this.currentCompany.Address);
  formData.append('Email', this.currentCompany.Email);
  formData.append('Telephone', this.currentCompany.Telephone);
  formData.append('Fax', this.currentCompany.Fax);

  if (this.selectedFile) {
    formData.append('Logo', this.selectedFile);
  }

  this.http
    .post(`${apiBaseUrl}api/company/update/${this.currentCompany.id}`, formData)
    .subscribe(
      () => {
        this.alertSuccess('Company updated successfully!');
        this.getAllCompanies();
        this.resetForm();
        this.closeModal();
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
        Logo: ''
    };
    this.selectedFile = null;
    this.previewLogo = null;
}

  clearValidationErrors() {
    const formElements = document.querySelectorAll(
      '.form-control.ng-dirty, .form-control.ng-touched'
    );
    formElements.forEach((element) => {
      element.classList.remove('ng-dirty', 'ng-touched');
    });
  }

  trackById(index: number, companyItem: any): number {
    return companyItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addCompanyModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      // this.resetForm();
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
