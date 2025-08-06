import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-slipmail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slipmail.component.html',
  styleUrls: ['./slipmail.component.scss']
})
export class SlipmailComponent {
  @Input() slipData: any;
  @Input() company: any;
  @Output() emailSent = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  showModal = false;
  emailForm = {
    recipient: '',
    subject: 'Your Payslip',
    message: 'Dear Employee,\n\nPlease find attached your payslip for this month.\n\nIf you have any questions, please contact the HR department.\n\nThank you.',
    attachPdf: true
  };
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedFile: File | null = null;
  isDragOver = false;

  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024;

  constructor(private http: HttpClient) {}

  openModal() {
    this.resetForm();

    if (this.slipData?.personalEmail) {
      this.emailForm.recipient = this.slipData.personalEmail;
    } else if (this.slipData?.email) {
      this.emailForm.recipient = this.slipData.email;
    }

    if (this.slipData?.name) {
      const currentDate = new Date();
      const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      this.emailForm.subject = `Payslip for ${this.slipData.name} - ${monthYear}`;

      // Set the dynamic message template
      this.emailForm.message = this.generateDynamicMessage();
    }

    this.showModal = true;
  }

  private generateDynamicMessage(): string {
    return `Dear ${this.slipData.name || 'Employee'},

I hope this message finds you well.

Please find attached your payslip for the month of ${this.slipData.month || 'this month'} ${this.slipData.year || ''}. The document contains a detailed breakdown of your salary, including basic pay, allowances, deductions, and the net salary credited to your account.

Kindly review the attached file. If you have any questions or require further clarification, feel free to contact the HR department.

This email is confidential and intended solely for you. Please do not share this document with others.

Thank you for your continued contributions to ${this.company?.name || 'our company'}.

Best regards,
${this.company?.hr_name || 'HR Department'}
${this.company?.name || ''}
${this.company?.hr_email || ''} | ${this.company?.phone || ''}`;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  private resetForm() {
    this.selectedFile = null;
    this.errorMessage = null;
    this.successMessage = null;
    this.loading = false;
    this.isDragOver = false;

    this.emailForm = {
      recipient: '',
      subject: 'Your Payslip',
      message: 'Dear Employee,\n\nPlease find attached your payslip for this month.\n\nIf you have any questions, please contact the HR department.\n\nThank you.',
      attachPdf: true
    };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  private handleFileSelection(file: File) {
    this.errorMessage = null;

    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Only PDF files are allowed';
      return;
    }

    if (file.size > this.MAX_FILE_SIZE) {
      this.errorMessage = `File size must be less than ${this.formatFileSize(this.MAX_FILE_SIZE)}`;
      return;
    }

    this.selectedFile = file;
    this.emailForm.attachPdf = false;
  }

  removeSelectedFile() {
    this.selectedFile = null;
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
    this.emailForm.attachPdf = true;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isFormValid(): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailForm.recipient);
    const subjectValid = this.emailForm.subject.trim().length > 0;
    const attachmentValid = this.emailForm.attachPdf || this.selectedFile !== null;

    return emailValid && subjectValid && attachmentValid;
  }

  sendEmail() {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.isFormValid()) {
      if (!this.emailForm.attachPdf && !this.selectedFile) {
        this.errorMessage = 'Please either enable PDF generation or select a custom PDF file';
      } else {
        this.errorMessage = 'Please fill all required fields correctly';
      }
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('email', this.emailForm.recipient.trim());
    formData.append('name', this.slipData?.name || 'Employee');
    formData.append('subject', this.emailForm.subject.trim());
    formData.append('message', this.emailForm.message || '');
    formData.append('attachPdf', this.emailForm.attachPdf ? '1' : '0');

    const formattedPayslip = {
      ...this.slipData,
      basicSalary: parseFloat(this.slipData.basicSalary?.replace(/,/g, '') || 0),
      allowances: parseFloat(this.slipData.allowances?.replace(/,/g, '') || 0),
      deductions: parseFloat(this.slipData.deductions?.replace(/,/g, '') || 0),
      netSalary: parseFloat(this.slipData.netSalary?.replace(/,/g, '') || 0)
    };

    formData.append('payslipData', JSON.stringify(formattedPayslip));
    formData.append('companyData', JSON.stringify(this.company || {}));

    if (this.selectedFile) {
      formData.append('customPdf', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(`${apiBaseUrl}api/send-payslip`, formData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.successMessage = 'Payslip sent successfully!';
        setTimeout(() => {
          this.closeModal();
          this.emailSent.emit(true);
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.error('Error sending email:', error);

        if (error.status === 422) {
          if (error.error?.errors) {
            this.errorMessage = Object.values(error.error.errors).flat().join(', ');
          } else {
            this.errorMessage = error.error?.message || 'Validation failed';
          }
        } else {
          this.errorMessage = error.error?.message ||
            'Failed to send email. Please try again.';
        }
      }
    });
  }
}
