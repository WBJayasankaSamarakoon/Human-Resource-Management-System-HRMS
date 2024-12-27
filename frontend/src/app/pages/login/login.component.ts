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
    // Send login request to the backend
    this.http.post(`${apiBaseUrl}api/auth/login`, this.user).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.data.access_token); // Save token
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
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
