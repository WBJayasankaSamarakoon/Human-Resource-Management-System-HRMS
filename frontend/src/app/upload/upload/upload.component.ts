import * as XLSX from 'xlsx';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  onFileSelect($event: Event) {
    throw new Error('Method not implemented.');
  }
  onSubmit($event: SubmitEvent) {
    throw new Error('Method not implemented.');
  }
  ExcelData: any[] = [];
  filteredData: any[] = [];
  paginatedData: any[] = [];
  selectedFile: File | null = null;
  latestYears: number[] = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentPage: number = 1;
  itemsPerPage: number = 25;
  totalPages: number = 1;
  pagesArray: number[] = [];
  tableHeaders: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.latestYears.push(currentYear - i);
    }
  }

  ReadExcel(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      // Map data with correct keys
      this.ExcelData = jsonData.map((row: any) => ({
        Index: row.__EMPTY,
        PersonID: row.__EMPTY_1,
        Name: row.__EMPTY_2,
        Department: row.__EMPTY_3,
        Position: row.__EMPTY_4,
        Gender: row.__EMPTY_5,
        Date: row.__EMPTY_6,
        Week: row.__EMPTY_7,
        Timetable: row.__EMPTY_8,
        CheckIn: row.__EMPTY_9,
        CheckOut: row.__EMPTY_10,
        Work: row.__EMPTY_11,
        OT: row.__EMPTY_12,
        Attended: row.__EMPTY_13,
        Late: row.__EMPTY_14,
        Early: row.__EMPTY_15,
        Absent: row.__EMPTY_16,
        Leave: row.__EMPTY_17,
        Status: row.__EMPTY_18,
        Records: row.__EMPTY_19,
      }));

      this.ExcelData = this.ExcelData.slice(1);
      this.filteredData = [...this.ExcelData];
      this.tableHeaders = Object.keys(this.ExcelData[0] || {}); // Set headers dynamically
      this.updatePagination();
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

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('data', JSON.stringify(this.ExcelData));

    this.http.post('http://localhost:8000/api/attendance', formData).subscribe(
      (response) => alert('Attendance records uploaded successfully'),
      (error) => {
        console.error('Error uploading data:', error);
        alert(`Error uploading data: ${error.message}`);
      }
    );
  }

  // Pagination methods
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
  }
}
// work
