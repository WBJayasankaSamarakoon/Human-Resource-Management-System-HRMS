import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from 'src/app/app.config'; // Import apiBaseUrl from app.config

@Component({
  selector: 'app-upexcel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upexcel.component.html',
  styleUrls: ['./upexcel.component.scss'],
})
export class UpexcelComponent implements OnInit {
  [x: string]: any;
  selectedFile: File | null = null;
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  availableFiles: any[] = [];
  selectedFileId: number | null = null; // Added to store file_id
  message: string | null = null;
  isSuccess: boolean = false;
  isUploading: boolean = false;

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
    this.fetchAvailableFiles(); // Fetch existing files on init
  }

  fetchAvailableFiles(): void {
    this.http.get(`${apiBaseUrl}api/uploaded_files`).subscribe({
      next: (response: any) => {
        this.availableFiles = response;
      },
      error: (error) => {
        console.error('Error fetching files:', error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.message = null;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.selectedYear || !this.selectedMonth) {
      this.message = 'Please select a file, year, and month!';
      this.isSuccess = false;
      return;
    }

    this.isUploading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('year', this.selectedYear.toString());
    formData.append('month', this.selectedMonth.toString());

    this.http.post(`${apiBaseUrl}api/upexcel`, formData).subscribe({
      next: (response: any) => {
        this.message = response.message || 'File uploaded successfully!';
        this.isSuccess = true;
        this.fetchAvailableFiles(); // Refresh file list after upload
      },
      error: (error) => {
        console.error(error);
        this.message = 'Upload failed. Please try again.';
        this.isSuccess = false;
      },
      complete: () => {
        this.isUploading = false;
        this.selectedFile = null;
      },
    });
  }

  deleteFile(fileId: number): void {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    this.http
      .delete(`${apiBaseUrl}api/uploaded_files/${fileId}/delete`)
      .subscribe({
        next: (response: any) => {
          this.message = response.message || 'File deleted successfully!';
          this.isSuccess = true;
          this.fetchAvailableFiles(); // Refresh file list after deletion
        },
        error: (error) => {
          console.error(error);
          this.message = 'Deletion failed. Please try again.';
          this.isSuccess = false;
        },
      });
  }

  navigateToUploadedFiles(): void {
    this.router.navigate(['/view']);
  }
}
