import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiBaseUrl } from 'src/app/app.config';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    CommonModule,
  ],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    this.http.post(`${apiBaseUrl}/api/login`, credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Login failed, please check your credentials');
        }
      },
      error: () => alert('Login failed, please check your credentials'),
    });
  }
}
