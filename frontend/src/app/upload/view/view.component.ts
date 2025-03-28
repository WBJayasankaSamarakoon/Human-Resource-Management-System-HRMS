import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { apiBaseUrl } from '../../app.config';

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
  isLoading: boolean = false; // Add a loading flag

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
    this.isLoading = true; // Set loading to true
    this.http.get<any[]>(`${apiBaseUrl}api/uploaded_files`).subscribe({
      next: (data) => {
        this.uploadedFiles = data;
        this.message = data.length ? null : 'No files found.';
        this.isLoading = false; // Set loading to false once data is loaded
      },
      error: () => {
        this.message = 'Failed to load files.';
        this.isLoading = false; // Set loading to false if there's an error
      },
    });
  }

  filterFiles(): void {
    if (!this.selectedYear || !this.selectedMonth) {
      this.message = 'Please select both year and month.';
      this.loadAllFiles();
      return;
    }

    this.isLoading = true; // Set loading to true while filtering
    this.http
      .get<any[]>(
        `${apiBaseUrl}api/uploaded_files?year=${this.selectedYear}&month=${this.selectedMonth}`
      )
      .subscribe({
        next: (data) => {
          this.uploadedFiles = data;
          this.message = data.length
            ? null
            : 'No files found for the selected year and month.';
          this.isLoading = false; // Set loading to false after filtering
        },
        error: () => {
          this.message = 'Failed to filter files.';
          this.isLoading = false; // Set loading to false if there's an error
        },
      });
  }

  viewFile(file: any): void {
    localStorage.setItem('fileId', file.id.toString());
    this.router.navigate(['/view-file']);
  }

  goBack(): void {
    this.router.navigate(['/upexcel']);
  }

  deleteFile(file: any): void {
    if (confirm(`Are you sure you want to delete ${file.file_name}?`)) {
      this.isLoading = true; // Set loading to true while deleting
      this.http
        .delete(`${apiBaseUrl}api/uploaded_files/${file.id}/delete`)
        .subscribe({
          next: () => {
            this.message = 'File and related data deleted successfully!';
            this.loadAllFiles();
          },
          error: () => {
            this.message = 'Failed to delete file.';
            this.isLoading = false; // Set loading to false if there's an error
          },
        });
    }
  }
}
