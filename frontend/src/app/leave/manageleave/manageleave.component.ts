import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manageleave',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manageleave.component.html',
  styleUrls: ['./manageleave.component.scss'],
})
export class ManageLeaveComponent {
  leaveArray: any[] = [];
  employeesArray: any[] = [];
  leaveTypesArray: any[] = [];
  currentLeave: any = {
    id: '',
    employeeId: '',
    leaveTypeId: '',
    startDate: '',
    endDate: '',
  };

  constructor(private http: HttpClient) {
    this.getAllLeaves();
    this.getAllEmployees();
    this.getAllLeaveTypes();
  }

  getAllLeaves() {
    this.http.get(`${apiBaseUrl}api/leave`).subscribe((data: any) => {
      this.leaveArray = data;
    });
  }

  getAllEmployees() {
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe((data: any) => {
      this.employeesArray = data;
    });
  }

  getAllLeaveTypes() {
    this.http.get(`${apiBaseUrl}api/tblleavetype`).subscribe((data: any) => {
      this.leaveTypesArray = data;
    });
  }

  openAddModal() {
    this.resetForm();
    this.currentLeave.id = '';
  }

  openEditModal(leave: any) {
    this.currentLeave = { ...leave };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/leave`, this.currentLeave)
      .subscribe(() => {
        alert('Leave Registered Successfully');
        this.getAllLeaves();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/leave/${this.currentLeave.id}`, this.currentLeave)
      .subscribe(() => {
        alert('Leave Updated Successfully');
        this.getAllLeaves();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentLeave.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(leave: any) {
    this.http.delete(`${apiBaseUrl}api/leave/${leave.id}`).subscribe(() => {
      alert('Leave Deleted Successfully');
      this.getAllLeaves();
    });
  }

  resetForm() {
    this.currentLeave = {
      id: '',
      employeeId: '',
      leaveTypeId: '',
      startDate: '',
      endDate: '',
    };
  }

  trackById(index: number, leave: any) {
    return leave.id;
  }
}
