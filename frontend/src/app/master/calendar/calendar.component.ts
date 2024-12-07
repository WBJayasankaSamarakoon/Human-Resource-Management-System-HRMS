import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
    },
    editable: false,
    selectable: true,
    events: [],
    dateClick: this.handleDateClick.bind(this),
  };

  showModal = false;
  newEvent = { title: '', date: '' };
  apiUrl = 'http://localhost:8000/api/events';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.calendarOptions.events = data.map((event: any) => ({
        title: event.Title,
        start: event.Date,
      }));
    });
  }

  handleDateClick(arg: any): void {
    this.newEvent.date = arg.dateStr;
    this.showModal = true;
  }

  addEvent(event: Event): void {
    event.preventDefault();

    const eventData = {
      Title: this.newEvent.title,
      Date: this.newEvent.date,
    };

    this.http.post(this.apiUrl, eventData).subscribe(() => {
      this.loadEvents();
      this.closeModal();
    });
  }

  closeModal(): void {
    this.newEvent = { title: '', date: '' };
    this.showModal = false;
  }
}
