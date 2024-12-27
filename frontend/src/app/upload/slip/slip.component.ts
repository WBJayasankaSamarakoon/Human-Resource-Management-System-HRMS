import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';

@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss'],
  standalone: true,
})
export class SlipComponent implements OnInit {
  employee: any;
  slipData: any = {}; // To store the slip data
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the employee ID from the route or history state
    const empId = this.route.snapshot.queryParamMap.get('emp_id');

    if (empId) {
      this.loadSlipData(empId);
    } else {
      console.error('Employee ID is missing.');
    }
  }

  loadSlipData(empId: string): void {
    this.loading = true;
    const fileId = localStorage.getItem('fileId');
    if (!fileId) {
      console.error('File ID is missing.');
      this.loading = false;
      return;
    }

    const url = `${apiBaseUrl}api/uploaded_files/${fileId}/view/combined-data`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response && response.data) {
          // Find the specific employee data
          const employeeData = response.data.find(
            (item: any) => item.emp_id === parseInt(empId)
          );

          if (employeeData) {
            this.slipData = {
              empId: employeeData.emp_id,
              name: employeeData.name,
              basicSalary: employeeData.basic_salary,
              attendanceIncentive: employeeData.AttendanceIncentive,
              superAttendance: employeeData.SuperAttendance,
              performanceIncentive: employeeData.PerformanceIncentive,
              bra1: employeeData.BRA1,
              bra2: employeeData.BRA2,
              bra3: employeeData.BRA3,
              lateHours: employeeData.late_hours,
              totalAllowances: employeeData.total_allowances,
              deductions: employeeData.deductions,
              netSalary: employeeData.net_salary,
              leaveDays: employeeData.leave_days,
              holidays: employeeData.holidays,
              balanceLeaves: employeeData.balanceLeaves || '0.00',
              epf: employeeData.epf || '0.00',
              advanced: employeeData.advanced || '0.00',
              telephoneExpenses: employeeData.telephoneExpenses || '0.00',
              apiTax: employeeData.apiTax || '0.00',
              totalDeductions: employeeData.totalDeductions || '0.00',
            };
          } else {
            console.error('Employee data not found.');
          }
        } else {
          console.error('No data found in the response.');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching file data:', err);
        this.loading = false;
      },
    });
  }
}
