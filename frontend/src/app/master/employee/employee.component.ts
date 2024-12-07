import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  EmployeeArray: any[] = [];
  currentEmployee: any = {
    id: '',
    EmpId: null, // EmpId should be numeric
    NameWithInitials: '',
    EPFNumber: '',
    Phone: '',
    CurrentAddress: '',
    PermanentAddress: '',
    PersonalEmail: '',
    CompanyEmail: '',
    DateOfJoining: '',
    Status: '',
    Designation: '',
    Branch: '',
  };

  constructor(private http: HttpClient) {
    this.getAllEmployees();
  }

  // Fetch all employees
  getAllEmployees() {
    this.http
      .get(`${apiBaseUrl}api/tblemployees`)
      .subscribe((resultData: any) => {
        if (Array.isArray(resultData)) {
          this.EmployeeArray = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.EmployeeArray = [];
        }
      });
  }

  // Open Add Modal
  openAddModal() {
    this.resetForm();
    this.currentEmployee.id = '';
  }

  // Open Edit Modal
  openEditModal(employeeItem: any) {
    this.currentEmployee = { ...employeeItem };
  }

  // Register a new employee
  register() {
    this.http
      .post(`${apiBaseUrl}api/tblemployees`, this.currentEmployee)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Successfully');
        this.getAllEmployees();
        this.resetForm();
      });
  }

  // Update employee details
  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/tblemployees/${this.currentEmployee.id}`,
        this.currentEmployee
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Updated Successfully');
        this.getAllEmployees();
        this.resetForm();
      });
  }

  // Save action based on current mode (Add or Edit)
  save() {
    if (!this.currentEmployee.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Delete an employee
  setDelete(data: any) {
    if (confirm(`Are you sure you want to delete ${data.NameWithInitials}?`)) {
      this.http
        .delete(`${apiBaseUrl}api/tblemployees/${data.id}`)
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert('Employee Deleted Successfully');
          this.getAllEmployees();
        });
    }
  }

  // Reset the form fields
  resetForm() {
    this.currentEmployee = {
      id: '',
      EmpId: null, // Ensure EmpId is reset to null
      NameWithInitials: '',
      EPFNumber: '',
      Phone: '',
      CurrentAddress: '',
      PermanentAddress: '',
      PersonalEmail: '',
      CompanyEmail: '',
      DateOfJoining: '',
      Status: '',
      Designation: '',
      Branch: '',
    };
  }

  // Track by ID for ngFor
  trackById(index: number, employeeItem: any): number {
    return employeeItem.id;
  }
}
