import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from 'src/app/app.config';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
  DepartmentArray: any[] = [];
  currentDepartment: any = {
    id: '',
    DeptName: '',
    DeptShortName: '',
    DeptCode: '',
    CreationDate: '',
  };

  constructor(private http: HttpClient) {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.http
      .get(`${apiBaseUrl}api/tbldepartments`)
      .subscribe((resultData: any) => {
        if (Array.isArray(resultData)) {
          this.DepartmentArray = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.DepartmentArray = [];
        }
      });
  }

  // Adjust modal opening functions
  openAddModal() {
    this.resetForm();
    this.currentDepartment.id = '';
  }

  openEditModal(departmentItem: any) {
    this.currentDepartment = { ...departmentItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/tbldepartments`, this.currentDepartment)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Department Registered Successfully');
        this.getAllDepartments();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/tbldepartments/${this.currentDepartment.id}`,
        this.currentDepartment
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Department Updated Successfully');
        this.getAllDepartments();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentDepartment.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/tbldepartments/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Department Deleted Successfully');
        this.getAllDepartments();
      });
  }

  resetForm() {
    this.currentDepartment = {
      id: '',
      DeptName: '',
      DeptShortName: '',
      DeptCode: '',
      CreationDate: '',
    };
  }

  trackById(index: number, departmentItem: any): number {
    return departmentItem.id;
  }
}
