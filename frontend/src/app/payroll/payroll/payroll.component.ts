import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any; // jQuery for modal handling

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
})
export class PayrollComponent {
  payrolls: any[] = [];
  employees: any[] = [];
  currentPayroll: any = {
    payroll_id: null,
    emp_id: null,
    basic_salary: '',
    AttendanceIncentive: '',
    SuperAttendance: '',
    PerformanceIncentive: '',
    BRA1: '',
    BRA2: '',
    BRA3: '',
    deductions: '',
    payment_date: '',
  };

  incentiveFields = [
    'AttendanceIncentive',
    'SuperAttendance',
    'PerformanceIncentive',
    'BRA1',
    'BRA2',
    'BRA3',
  ];

  constructor(private http: HttpClient) {
    this.getAllPayrolls();
    this.getAllEmployees();
  }

  // Fetch all payrolls
  getAllPayrolls() {
    this.http.get(`${apiBaseUrl}api/payrolls`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.payrolls = resultData.map((payroll: any) => ({
          ...payroll,
          employee_name: payroll.employee
            ? payroll.employee.NameWithInitials
            : 'Unknown',
          EmpId: payroll.EmpId || 'Unknown', // Add EmpId to payrolls
        }));
      } else {
        console.error('API response is not an array:', resultData);
        this.payrolls = [];
      }
    });
  }

  // Fetch all employees
  getAllEmployees() {
    this.http
      .get(`${apiBaseUrl}api/tblemployees`)
      .subscribe((resultData: any) => {
        if (Array.isArray(resultData)) {
          this.employees = resultData;
        } else {
          console.error('API response is not an array:', resultData);
          this.employees = [];
        }
      });
  }

  // Open modal for adding a new payroll entry
  openAddModal() {
    this.resetForm();
  }

  // Open modal for editing a payroll entry
  openEditModal(payroll: any) {
    this.currentPayroll = { ...payroll };
  }

  // Register a new payroll entry
  register() {
    this.http
      .post(`${apiBaseUrl}api/payrolls`, this.currentPayroll)
      .subscribe((resultData: any) => {
        alert('Payroll Registered Successfully');
        this.getAllPayrolls();
        this.resetForm();
        $('#addPayrollModal').modal('hide');
      });
  }

  // Update an existing payroll entry
  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/payrolls/${this.currentPayroll.payroll_id}`,
        this.currentPayroll
      )
      .subscribe((resultData: any) => {
        alert('Payroll Updated Successfully');
        this.getAllPayrolls(); // Refresh table after update
        this.resetForm();
        $('#addPayrollModal').modal('hide');
      });
  }

  // Save payroll (either add or update)
  save() {
    if (!this.currentPayroll.payroll_id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Set for deletion
  setDelete(payroll: any) {
    if (confirm('Are you sure you want to delete this payroll?')) {
      this.http
        .delete(`${apiBaseUrl}api/payrolls/${payroll.payroll_id}`)
        .subscribe(
          (resultData: any) => {
            alert('Payroll Deleted Successfully');
            this.getAllPayrolls(); // Refresh payroll list after deletion
          },
          (error) => {
            console.error('Error deleting payroll:', error);
            alert(
              `Error deleting payroll: ${
                error.error?.message || error.message || 'Unknown error'
              }`
            );
          }
        );
    }
  }

  // Reset form to initial state
  resetForm() {
    this.currentPayroll = {
      payroll_id: null,
      emp_id: null,
      basic_salary: '',
      AttendanceIncentive: '',
      SuperAttendance: '',
      PerformanceIncentive: '',
      BRA1: '',
      BRA2: '',
      BRA3: '',
      deductions: '',
      payment_date: '',
    };
  }

  // Track by function for better performance with ngFor
  trackById(index: number, payroll: any): number {
    return payroll.payroll_id;
  }
}
