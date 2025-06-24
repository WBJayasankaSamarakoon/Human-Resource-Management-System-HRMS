import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { apiBaseUrl } from '../../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cilOptions, cilCircle, cilDog } from '@coreui/icons';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { forkJoin } from 'rxjs';
import { ViewChild } from '@angular/core';
import { SlipmailComponent } from '../slipmail/slipmail.component';

@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss'],
  imports: [CommonModule, FormsModule, IconModule, IconSetModule, SlipmailComponent],
  standalone: true,
})
export class SlipComponent implements OnInit {
  editOtMode = false;
  hovering = false;
  slipData: any = {};
  company: any = {};
  loading = false;
  currentMonth = 0;
  currentYear = 0;
  errorMessage: string | null = null;
  allowancesArray: any[] = [];
  deductionsArray: any[] = [];
  @ViewChild('slipMailComponent') slipMailComponent!: SlipmailComponent;

  private readonly monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  private allowancesMap: { [key: number]: number } = {};
  private deductionsMap: { [key: number]: number } = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private iconSetService: IconSetService
  ) {
    iconSetService.icons = { cilOptions, cilCircle, cilDog };
  }

  ngOnInit(): void {
    const empId = this.route.snapshot.queryParamMap.get('emp_id') || '';
    const fileId = this.getFileId();

    if (!empId || !fileId) {
      this.errorMessage = !empId ? 'Employee ID is missing.' : 'File ID is missing.';
      return;
    }

    this.loadAllData(empId, fileId);
  }

  private loadAllData(empId: string, fileId: string): void {
    this.loading = true;

    forkJoin({
      slipData: this.http.get<any>(`${apiBaseUrl}api/uploaded_files/${fileId}/view/combined-data`),
      allowances: this.http.get(`${apiBaseUrl}api/addallowance`),
      deductions: this.http.get(`${apiBaseUrl}api/adddeduction`),
      empAllowances: this.http.get(`${apiBaseUrl}api/allowances?emp_id=${empId}&file_id=${fileId}`),
      empDeductions: this.http.get(`${apiBaseUrl}api/deductions?emp_id=${empId}&file_id=${fileId}`),
      company: this.http.get(`${apiBaseUrl}api/company`)
    }).subscribe({
      next: ({ slipData, allowances, deductions, empAllowances, empDeductions, company }) => {
        this.processSlipData(slipData, empId);
        this.processStaticData(allowances, deductions, company);
        this.processEmployeeItems(empAllowances, empDeductions);
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err, 'Loading data');
        this.loading = false;
      }
    });
  }

  private processSlipData(response: any, empId: string): void {
    if (!response?.data) {
      this.errorMessage = 'Invalid response format from server.';
      return;
    }

    this.currentYear = parseInt(response.year);
    this.currentMonth = parseInt(response.month);
    const month = this.monthNames[this.currentMonth];
    const numericEmpId = parseInt(empId);

    const employeeData = response.data.find((item: any) =>
      item.emp_id === numericEmpId || item.emp_id.toString() === empId
    );

    if (!employeeData) {
      this.errorMessage = `Employee data not found for ID: ${empId}`;
      return;
    }

    this.slipData = this.calculateEmployeeData(employeeData, month);
  }

  private calculateEmployeeData(employeeData: any, month: string): any {
    const grossSalary = employeeData.gross_salary || 0;
    const noPayDays = employeeData.no_pay_count || 0;
    const lateHours = employeeData.late_hours || 0;
    const otAmount = employeeData.ot_amount || 0;

    const noPayAmount = (grossSalary / 26) * noPayDays;
    const lateDeduction = (grossSalary / 240) * lateHours;
    const salaryForEPF = grossSalary - (noPayAmount + lateDeduction);

    const attendanceIncentive = parseFloat(employeeData.AttendanceIncentive || '0');
    const performanceIncentive = parseFloat(employeeData.PerformanceIncentive || '0');
    const dynamicAllowancesTotal = Object.values(employeeData.dynamicAllowances || {})
      .reduce((sum: number, value: any) => sum + parseFloat(value || 0), 0);

    const totalAllowances = attendanceIncentive + performanceIncentive + dynamicAllowancesTotal + otAmount;
    const isEpfEligible = employeeData.EpfEligible === 1;
    const epfEmpAmount = salaryForEPF * parseFloat(employeeData.epfEmp || '0') / 100;
    const totalDeductions = parseFloat(employeeData.total_deductions || '0');
    const netSalary = (salaryForEPF + totalAllowances) - totalDeductions;

    return {
      empId: employeeData.emp_id,
      name: employeeData.name,
      year: this.currentYear,
      month: month,
      basicSalary: this.formatCurrency(employeeData.basic_salary),
      attendanceIncentive: this.formatCurrency(attendanceIncentive),
      superAttendance: this.formatCurrency(employeeData.SuperAttendance),
      performanceIncentive: this.formatCurrency(performanceIncentive),
      bra1: this.formatCurrency(employeeData.BRA1),
      bra2: this.formatCurrency(employeeData.BRA2),
      bra3: this.formatCurrency(employeeData.BRA3),
      tax: this.formatCurrency(employeeData.tax),
      late_hours: lateHours,
      unApproveLeave: employeeData.un_approve_leave || '0',
      postApproveLeave: employeeData.post_approve_leave || '0',
      preApproveLeave: employeeData.pre_approve_leave || '0',
      total_deductions: this.formatCurrency(totalDeductions),
      grossSalary: this.formatCurrency(grossSalary),
      netSalary: this.formatCurrency(netSalary),
      leaveDays: employeeData.leave_days || '0',
      holidays: employeeData.holidays || '0',
      balanceLeaves: this.formatCurrency(employeeData.balanceLeaves),
      epf: isEpfEligible ? this.formatCurrency(employeeData.epf) : '0.00',
      advanced: this.formatCurrency(employeeData.s_advance),
      telephoneExpenses: this.formatCurrency(employeeData.t_expenses),
      apiTax: this.formatCurrency(employeeData.apiTax),
      total_allowances: this.formatCurrency(totalAllowances),
      commission: this.formatCurrency(employeeData.commission),
      no_pay_count: noPayDays,
      noPayAmount: this.formatCurrency(noPayAmount),
      lateDeduction: this.formatCurrency(lateDeduction),
      salaryForEPF: this.formatCurrency(salaryForEPF),
      otAmount: this.formatCurrency(otAmount),
      otHours: employeeData.ot_hours || 0,
      dynamicAllowances: this.processDynamicItems(employeeData.allowances),
      dynamicDeductions: this.processDynamicItems(employeeData.deductions),
      epfEmp: this.formatCurrency(employeeData.epfEmp),
      epfCom: this.formatCurrency(employeeData.epfCom),
      etfCom: this.formatCurrency(employeeData.etfCom),
      epfEmpAmount: this.formatCurrency(epfEmpAmount),
      epfComAmount: this.formatCurrency((salaryForEPF * parseFloat(employeeData.epfCom || '0') / 100)),
      etfComAmount: this.formatCurrency((salaryForEPF * parseFloat(employeeData.etfCom || '0') / 100)),
      personalEmail: employeeData.personal_email || 'buddhika756jayasanka@gmail.com'
    };
  }

  private processStaticData(allowances: any, deductions: any, company: any): void {
    if (Array.isArray(company) && company.length > 0) {
      this.company = company[0];
    }

    // Convert allowances and deductions to arrays for the template
    if (Array.isArray(allowances)) {
      this.allowancesArray = allowances;
    }
    if (Array.isArray(deductions)) {
      this.deductionsArray = deductions;
    }
  }

  private processEmployeeItems(empAllowances: any, empDeductions: any): void {
    this.processItems(empAllowances, this.allowancesMap, 'allowances');
    this.processItems(empDeductions, this.deductionsMap, 'deductions');
  }

  private processItems(items: any[], targetMap: any, type: string): void {
    if (!Array.isArray(items)) return;

    const filteredItems = items.filter(item => {
      if (!item.payment_date) return false;
      try {
        const paymentDate = new Date(item.payment_date);
        return paymentDate.getMonth() + 1 === this.currentMonth &&
               paymentDate.getFullYear() === this.currentYear;
      } catch {
        return false;
      }
    });

    filteredItems.forEach(item => {
      const amount = parseFloat(item.amount || 0);
      targetMap[item.type] = (targetMap[item.type] || 0) + amount;
    });

    this.slipData[`dynamic${type.charAt(0).toUpperCase() + type.slice(1)}`] = { ...targetMap };
    type === 'allowances' ? this.recalculateTotalAllowances() : this.recalculateTotalDeductions();
  }

  private processDynamicItems(items: any[] | undefined): { [key: number]: number } {
    const result: { [key: number]: number } = {};
    items?.forEach(item => result[item.type] = item.amount);
    return result;
  }

  private formatCurrency(value: string | number | undefined): string {
    const num = typeof value === 'number' ? value : parseFloat(value || '0');
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  private getFileId(): string | null {
    try {
      return localStorage.getItem('fileId');
    } catch {
      this.errorMessage = 'Failed to access browser storage.';
      return null;
    }
  }

  private handleError(error: HttpErrorResponse, context: string): void {
    if (error.status === 0) {
      this.errorMessage = 'Network error - could not connect to server.';
    } else if (error.status === 404) {
      this.errorMessage = 'Requested resource not found.';
    } else if (error.status === 401 || error.status === 403) {
      this.errorMessage = 'Authentication failed. Please login again.';
    } else {
      this.errorMessage = `An error occurred: ${error.message}`;
    }
  }

  recalculateTotalAllowances(): void {
    const total = this.calculateTotal(
      this.slipData.attendanceIncentive,
      this.slipData.performanceIncentive,
      this.slipData.otAmount,
      this.slipData.dynamicAllowances
    );
    this.slipData.total_allowances = this.formatCurrency(total);
    this.recalculateNetSalary();
  }

  recalculateTotalDeductions(): void {
    const total = this.calculateTotal(
      this.slipData.dynamicDeductions,
      this.slipData.epfEmpAmount,
      this.slipData.tax
    );
    this.slipData.total_deductions = this.formatCurrency(total);
    this.recalculateNetSalary();
  }

  private calculateTotal(...values: any[]): number {
    return values.reduce((sum, value) => {
      if (typeof value === 'object') {
        return sum + Object.values(value).reduce((subSum: number, val: any) =>
          subSum + this.parseCurrency(val), 0);
      }
      return sum + this.parseCurrency(value);
    }, 0);
  }

  private parseCurrency(value: string | number): number {
    return typeof value === 'number' ? value :
      parseFloat((value || '0').toString().replace(/,/g, ''));
  }

  recalculateNetSalary(): void {
    const netSalary = (this.parseCurrency(this.slipData.salaryForEPF) +
                      this.parseCurrency(this.slipData.total_allowances)) -
                     this.parseCurrency(this.slipData.total_deductions);
    this.slipData.netSalary = this.formatCurrency(netSalary);
  }

  toggleEditOt(): void {
    if (this.editOtMode) {
      this.recalculateTotalAllowances();
    }
    this.editOtMode = !this.editOtMode;
  }


openEmailModal() {
    if (this.slipMailComponent) {
      this.slipMailComponent.openModal();
    } else {
      console.error('SlipMailComponent not found');
    }
  }

  onEmailSent(success: boolean) {
    if (success) {
      // You can show a toast or alert here
      console.log('Email sent successfully');
    }
  }

  generatePdf(): void {
    const element = document.querySelector('.payslip-container');
    if (!element) {
      this.errorMessage = 'Could not find payslip content to generate PDF.';
      return;
    }

    this.loading = true;
    html2canvas(element as HTMLElement, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a5');
      const imgWidth = 120;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = (148 - imgWidth) / 2;

      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.9),
        'JPEG',
        xOffset,
        imgHeight > 210 ? 0 : (210 - imgHeight) / 2,
        imgWidth,
        imgHeight > 210 ? imgHeight * (210 / imgHeight) : imgHeight
      );

      pdf.save(`Payslip_${this.slipData.empId}.pdf`);
      this.loading = false;
    }).catch(() => {
      this.errorMessage = 'Failed to generate PDF. Please try again.';
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/process']);
  }
}
