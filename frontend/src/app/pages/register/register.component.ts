import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    c_password: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // Send registration request to the backend
    this.http.post(`${apiBaseUrl}api/auth/register`, this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.successMessage = 'Registration successful. Please log in!';
        // You can redirect to the login page after successful registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'There was an error with the registration.';
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
}
