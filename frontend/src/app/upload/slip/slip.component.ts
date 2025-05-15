import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { apiBaseUrl } from '../../app.config';
import { CommonModule } from '@angular/common';
import { cilOptions, cilCircle, cilDog } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SlipComponent implements OnInit {
  employee: any;
  slipData: any = {};
  company: any = {};
  loading: boolean = false;
  currentMonth: number = 0;
  currentYear: number = 0;
  monthNames: string[] = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  allowancesArray: any[] = [];
  deductionsArray: any[] = [];
  allowancesMap: { [key: number]: number } = {};
  deductionsMap: { [key: number]: number } = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const empId = this.route.snapshot.queryParamMap.get('emp_id');
    const fileId = localStorage.getItem('fileId');
    if (empId && fileId) {
      this.loadSlipData(empId);
      this.getAllAllowances();
      this.getAllDeductions();
      this.loadAllowances(empId, fileId);
      this.loadDeductions(empId, fileId);
      this.getAllCompanies();
    } else {
      console.error('Employee ID is missing.');
    }
  }

  getAllCompanies() {
    this.http.get(`${apiBaseUrl}api/company`).subscribe(
      (resultData: any) => {
        if (Array.isArray(resultData) && resultData.length > 0) {
          this.company = resultData[0];
        }
      },
      () => {
        console.error('Error loading companies.');
      }
    );
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
          this.currentYear = response.year;
          this.currentMonth = response.month;
          const month = this.monthNames[response.month];

          const employeeData = response.data.find(
            (item: any) => item.emp_id === parseInt(empId)
          );

          if (employeeData) {
            const grossSalary = employeeData.gross_salary || 0;
            const noPayDays = employeeData.no_pay_count || 0;
            const lateHours = employeeData.late_hours || 0;
            const dynamicAllowances: { [key: number]: number } = {};
            const dynamicDeductions: { [key: number]: number } = {};

            if (employeeData.allowances) {
              employeeData.allowances.forEach((allowance: any) => {
                dynamicAllowances[allowance.type] = allowance.amount;
              });
            }

            if (employeeData.deductions) {
              employeeData.deductions.forEach((deduction: any) => {
                dynamicDeductions[deduction.type] = deduction.amount;
              });
            }

            const noPayAmount = (grossSalary / 26) * noPayDays;
            const lateDeduction = (grossSalary / 240) * lateHours;
            const salaryForEPF = grossSalary - (noPayAmount + lateDeduction);

            const attendanceIncentive = parseFloat(employeeData.AttendanceIncentive || '0');
            const performanceIncentive = parseFloat(employeeData.PerformanceIncentive || '0');

            const dynamicAllowancesTotal = Object.values(employeeData.dynamicAllowances || {})
              .reduce((sum: number, value: any) => sum + parseFloat(value || 0), 0);

            const total_allowances = attendanceIncentive + performanceIncentive + dynamicAllowancesTotal;
            const isEpfEligible = employeeData.EpfEligible === 1;

            const format = (val: number) => val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            const epfEmpAmount = salaryForEPF * parseFloat(employeeData.epfEmp || '0') / 100;
            let total_deductions = parseFloat(employeeData.total_deductions || '0');

            const netSalary = (salaryForEPF + total_allowances) - total_deductions;

            this.slipData = {
              empId: employeeData.emp_id,
              name: employeeData.name,
              year: this.currentYear,
              month: month,
              basicSalary: format(parseFloat(employeeData.basic_salary || '0')),
              attendanceIncentive: format(attendanceIncentive),
              superAttendance: format(parseFloat(employeeData.SuperAttendance || '0')),
              performanceIncentive: format(performanceIncentive),
              bra1: format(parseFloat(employeeData.BRA1 || '0')),
              bra2: format(parseFloat(employeeData.BRA2 || '0')),
              bra3: format(parseFloat(employeeData.BRA3 || '0')),
              tax: format(parseFloat(employeeData.tax || '0')),
              late_hours: lateHours,
              unApproveLeave: employeeData.un_approve_leave || '0',
              postApproveLeave: employeeData.post_approve_leave || '0',
              preApproveLeave: employeeData.pre_approve_leave || '0',
              total_deductions: format(total_deductions),
              grossSalary: format(parseFloat(grossSalary || 0)),
              netSalary: format(netSalary),
              leaveDays: employeeData.leave_days || '0',
              holidays: employeeData.holidays || '0',
              balanceLeaves: format(parseFloat(employeeData.balanceLeaves || '0')),
              epf: isEpfEligible ? format(parseFloat(employeeData.epf || '0')) : '0.00',
              advanced: format(parseFloat(employeeData.s_advance || '0')),
              telephoneExpenses: format(parseFloat(employeeData.t_expenses || '0')),
              apiTax: format(parseFloat(employeeData.apiTax || '0')),
              total_allowances: format(total_allowances),
              commission: format(parseFloat(employeeData.commission || '0')),
              no_pay_count: noPayDays,
              noPayAmount: format(noPayAmount),
              lateDeduction: format(lateDeduction),
              salaryForEPF: format(salaryForEPF),
              dynamicAllowances,
              dynamicDeductions,
              epfEmp: format(parseFloat(employeeData.epfEmp || '0')),
              epfCom: format(parseFloat(employeeData.epfCom || '0')),
              etfCom: format(parseFloat(employeeData.etfCom || '0')),
              epfEmpAmount: format(epfEmpAmount),
              epfComAmount: format((salaryForEPF * parseFloat(employeeData.epfCom || '0') / 100)),
              etfComAmount: format((salaryForEPF * parseFloat(employeeData.etfCom || '0') / 100)),
            };

            console.log('Slip Data:', this.slipData);
          }
        }
        this.loading = false;
      },
      error: () => {
        console.error('Error loading slip data.');
        this.loading = false;
      },
    });
  }

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

  loadAllowances(empId: string, fileId: string) {
    this.http.get(`${apiBaseUrl}api/allowances?emp_id=${empId}&file_id=${fileId}`).subscribe(
      (resultData: any) => {
        if (Array.isArray(resultData)) {
          const filteredAllowances = resultData.filter((allowance: any) => {
            if (!allowance.payment_date) return false;
            const paymentDate = new Date(allowance.payment_date);
            return paymentDate.getMonth() + 1 === this.currentMonth &&
                   paymentDate.getFullYear() === this.currentYear;
          });

          filteredAllowances.forEach((allowance: any) => {
            if (!this.allowancesMap[allowance.type]) {
              this.allowancesMap[allowance.type] = 0;
            }
            this.allowancesMap[allowance.type] += parseFloat(allowance.amount || 0);
          });

          this.slipData.dynamicAllowances = { ...this.allowancesMap };
          this.recalculateTotalAllowances();
        }
      },
      () => {
        console.error('Error loading allowances amounts.');
      }
    );
  }

  recalculateTotalAllowances() {
    const parseNumber = (val: string | number): number => {
      if (typeof val === 'number') return val;
      return parseFloat((val || '0').toString().replace(/,/g, ''));
    };

    const attendanceIncentive = parseNumber(this.slipData.attendanceIncentive);
    const performanceIncentive = parseNumber(this.slipData.performanceIncentive);
    const dynamicAllowancesTotal = Object.values(this.slipData.dynamicAllowances || {})
      .reduce((sum: number, value: any) => sum + parseNumber(value), 0);

    const total = attendanceIncentive + performanceIncentive + dynamicAllowancesTotal;
    this.slipData.total_allowances = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.recalculateNetSalary();
  }

  loadDeductions(empId: string, fileId: string) {
    this.http.get(`${apiBaseUrl}api/deductions?emp_id=${empId}&file_id=${fileId}`).subscribe(
      (resultData: any) => {
        if (Array.isArray(resultData)) {
          const filteredDeductions = resultData.filter((deduction: any) => {
            if (!deduction.payment_date) return false;
            const paymentDate = new Date(deduction.payment_date);
            return paymentDate.getMonth() + 1 === this.currentMonth &&
                   paymentDate.getFullYear() === this.currentYear;
          });

          filteredDeductions.forEach((deduction: any) => {
            if (!this.deductionsMap[deduction.type]) {
              this.deductionsMap[deduction.type] = 0;
            }
            this.deductionsMap[deduction.type] += parseFloat(deduction.amount || 0);
          });

          this.slipData.dynamicDeductions = { ...this.deductionsMap };

          const parseNumber = (val: string): number =>
            parseFloat((val || '0').toString().replace(/,/g, ''));

          const dynamicDeductionsTotal = Object.values(this.slipData.dynamicDeductions || {})
            .reduce((sum: number, value: any) => sum + parseFloat(value || 0), 0);

          const epfAmount = parseNumber(this.slipData.epfEmpAmount);
          const tax = parseNumber(this.slipData.tax);
          const total = dynamicDeductionsTotal + epfAmount + tax;

          this.slipData.total_deductions = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.recalculateNetSalary();
        }
      },
      () => {
        console.error('Error loading deductions amounts.');
      }
    );
  }

  recalculateNetSalary() {
    const parseNumber = (val: string | number): number => {
      if (typeof val === 'number') return val;
      return parseFloat((val || '0').toString().replace(/,/g, ''));
    };

    const grossSalary = parseNumber(this.slipData.grossSalary);
    const totalAllowances = parseNumber(this.slipData.total_allowances);
    const totalDeductions = parseNumber(this.slipData.total_deductions);

    const netSalary = (grossSalary + totalAllowances) - (totalDeductions);
    this.slipData.netSalary = netSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  goBack(): void {
    this.router.navigate(['/process']);
  }

  sendSlipByEmail(): void {
    const url = `${apiBaseUrl}api/send-payslip`;
    const email = this.slipData.personalEmail || 'defaultEmail@example.com';

    const payload = {
      email: email,
      name: this.slipData.name,
      payslipData: this.slipData,
    };

    this.http.post(url, payload).subscribe({
      next: (response) => {
        console.log('Payslip sent successfully:', response);
        alert('Payslip sent successfully!');
      },
      error: (err) => {
        console.error('Error sending payslip:', err);
        alert('Failed to send payslip. Please try again.');
      },
    });
  }

  generatePdf(): void {
    const element = document.querySelector('.payslip-container') as HTMLElement | null;

    if (element) {
      html2canvas(element, { scale: 3, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF('p', 'mm', 'a5');
        const imgWidth = 120;
        const pageWidth = 148;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const xOffset = (pageWidth - imgWidth) / 2;

        if (imgHeight > pageHeight) {
          const scaleFactor = pageHeight / imgHeight;
          const scaledImgHeight = imgHeight * scaleFactor;
          const yOffset = (pageHeight - scaledImgHeight) / 2;
          pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, scaledImgHeight);
        } else {
          const yOffset = (pageHeight - imgHeight) / 2;
          pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
        }

        pdf.save(`Payslip_${this.slipData.empId}.pdf`);
      }).catch((error) => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Payslip container not found.');
    }
  }
}
