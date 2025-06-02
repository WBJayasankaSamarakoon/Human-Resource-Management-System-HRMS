import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../../app.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProcessComponent implements OnInit {
  fileData: any[] = [];
  pagedData: any[] = [];
  loading: boolean = false;

  fileId: string = ''; // Changed from any[] to string
  year: number = 0;    // Changed from any[] to number
  month: number = 0;   // Changed from any[] to number

  // Allowances and Deductions
  allowancesArray: any[] = [];
  deductionsArray: any[] = [];
  allowancesMap: { [key: number]: number } = {};
  deductionsMap: { [key: number]: number } = {};

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 25;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const fileId = localStorage.getItem('fileId');

    if (fileId) {
      this.fileId = fileId; // Store the fileId in the component property
      this.loadFileData(fileId);
      this.getAllAllowances();
      this.getAllDeductions();
      this.loadAllowances();
      this.loadDeductions();
    } else {
      console.error('File ID is missing.');
    }
  }

  loadFileData(fileId: string): void {
    this.loading = true;
    const url = `${apiBaseUrl}api/uploaded_files/${fileId}/view/combined-data`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.data && Array.isArray(response.data)) {
          // Store year and month from the response
          this.year = response.year;
          this.month = response.month;

          // Clear existing data before processing
          this.fileData = [];

          // Process and format records
          response.data.forEach((record: any) => {
            this.formatRecord(record);
          });

          this.totalPages = Math.ceil(this.fileData.length / this.pageSize);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updatePagedData();
        } else {
          console.error(response.message || 'No data found for the selected file.');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching file data:', err);
        this.loading = false;
      },
    });
  }

  // Updated saveToDatabase method to use stored fileId, year, and month
  saveToDatabase(): void {
    if (!this.fileId) {
      console.error('No fileId available');
      this.alertError('No file selected!');
      return;
    }

    const payload = {
      year: this.year,
      month: this.month,
      data: this.fileData
    };

    this.http.post(`${apiBaseUrl}api/processreport`, payload).subscribe({
      next: () => this.alertSuccess('Saved to database successfully!'),
      error: (err) => {
        console.error('Error:', err);
        this.alertError('Failed to save data!');
      }
    });
  }

  alertSuccess(message: string): void {
    this.showAlert(message, 'success');
  }

  alertError(message: string): void {
    this.showAlert(message, 'error');
  }

  showAlert(message: string, type: string): void {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.innerText = message;
      alertBox.className = `alert-box visible ${type}`;
      setTimeout(() => {
        alertBox.classList.remove('visible');
      }, 3000);
    }
  }


formatRecord(record: any): any {
  // Initialize or retrieve existing record for the employee
  let existingRecord = this.fileData.find((r) => r.emp_id === record.emp_id);

  if (!existingRecord) {
    existingRecord = {
      emp_id: record.emp_id,
      name: record.name,
      no_pay_count: record.no_pay_count || 0,
      leave_days: record.leave_days || 0,
      holidays: record.holidays || 0,
      late_hours: record.late_hours || 0,
      total_allowances: 0.0,
      total_deductions: 0.0,
      basic_salary: (parseFloat(record.basic_salary) || 0).toFixed(2),
      gross_salary: (parseFloat(record.gross_salary) || 0).toFixed(2),
      net_salary: 0.0,
      days_worked: record.days_worked || 0,
      post_approve_leave: record.post_approve_leave || 0,
      pre_approve_leave: record.pre_approve_leave || 0,
      attendance_incentive: (parseFloat(record.AttendanceIncentive) || 0).toFixed(2),
      super_attendance: (parseFloat(record.SuperAttendance) || 0).toFixed(2),
      performance_incentive: (parseFloat(record.PerformanceIncentive) || 0).toFixed(2),
      bra1: (parseFloat(record.BRA1) || 0).toFixed(2),
      bra2: (parseFloat(record.BRA2) || 0).toFixed(2),
      dynamicAllowances: {},
      dynamicDeductions: {},
      // applyAttendanceLogic: true
    };

    this.fileData.push(existingRecord);
  }

  // Calculate DaysForAttendanceIncentive
  const daysForAttendanceIncentive = 26 - existingRecord.post_approve_leave;

  // if (existingRecord.applyAttendanceLogic) {
  //   existingRecord.attendance_incentive = (existingRecord.attendance_incentive / 26) * daysForAttendanceIncentive;
  // } else {
  //   // If the checkbox is not checked, use the original value
  //   existingRecord.attendance_incentive = parseFloat(record.AttendanceIncentive) || 0.0;
  // }

  // Update performance_incentive calculation without decimals

  // const noPayDays = existingRecord.no_pay_count;
  // const perDayIncentive = existingRecord.performance_incentive / 26;
  // const deduction = perDayIncentive * noPayDays;
  // existingRecord.performance_incentive = Math.floor(existingRecord.performance_incentive - deduction);

  // Filter and Map Allowances
  if (record.allowance_type && record.allowance_amount) {
    const allowanceType = parseInt(record.allowance_type, 10);
    const allowanceAmount = parseFloat(record.allowance_amount);

    if (!isNaN(allowanceType) && !isNaN(allowanceAmount) && allowanceAmount > 0) {
      existingRecord.dynamicAllowances[allowanceType] = allowanceAmount;
    }
  }

  // Filter and Map Deductions
  if (record.deduction_type && record.deduction_amount) {
    const deductionType = parseInt(record.deduction_type, 10);
    const deductionAmount = parseFloat(record.deduction_amount);

    if (!isNaN(deductionType) && !isNaN(deductionAmount) && deductionAmount > 0) {
      existingRecord.dynamicDeductions[deductionType] = deductionAmount;
    }
  }

 // Sum all dynamicAllowances
  existingRecord.total_allowances = Object.values(existingRecord.dynamicAllowances)
    .map(value => Number(value))
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);

  // Sum all dynamicDeductions
  existingRecord.total_deductions = Object.values(existingRecord.dynamicDeductions)
    .map(value => Number(value))
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);

 // Calculate net_salary
 const netSalary =
 parseFloat(existingRecord.basic_salary) +
 parseFloat(existingRecord.bra1) +
 parseFloat(existingRecord.bra2) +
 parseFloat(existingRecord.attendance_incentive) +
 parseFloat(existingRecord.super_attendance) +
 parseFloat(existingRecord.performance_incentive) +
 parseFloat(existingRecord.total_allowances) -
 parseFloat(existingRecord.total_deductions);

