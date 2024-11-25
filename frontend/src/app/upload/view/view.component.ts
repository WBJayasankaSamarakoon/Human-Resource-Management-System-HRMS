import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface File {
  filename: string;
  year: string;
  month: string;
}

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  statusMessage: string = '';
  statusType: string = '';
  selectedYear: string = '';
  selectedMonth: string = '';
  years: string[] = [];
  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];
  files: File[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchYears();
    this.fetchFiles();
  }

  fetchYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let i = 0; i < 5; i++) {
      this.years.push((currentYear - i).toString());
    }
  }

  fetchFiles(): void {
    const params = {
      year: this.selectedYear || '',
      month: this.selectedMonth || '',
    };
    this.http.get<File[]>('/api/uploaded-files', { params }).subscribe(
      (response: File[]) => {
        this.files = response;
      },
      (error) => {
        console.error(error);
        this.statusMessage = 'Failed to load uploaded files.';
        this.statusType = 'error';
      }
    );
  }

  filterFiles(): void {
    this.fetchFiles(); // Refetch files based on selected year and month
  }

  closeAlert(): void {
    this.statusMessage = '';
  }

  deleteFile(file: File): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.http.post('/api/delete-file', file).subscribe(
        () => {
          this.statusMessage = 'File deleted successfully.';
          this.statusType = 'success';
          this.fetchFiles();
        },
        (error) => {
          console.error(error);
          this.statusMessage = 'Failed to delete file.';
          this.statusType = 'error';
        }
      );
    }
  }

  processFile(file: File): void {
    this.http.post('/api/process-file', file).subscribe(
      () => {
        this.statusMessage = 'File processed successfully.';
        this.statusType = 'success';
        this.fetchFiles(); // Refetch the file list after processing
      },
      (error) => {
        console.error(error);
        this.statusMessage = 'Failed to process file.';
        this.statusType = 'error';
      }
    );
  }
}
