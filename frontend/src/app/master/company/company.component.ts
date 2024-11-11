import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient) {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.http.get(`${apiBaseUrl}api/company`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.CompanyArray = resultData;
      } else {
        console.error('API response is not an array:', resultData);
        this.CompanyArray = [];
      }
    });
  }

  // Adjust modal opening functions
  openAddModal() {
    this.resetForm();
    this.currentCompany.id = '';
  }

  openEditModal(companyItem: any) {
    this.currentCompany = { ...companyItem };
  }
  register() {
    this.http
      .post(`${apiBaseUrl}api/company`, this.currentCompany)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Company Registered Successfully');
        this.getAllCompanies();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/company/${this.currentCompany.id}`,
        this.currentCompany
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Company Updated Successfully');
        this.getAllCompanies();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentCompany.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/company/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Company Deleted Successfully');
        this.getAllCompanies();
      });
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
}
