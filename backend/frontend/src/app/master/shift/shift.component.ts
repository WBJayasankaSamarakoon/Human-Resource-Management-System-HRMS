import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shift',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
})
export class ShiftComponent {
  ShiftArray: any[] = [];
  currentShift: any = {
    id: '',
    StartTime: '',
    EndTime: '',
    Week: '',
  };

  constructor(private http: HttpClient) {
    this.getAllShifts();
  }

  getAllShifts() {
    this.http.get(`${apiBaseUrl}api/shift`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.ShiftArray = resultData;
      } else {
        console.error('API response is not an array:', resultData);
        this.ShiftArray = [];
      }
    });
  }

  // Adjust modal opening functions
  openAddModal() {
    this.resetForm();
    this.currentShift.id = '';
  }

  openEditModal(shiftItem: any) {
    this.currentShift = { ...shiftItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/shift`, this.currentShift)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Shift Registered Successfully');
        this.getAllShifts();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(`${apiBaseUrl}api/shift/${this.currentShift.id}`, this.currentShift)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Shift Updated Successfully');
        this.getAllShifts();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentShift.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/shift/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Shift Deleted Successfully');
        this.getAllShifts();
      });
  }

  resetForm() {
    this.currentShift = {
      id: '',
      StartTime: '',
      EndTime: '',
      Week: '',
    };
  }

  trackById(index: number, shiftItem: any): number {
    return shiftItem.id;
  }
}
