import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today', // Left side: Previous, Next, Today buttons
      center: 'title', // Center: Calendar title (month and year)
      right: 'dayGridMonth,timeGridWeek,timeGridDay', // Right side: View options
    },
    editable: false,
    selectable: false,
    events: [
      { title: 'Sample Event 1', start: '2024-11-05', end: '2024-11-06' },
      { title: 'Sample Event 2', start: '2024-11-10' },
      { title: 'Sample Event 3', start: '2024-11-15', end: '2024-11-16' },
    ],
  };
}
