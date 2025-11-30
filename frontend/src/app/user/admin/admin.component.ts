import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isSubmitting = false;
  errorMessage: string = '';
  successMessage: string = '';
  showConfirmationModal = false;
  showAddUserModal = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  loadAdmins() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get(`${apiBaseUrl}api/auth/users`, { headers: this.getAuthHeaders() }).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.admins = response.data;
        } else {
          this.admins = [];
          this.errorMessage = 'No users found';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized. Please login again.';
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = error.error?.message || 'Failed to load users';
        }
        this.admins = [];
      }
    });
  }

  refreshAdmins() {
    this.loadAdmins();
  }

  openAddUserModal() {
    this.resetForm();
    this.showAddUserModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
    this.resetForm();
  }

  register() {
    // Validate form
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.c_password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.user.password !== this.user.c_password) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${apiBaseUrl}api/auth/register`, this.user).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = 'User registered successfully!';
          this.closeAddUserModal();
          setTimeout(() => {
            this.loadAdmins();
          }, 500);
        } else {
          this.errorMessage = response.message || 'Registration failed';
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.isSubmitting = false;
        if (error.error?.data) {
          // Handle validation errors
          const errors = error.error.data;
          this.errorMessage = Object.values(errors).flat().join(', ');
        } else {
          this.errorMessage = error.error?.message || 'There was an error with the registration.';
        }
      }
    });
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
    this.currentAdmin = null;
  }

  deleteAdmin() {
    if (!this.currentAdmin) return;

    this.http.delete(`${apiBaseUrl}api/auth/users/${this.currentAdmin.id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = `User "${this.currentAdmin.name}" deleted successfully`;
          this.closeConfirmationModal();
          setTimeout(() => {
            this.loadAdmins();
          }, 500);
        } else {
          this.errorMessage = response.message || 'Failed to delete user';
        }
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.errorMessage = error.error?.message || 'Failed to delete user';
        this.closeConfirmationModal();
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
