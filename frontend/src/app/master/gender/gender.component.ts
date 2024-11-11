import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent {
  GenderArray: any[] = [];
  currentGender: any = {
    id: '',
    Name: '',
  };

  constructor(private http: HttpClient) {
    this.getAllGenders();
  }

  getAllGenders() {
    this.http.get(`${apiBaseUrl}api/gender`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.GenderArray = resultData;
      } else {
        console.error('API response is not an array:', resultData);
        this.GenderArray = [];
      }
    });
  }

  // Modal opening functions
  openAddModal() {
    this.resetForm();
    this.currentGender.id = '';
  }

  openEditModal(genderItem: any) {
    this.currentGender = { ...genderItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/gender`, this.currentGender)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Gender Registered Successfully');
        this.getAllGenders();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/gender/${this.currentGender.id}`,
        this.currentGender
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Gender Updated Successfully');
        this.getAllGenders();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentGender.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/gender/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Gender Deleted Successfully');
        this.getAllGenders();
      });
  }

  resetForm() {
    this.currentGender = {
      id: '',
      Name: '',
    };
  }

  trackById(index: number, genderItem: any): number {
    return genderItem.id;
  }
}
