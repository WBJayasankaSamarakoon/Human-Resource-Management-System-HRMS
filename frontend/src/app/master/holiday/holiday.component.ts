import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
})
export class HolidayComponent {
  HolidayArray: any[] = [];
  isResultLoaded = false;
  title: string = '';
  date: string = '';
  currentHolidayID = '';

  constructor(private http: HttpClient) {
    this.getAllHolidays();
  }

  openModal(holidayItem: any = null) {
    if (holidayItem) {
      // Edit mode
      this.title = holidayItem.Title;
      this.date = holidayItem.Date;
      this.currentHolidayID = holidayItem.id;
    } else {
      // Add mode
    }
  }

  getAllHolidays() {
    this.http.get(`${apiBaseUrl}api/event`).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData);
      this.HolidayArray = resultData;
    });
  }

  register() {
    let bodyData = { Title: this.title, Date: this.date };
    this.http
      .post(`${apiBaseUrl}api/event`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Holiday Registered Successfully');
        this.getAllHolidays();
        this.title = '';
        this.date = '';
      });
  }

  setUpdate(data: any) {
    this.title = data.Title;
    this.date = data.Date;
    this.currentHolidayID = data.id;
  }

  updateRecords() {
    let bodyData = { Title: this.title, Date: this.date };
    this.http
      .put(`${apiBaseUrl}api/event/${this.currentHolidayID}`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Holiday Updated Successfully');
        this.getAllHolidays();
        this.title = '';
        this.date = '';
      });
  }

  save() {
    if (this.currentHolidayID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/event/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Holiday Deleted Successfully');
        this.getAllHolidays();
      });
  }
}
