import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProcessComponent implements OnInit {
  fileData: any[] = [];
  events: any[] = [];
  leaves: any[] = [];
  employeeData: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const fileDataString = localStorage.getItem('fileData');
    const eventsString = localStorage.getItem('events');
    const leavesString = localStorage.getItem('leaves');

    this.fileData = fileDataString ? JSON.parse(fileDataString) : [];
    this.events = eventsString ? JSON.parse(eventsString) : [];
    this.leaves = leavesString ? JSON.parse(leavesString) : [];

    // Process the data for all employees
    this.processAllEmployeeData();
  }

  /**
   * Processes the attendance data for all employees
   */
  processAllEmployeeData(): void {
    // Process and format the data for all employees
    this.employeeData = this.fileData.map((data) => {
      const isWeekend = ['Sat.', 'Sun.'].includes(data.week);
      const shiftStart = isWeekend ? '08:30:00' : '08:30:00';
      const shiftEnd = isWeekend ? '12:30:00' : '17:30:00';

      // Calculate Late In (Check-in - Shift Start) and Early Out (Check-out - Shift End)
      const lateIn = this.calculateTimeDifference(
        data.check_in,
        shiftStart,
        'late'
      );
      const earlyOut = this.calculateTimeDifference(
        data.check_out,
        shiftEnd,
        'early'
      );

      // Check if the day is a holiday or leave day
      const holiday = this.isHoliday(data.date);
      const leaveReason = this.getLeaveReason(data.date);

      return {
        ...data,
        shiftStart,
        shiftEnd,
        lateIn,
        earlyOut,
        holiday,
        leaveReason,
      };
    });
  }

  /**
   * Calculates the time difference between two times (in HH:MM:SS format)
   * @param startTime
   * @param endTime
   * @param type
   * @returns
   */
  calculateTimeDifference(
    startTime: string,
    endTime: string,
    type: string
  ): string {
    if (!startTime || !endTime) return '0:00';

    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    const diffMs = start.getTime() - end.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    const hours = Math.floor(Math.abs(diffMinutes) / 60);
    const minutes = Math.abs(diffMinutes) % 60;

    if (type === 'late' && diffMs > 0) {
      return `Late ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    if (type === 'early' && diffMs < 0) {
      return `Early ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    return 'On time';
  }

  /**
   * Checks if the given date is a holiday
   * @param date
   * @returns
   */
  isHoliday(date: string): boolean {
    return this.events.some((event) => event.date === date);
  }

  /**
   * Retrieves the leave reason for a given date
   * @param date
   * @returns
   */
  getLeaveReason(date: string): string | null {
    const leave = this.leaves.find((leave) => leave.date === date);
    return leave ? leave.reason : null;
  }

  goBack(): void {
    this.router.navigate(['/view']);
  }
  processData(): void {
    this.router.navigate(['/report']);
    console.log('Navigating to the report page...');
  }
}
