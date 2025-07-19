import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-yearreport',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './yeareport.component.html',
  styleUrls: ['./yeareport.component.scss']
})
export class YearreportComponent {
  reportArray: any[] = [];
  filteredReports: any[] = [];
  groupedByMonth: any[] = [];
  currentReport: any = {};
  isLoading: boolean = false;
  showFieldError: boolean = false;
  isEdit: boolean = false;
  selectedMonth: string = 'all';
  selectedYear: string = 'all';

  months = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  years: number[] = [];
  currentYear = new Date().getFullYear();

  reportFields = [
    { key: 'year', label: 'Year', type: 'number' },
    { key: 'month', label: 'Month', type: 'number' },
    { key: 'emp_id', label: 'Employee ID', type: 'text' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'no_pay_count', label: 'No Pay Count', type: 'number' },
    { key: 'leave_days', label: 'Leave Days', type: 'number' },
    { key: 'holidays', label: 'Holidays', type: 'number' },
    { key: 'late_hours', label: 'Late Hours', type: 'number' },
    { key: 'days_worked', label: 'Days Worked', type: 'number' },
    { key: 'post_approve_leave', label: 'Post Approve Leave', type: 'number' },
    { key: 'pre_approve_leave', label: 'Pre Approve Leave', type: 'number' },
    { key: 'basic_salary', label: 'Basic Salary', type: 'number' },
    { key: 'bra1', label: 'BRA 1', type: 'number' },
    { key: 'bra2', label: 'BRA 2', type: 'number' },
    { key: 'attendance_incentive', label: 'Attendance Incentive', type: 'number' },
    { key: 'super_attendance', label: 'Super Attendance', type: 'number' },
    { key: 'performance_incentive', label: 'Performance Incentive', type: 'number' },
    { key: 'additional', label: 'Additional', type: 'number' },
    { key: 'advance', label: 'Advance', type: 'number' },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'total_allowances', label: 'Total Allowances', type: 'number' },
    { key: 'total_deductions', label: 'Total Deductions', type: 'number' },
    { key: 'gross_salary', label: 'Gross Salary', type: 'number' },
    { key: 'net_salary', label: 'Net Salary', type: 'number' }
  ];

  constructor(private http: HttpClient) {
    // Generate years from current year to 5 years back
    for (let i = this.currentYear; i >= this.currentYear - 5; i--) {
      this.years.push(i);
    }
    this.getAllReports();
  }

  getAllReports() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/yeareport`).subscribe(
      (resultData: any) => {
        this.reportArray = Array.isArray(resultData) ? resultData : [];
        this.filteredReports = [...this.reportArray];
        this.groupReportsByMonth();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading reports:', error);
        this.alertError('Failed to load reports!');
        this.isLoading = false;
      }
    );
  }

  filterByMonth() {
    if (this.selectedMonth === 'all' && this.selectedYear === 'all') {
      this.filteredReports = [...this.reportArray];
    } else {
      this.filteredReports = this.reportArray.filter(report => {
        const monthMatch = this.selectedMonth === 'all' || report.month.toString() === this.selectedMonth;
        const yearMatch = this.selectedYear === 'all' || report.year.toString() === this.selectedYear;
        return monthMatch && yearMatch;
      });
    }
    this.groupReportsByMonth();
  }

  groupReportsByMonth() {
    const groups: any = {};

    this.filteredReports.forEach(report => {
      const key = `${report.year}-${report.month}`;
      if (!groups[key]) {
        groups[key] = {
          year: report.year,
          month: report.month,
          reports: []
        };
      }
      groups[key].reports.push(report);
    });

    this.groupedByMonth = Object.values(groups).sort((a: any, b: any) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber - 1] || '';
  }

  openAddModal() {
    this.resetForm();
    this.isEdit = false;
    const modalElement = document.getElementById('addReportModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  openEditModal(reportItem: any) {
    this.currentReport = { ...reportItem };
    this.isEdit = true;
    const modalElement = document.getElementById('addReportModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  save() {
    if (!this.currentReport.year || !this.currentReport.emp_id) {
      this.showFieldError = true;
      return;
    }

    if (!this.currentReport.id) {
      this.register();
    } else {
      this.update();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/yeareport`, this.currentReport).subscribe(
      () => {
        this.alertSuccess('Report added successfully!');
        this.getAllReports();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding report:', error);
        this.alertError('Failed to add report!');
      }
    );
  }

  update() {
    this.http.put(`${apiBaseUrl}api/yeareport/${this.currentReport.id}`, this.currentReport).subscribe(
      () => {
        this.alertSuccess('Report updated successfully!');
        this.getAllReports();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating report:', error);
        this.alertError('Failed to update report!');
      }
    );
  }

  confirmDelete(report: any) {
    this.currentReport = { ...report };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteReport() {
    if (this.currentReport.id) {
      this.http.delete(`${apiBaseUrl}api/yeareport/${this.currentReport.id}`).subscribe(
        () => {
          this.alertSuccess('Report deleted successfully!');
          this.getAllReports();
          this.closeConfirmationModal();
        },
        (error) => {
          console.error('Error deleting report:', error);
          this.alertError('Failed to delete report!');
        }
      );
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addReportModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  closeConfirmationModal() {
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) modalElement.classList.remove('visible');
  }

  alertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  alertError(message: string) {
    this.showAlert(message, 'error');
  }

  showAlert(message: string, type: string) {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.innerText = message;
      alertBox.className = `alert-box visible ${type}`;
      setTimeout(() => alertBox.classList.remove('visible'), 3000);
    }
  }

  resetForm() {
    this.currentReport = {};
    this.showFieldError = false;
  }

  trackById(index: number, report: any): number {
    return report.id;
  }
}
