import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  adminArray: any[] = [];
  currentAdmin: any = { id: '', username: '', email: '', password: '' };

  constructor(private http: HttpClient) {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.http.get(`${apiBaseUrl}api/admin`).subscribe({
      next: (resultData: any) => {
        if (Array.isArray(resultData)) {
          this.adminArray = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.adminArray = [];
        }
      },
      error: (error) => console.error('Error fetching admins:', error),
    });
  }

  openAddModal() {
    this.resetForm();
  }

  openEditModal(adminItem: any) {
    this.currentAdmin = { ...adminItem, password: '' };
  }

  save() {
    if (!this.currentAdmin.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/admin`, this.currentAdmin).subscribe({
      next: (resultData: any) => {
        alert('Admin Registered Successfully');
        this.getAllAdmins();
        this.resetForm();
      },
      error: (error) => console.error('Error registering admin:', error),
    });
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/admin/${this.currentAdmin.id}`, this.currentAdmin)
      .subscribe({
        next: (resultData: any) => {
          alert('Admin Updated Successfully');
          this.getAllAdmins();
          this.resetForm();
        },
        error: (error) => console.error('Error updating admin:', error),
      });
  }

  setDelete(adminItem: any) {
    this.http.delete(`${apiBaseUrl}api/admin/${adminItem.id}`).subscribe({
      next: (resultData: any) => {
        alert('Admin Deleted Successfully');
        this.getAllAdmins();
      },
      error: (error) => console.error('Error deleting admin:', error),
    });
  }

  resetForm() {
    this.currentAdmin = { id: '', username: '', email: '', password: '' };
  }

  // Define trackById to be used in ngFor
  trackById(index: number, adminItem: any): number {
    return adminItem.id;
  }
}
