import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-type',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './typeleave.component.html',
  styleUrls: ['./typeleave.component.scss'],
})
export class LeaveTypeComponent {
  leaveTypesArray: any[] = [];
  currentLeaveType: any = {
    id: '',
    LeaveType: '',
    Description: '',
  };

  constructor(private http: HttpClient) {
    this.getAllLeaveTypes();
  }

  getAllLeaveTypes() {
    this.http
      .get(`${apiBaseUrl}api/leavetypes`)
      .subscribe((resultData: any) => {
        if (Array.isArray(resultData)) {
          this.leaveTypesArray = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.leaveTypesArray = [];
        }
      });
  }

  openAddModal() {
    this.resetForm();
    this.currentLeaveType.id = '';
  }

  openEditModal(leaveTypeItem: any) {
    this.currentLeaveType = { ...leaveTypeItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/leavetypes`, this.currentLeaveType)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Leave Type Added Successfully');
        this.getAllLeaveTypes();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/leavetypes/${this.currentLeaveType.id}`,
        this.currentLeaveType
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Leave Type Updated Successfully');
        this.getAllLeaveTypes();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentLeaveType.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/leavetypes/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Leave Type Deleted Successfully');
        this.getAllLeaveTypes();
      });
  }

  resetForm() {
    this.currentLeaveType = {
      id: '',
      LeaveType: '',
      Description: '',
    };
  }

  trackById(index: number, leaveType: any): number {
    return leaveType.id;
  }
}
