import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss'],
})
export class UploadFileComponent {
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  selectedFile: File | null = null;
  parsedData: any[] = [];
  isUploading: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.readFile(this.selectedFile);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Skip the first 2 rows by specifying a range starting from the 3th row
      this.parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 2, // This skips the first 3 rows
      });
    };
    reader.readAsArrayBuffer(file);
  }

  uploadFile() {
    if (!this.selectedYear || !this.selectedMonth || !this.parsedData.length) {
      this.displayMessage(
        'Please fill in all required fields and select a valid file.',
        false
      );
      return;
    }

    const formData = new FormData();
    formData.append('file_name', this.selectedFile!.name);
    formData.append('year', this.selectedYear.toString());
    formData.append('month', this.selectedMonth.toString());
    formData.append('data', JSON.stringify(this.parsedData));

    this.isUploading = true;
    this.http.post(`${apiBaseUrl}api/uploaded_files`, formData).subscribe({
      next: (response) => {
        this.displayMessage('File uploaded successfully!', true);
        console.log(response);
        this.resetForm();
      },
      error: (error) => {
        this.displayMessage('Failed to upload file.', false);
        console.error(error);
      },
      complete: () => {
        this.isUploading = false;
      },
    });
  }

  displayMessage(message: string, isSuccess: boolean) {
    this.message = message;
    this.isSuccess = isSuccess;
  }

  resetForm() {
    this.selectedYear = null;
    this.selectedMonth = null;
    this.selectedFile = null;
    this.parsedData = [];
  }

  navigateToView() {
    // Navigate to a view component for uploaded files.
  }
}
