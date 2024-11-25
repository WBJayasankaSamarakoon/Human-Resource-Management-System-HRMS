import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  uploadedFiles: any[] = [];
  message: string | null = null;

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadAllFiles();
  }

  loadAllFiles(): void {
    this.http.get<any[]>('http://localhost:8000/api/uploaded_files').subscribe({
      next: (data) => {
        this.uploadedFiles = data;
        this.message = data.length ? null : 'No files found.';
      },
      error: () => {
        this.message = 'Failed to load files.';
      },
    });
  }

  filterFiles(): void {
    if (!this.selectedYear || !this.selectedMonth) {
      this.message = 'Please select both year and month.';
      this.loadAllFiles();
      return;
    }

    this.http
      .get<any[]>(
        `http://localhost:8000/api/uploaded_files?year=${this.selectedYear}&month=${this.selectedMonth}`
      )
      .subscribe({
        next: (data) => {
          this.uploadedFiles = data;
          this.message = data.length
            ? null
            : 'No files found for the selected year and month.';
        },
        error: () => {
          this.message = 'Failed to filter files.';
        },
      });
  }

  viewFile(file: any): void {
    const url = `http://localhost:8000/api/uploaded_files/${file.id}/view`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log('File Data:', data);
        if (data && data.length > 0) {
          localStorage.setItem('fileData', JSON.stringify(data));
          localStorage.setItem('fileName', file.file_name);
          this.router.navigate(['/view-file']);
        } else {
          this.message = 'No data found for the selected file.';
        }
      },
      error: (err) => {
        console.error('Error fetching file data:', err);
        this.message = 'Failed to view file data.';
      },
    });
  }

  deleteFile(file: any): void {
    if (confirm(`Are you sure you want to delete ${file.file_name}?`)) {
      this.http
        .delete(`http://localhost:8000/api/uploaded_files/${file.id}/delete`)
        .subscribe({
          next: () => {
            this.message = 'File and related data deleted successfully!';
            this.loadAllFiles();
          },
          error: () => {
            this.message = 'Failed to delete file.';
          },
        });
    }
  }
}
