import * as XLSX from 'xlsx';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  ExcelData: any[] = [];
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ReadExcel(event: any) {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select an Excel file.');
      return;
    }

    this.selectedFile = file;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = () => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const firstSheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[firstSheetName];

      // Convert the sheet to JSON format
      this.ExcelData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      console.log('Parsed Excel Data:', this.ExcelData);
    };

    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('There was an error reading the file. Please try again.');
    };
  }

  uploadDataToBackend() {
    if (!this.ExcelData || this.ExcelData.length === 0 || !this.selectedFile) {
      alert('Please upload a valid Excel file before submitting.');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('data', JSON.stringify(this.filteredExcelData()));

    this.http.post('http://localhost:8000/api/attendance', formData).subscribe(
      (response) => alert('Attendance records uploaded successfully'),
      (error) => {
        console.error('Error uploading data:', error);
        if (error.error instanceof ErrorEvent) {
          alert(`Client-side error: ${error.error.message}`);
        } else {
          alert(`Server-side error: ${error.status} - ${error.message}`);
        }
      }
    );
  }

  // Filtered data to ensure only required columns are included
  filteredExcelData() {
    const requiredKeys = [
      'Index',
      'PersonID',
      'Name',
      'Department',
      'Position',
      'Gender',
      'Date',
      'Week',
      'Timetable',
      'CheckIn',
      'CheckOut',
      'Work',
      'OT',
      'Attended',
      'Late',
      'Early',
      'Absent',
      'Leave',
      'Status',
      'Records',
    ];
    return this.ExcelData.map((row) => {
      const filteredRow: any = {};
      requiredKeys.forEach((key) => {
        filteredRow[key] = row[key] || '';
      });
      return filteredRow;
    });
  }
}
