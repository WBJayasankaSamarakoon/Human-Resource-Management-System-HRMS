import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ReportComponent implements OnInit {
  employeeData: any[] = [];
  employeeReports: any[] = [];
  payrollData: any[] = [];
  events: any[] = [];
  selectedEmpId: number | null = null;
  selectedMonth: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const fileDataString = localStorage.getItem('fileData');
    const leavesString = localStorage.getItem('leaves');

    const fileData = fileDataString ? JSON.parse(fileDataString) : [];
    const leaves = leavesString ? JSON.parse(leavesString) : [];

    // Fetch events (holidays) and payroll data from the backend
    this.fetchEvents();
    this.fetchPayrollData();

    // Process the data for employee monthly report
    this.generateMonthlyReport(fileData, leaves);
  }

  fetchEvents(): void {
    // Fetch events (holidays) data from the backend
    this.http.get<any[]>(`${apiBaseUrl}api/events`).subscribe(
      (data) => {
        console.log('Fetched events:', data);
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events data', error);
      }
    );
  }

  fetchPayrollData(): void {
    // Fetch all payroll records
    this.http.get<any[]>(`${apiBaseUrl}api/payrolls`).subscribe(
      (resultData) => {
        if (Array.isArray(resultData)) {
          this.payrollData = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.payrollData = [];
        }
      },
      (error) => {
        console.error('Error fetching payroll data', error);
      }
    );
  }

  // Fetch payroll records by EmpId
  getReportsByEmpId(): void {
    if (!this.selectedEmpId) {
      alert('Please select an Employee ID.');
      return;
    }

    this.http
      .get<any[]>(`${apiBaseUrl}api/payrolls/by-empid/${this.selectedEmpId}`)
      .subscribe(
        (resultData) => {
          if (Array.isArray(resultData)) {
            this.payrollData = resultData;
          } else {
            console.error('API response is not an array:', resultData);
            this.payrollData = [];
          }
        },
        (error) => {
          console.error('Error fetching payroll data by EmpId:', error);
        }
      );
  }

  // Track by function for better performance with ngFor
  trackById(index: number, report: any): number {
    return report.payroll_id;
  }

  generateMonthlyReport(fileData: any[], leaves: any[]): void {
    const reportMap = new Map<string, any>();

    fileData.forEach((data) => {
      const employeeId = data.person_id;
      const empId = data.emp_id;
      const month = data.date.slice(0, 7);
      const combinedId = `${employeeId}-${empId}`;

      const key = `${combinedId}-${month}`;

      if (!reportMap.has(key)) {
        reportMap.set(key, {
          combinedId: combinedId,
          person_id: employeeId,
          emp_id: empId,
          name: data.name,
          department: data.department,
          month: month,
          lateInHours: 0,
          earlyOutHours: 0,
          holidays: 0,
          leaves: 0,
          basicSalary: 0,
          AttendanceIncentive: 0,
          SuperAttendance: 0,
          PerformanceIncentive: 0,
          BRA1: 0,
          BRA2: 0,
          BRA3: 0,
          netSalary: 0,
        });
      }

      const report = reportMap.get(key);

      // Calculate lateInHours and earlyOutHours
      this.calculateEmployeeHours(data, report, leaves);

      // Add holidays for the current month
      this.addHolidaysForMonth(report, month);

      // Retrieve payroll data for the employee
      const payroll = this.payrollData.find(
        (pay) => pay.emp_id === empId && pay.payment_date.startsWith(month)
      );
      if (payroll) {
        report.basicSalary = payroll.basic_salary;
        report.AttendanceIncentive = payroll.AttendanceIncentive;
        report.SuperAttendance = payroll.SuperAttendance;
        report.PerformanceIncentive = payroll.PerformanceIncentive;
        report.BRA1 = payroll.BRA1;
        report.BRA2 = payroll.BRA2;
        report.BRA3 = payroll.BRA3;
        report.netSalary = payroll.net_salary;
      }
    });

    this.employeeReports = Array.from(reportMap.values());
  }

  // Add holidays to the report based on the month
  addHolidaysForMonth(report: any, month: string): void {
    const holidaysInMonth = this.events.filter((event) => {
      const eventMonth = event.Date.slice(0, 7); // Extract month (YYYY-MM)
      return eventMonth === month; // Match the event's month with the report month
    });

    report.holidays = holidaysInMonth.length; // Count holidays in that month
  }

  calculateEmployeeHours(data: any, report: any, leaves: any[]): void {
    const shiftStart =
      data.week === 'Sat.' || data.week === 'Sun.' ? '08:30:00' : '08:30:00';
    const lateIn = this.calculateTimeDifference(
      data.check_in,
      shiftStart,
      'late'
    );
    if (lateIn !== 'On time') {
      const lateInMinutes = this.convertTimeToMinutes(lateIn);
      report.lateInHours += lateInMinutes / 60;
    }

    const shiftEnd =
      data.week === 'Sat.' || data.week === 'Sun.' ? '12:30:00' : '17:30:00';
    const earlyOut = this.calculateTimeDifference(
      data.check_out,
      shiftEnd,
      'early'
    );
    if (earlyOut !== 'On time') {
      const earlyOutMinutes = this.convertTimeToMinutes(earlyOut);
      report.earlyOutHours += earlyOutMinutes / 60;
    }

    if (leaves.some((leave) => leave.date === data.date)) {
      report.leaves += 1;
    }
  }

  generateReport(report: any): void {
    this.router.navigate(['/slip'], { state: { employee: report } });
  }

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
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    if (type === 'early' && diffMs < 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    return 'On time';
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  goBack(): void {
    this.router.navigate(['/process']);
  }

  downloadReport(): void {
    // Placeholder for the report download functionality
    console.log('Downloading report...');
  }
}
