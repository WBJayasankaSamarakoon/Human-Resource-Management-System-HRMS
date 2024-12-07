import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-file',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss'],
})
export class ViewFileComponent implements OnInit {
  fileData: any[] = [];
  pagedData: any[] = [];
  fileName: string | null = '';

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 25;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const fileId = localStorage.getItem('fileId');

    if (fileId) {
      this.loadFileData(fileId);
    } else {
      console.error('File ID is missing.');
    }
  }

  loadFileData(fileId: string): void {
    const url = `${apiBaseUrl}api/uploaded_files/${fileId}/view`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.fileData = data;
          this.fileName = data[0]?.file_name || 'Unknown File';

          this.totalPages = Math.ceil(this.fileData.length / this.pageSize);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updatePagedData();
        } else {
          console.error('No data found for the selected file.');
        }
      },
      error: (err) => {
        console.error('Error fetching file data:', err);
      },
    });
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.fileData.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  goBack(): void {
    this.router.navigate(['/view']);
  }

  processData(): void {
    this.router.navigate(['/process']);
    console.log('Navigating to the process page...');
  }
}
