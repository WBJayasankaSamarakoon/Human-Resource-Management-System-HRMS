import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upexcel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upexcel.component.html',
  styleUrls: ['./upexcel.component.scss'],
})
export class UpexcelComponent implements OnInit {
  selectedFile: File | null = null;
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  availableFiles: any[] = [];
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
    this.availableFiles = [];
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

    this.http.post('http://localhost:8000/api/upexcel', formData).subscribe({
      next: (response: any) => {
        this.message = response.message || 'File uploaded successfully!';
        this.isSuccess = true;
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

  navigateToView(): void {
    this.router.navigate(['/view']);
  }
}
