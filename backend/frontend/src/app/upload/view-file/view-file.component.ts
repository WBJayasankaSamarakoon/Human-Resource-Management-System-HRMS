import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-file',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve data from localStorage
    const fileDataString = localStorage.getItem('fileData');
    const fileNameString = localStorage.getItem('fileName');

    console.log('File data from localStorage:', fileDataString);
    console.log('File name from localStorage:', fileNameString);

    // Parse and initialize file data
    this.fileData = fileDataString ? JSON.parse(fileDataString) : [];
    this.fileName = fileNameString || '';

    // Initialize pagination
    this.totalPages = Math.ceil(this.fileData.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePagedData();
  }

  /**
   * Updates the paged data based on the current page
   */
  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.fileData.slice(startIndex, endIndex);
  }

  /**
   * Changes the current page and updates the paged data
   * @param page
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  /**
   * Navigates back to the file list view
   */
  goBack(): void {
    this.router.navigate(['/view']);
  }

  /**
   * Processes the file data (placeholder logic)
   */
  processData(): void {
    // Navigate to the /process route (the button will now navigate to this route)
    this.router.navigate(['/process']);
    console.log('Navigating to the process page...');
  }
}
