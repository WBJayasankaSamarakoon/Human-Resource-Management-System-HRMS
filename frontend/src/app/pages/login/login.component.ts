import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMessage = '';
    // Send login request to the backend
    this.http.post(`${apiBaseUrl}api/auth/login`, this.user).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        if (response.success && response.data && response.data.access_token) {
          localStorage.setItem('token', response.data.access_token); // Save token
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error?.message || 'Invalid email or password';
      }
    });
  }

  resetForm() {
    this.user = {
      email: '',
      password: '',
    };
    this.errorMessage = '';
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
