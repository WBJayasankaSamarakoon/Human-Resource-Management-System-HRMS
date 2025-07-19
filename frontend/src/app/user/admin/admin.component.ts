import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    c_password: '',
  };
  admins: any[] = [];
  currentAdmin: any = null;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';
  showConfirmationModal = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/auth/admins`).subscribe(
      (response: any) => {
        this.admins = response.data;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load admin users';
      }
    );
  }

  refreshAdmins() {
    this.loadAdmins();
  }

  register() {
    this.http.post(`${apiBaseUrl}api/auth/register`, this.user).subscribe(
      (response: any) => {
        this.successMessage = 'Registration successful!';
        this.resetForm();
        this.loadAdmins();
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error?.message || 'There was an error with the registration.';
      }
    );
  }

  resetForm() {
    this.user = {
      name: '',
      email: '',
      password: '',
      c_password: '',
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  confirmDelete(admin: any) {
    this.currentAdmin = admin;
    this.showConfirmationModal = true;
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }

  deleteAdmin() {
    if (!this.currentAdmin) return;

    this.http.delete(`${apiBaseUrl}api/auth/admins/${this.currentAdmin.id}`).subscribe(
      (response: any) => {
        this.successMessage = 'Admin deleted successfully';
        this.closeConfirmationModal();
        this.loadAdmins();
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to delete admin';
        this.closeConfirmationModal();
      }
    );
  }
}