// Format net_salary to 2 decimal places
existingRecord.net_salary = netSalary.toFixed(2);

return existingRecord;
}

// adjustAttendanceIncentive(record: any): void {
//   const daysForAttendanceIncentive = 26 - record.post_approve_leave;

//   if (record.applyAttendanceLogic) {
//     // Apply the formula: AttendanceIncentive = (AttendanceIncentive / 26) * DaysForAttendanceIncentive
//     record.attendance_incentive = (record.attendance_incentive / 26) * daysForAttendanceIncentive;
//   } else {
//     // If the checkbox is not checked, use the original value
//     record.attendance_incentive = parseFloat(record.AttendanceIncentive) || 0.0;
//   }
// }


  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.fileData.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  navigateToSlip(empId: string): void {
    this.router.navigate(['/slip'], { queryParams: { emp_id: empId } });
  }

  goBack(): void {
    this.router.navigate(['/view-file']);
  }

  // Fetch all Allowances Names
  getAllAllowances() {
    this.http.get(`${apiBaseUrl}api/addallowance`).subscribe(
      (resultData: any) => {
        this.allowancesArray = Array.isArray(resultData) ? resultData : [];
      },
      () => {
        console.error('Error loading allowances.');
      }
    );
  }

  // Fetch all Deductions Names
  getAllDeductions() {
    this.http.get(`${apiBaseUrl}api/adddeduction`).subscribe(
      (resultData: any) => {
        this.deductionsArray = Array.isArray(resultData) ? resultData : [];
      },
      () => {
        console.error('Error loading deductions.');
      }
    );
  }

  // Load Allowances by mapping type to addallowance.id
  loadAllowances() {
    this.http.get(`${apiBaseUrl}api/allowances`).subscribe(
      (resultData: any) => {
        if (Array.isArray(resultData)) {
          resultData.forEach((allowance: any) => {
            // Map by type which is the id in addallowance table
            if (!this.allowancesMap[allowance.type]) {
              this.allowancesMap[allowance.type] = 0;
            }
            this.allowancesMap[allowance.type] += allowance.amount;
          });
        }
      },
      () => {
        console.error('Error loading allowances amounts.');
      }
    );
  }

  // Load Deductions by mapping type to adddeduction.id
  loadDeductions() {
    this.http.get(`${apiBaseUrl}api/deductions`).subscribe(
      (resultData: any) => {
        if (Array.isArray(resultData)) {
          resultData.forEach((deduction: any) => {
            // Map by type which is the id in adddeduction table
            if (!this.deductionsMap[deduction.type]) {
              this.deductionsMap[deduction.type] = 0;
            }
            this.deductionsMap[deduction.type] += deduction.amount;
          });
        }
      },
      () => {
        console.error('Error loading deductions amounts.');
      }
    );
  }
}
