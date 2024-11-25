import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  PositionArray: any[] = [];
  currentPosition: any = {
    id: '',
    Name: '',
  };

  constructor(private http: HttpClient) {
    this.getAllPositions();
  }

  getAllPositions() {
    this.http.get(`${apiBaseUrl}api/position`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.PositionArray = resultData;
      } else {
        console.error('API response is not an array:', resultData);
        this.PositionArray = [];
      }
    });
  }

  openAddModal() {
    this.resetForm();
    this.currentPosition.id = '';
  }

  openEditModal(positionItem: any) {
    this.currentPosition = { ...positionItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/position`, this.currentPosition)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Position Registered Successfully');
        this.getAllPositions();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/position/${this.currentPosition.id}`,
        this.currentPosition
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Position Updated Successfully');
        this.getAllPositions();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentPosition.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(positionItem: any) {
    this.http
      .delete(`${apiBaseUrl}api/position/${positionItem.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Position Deleted Successfully');
        this.getAllPositions();
      });
  }

  resetForm() {
    this.currentPosition = {
      id: '',
      Name: '',
    };
  }

  trackById(index: number, positionItem: any): number {
    return positionItem.id;
  }
}
