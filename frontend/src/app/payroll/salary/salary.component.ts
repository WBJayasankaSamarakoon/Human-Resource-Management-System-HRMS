import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent {
  SalaryArray: any[] = [];
  currentSalary: any = {
    id: '',
    Name: '',
    Value: '',
  };

  constructor(private http: HttpClient) {
    this.getAllSalaries();
  }

  getAllSalaries() {
    this.http
      .get(`${apiBaseUrl}api/salarystructure`)
      .subscribe((resultData: any) => {
        if (Array.isArray(resultData)) {
          this.SalaryArray = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.SalaryArray = [];
        }
      });
  }

  openAddModal() {
    this.resetForm();
    this.currentSalary.id = '';
  }

  openEditModal(salaryItem: any) {
    this.currentSalary = { ...salaryItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/salarystructure`, this.currentSalary)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Salary Added Successfully');
        this.getAllSalaries();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/salarystructure/${this.currentSalary.id}`,
        this.currentSalary
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Salary Updated Successfully');
        this.getAllSalaries();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentSalary.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/salarystructure/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Salary Deleted Successfully');
        this.getAllSalaries();
      });
  }

  resetForm() {
    this.currentSalary = {
      id: '',
      Name: '',
      Value: '',
    };
  }

  trackById(index: number, salaryItem: any): number {
    return salaryItem.id;
  }
}
