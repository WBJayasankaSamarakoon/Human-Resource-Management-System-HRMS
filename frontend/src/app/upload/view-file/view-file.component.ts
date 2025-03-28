import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiBaseUrl } from '../../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-view-file',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss'],
})
export class ViewFileComponent implements OnInit {
  fileData: any[] = [];
  pagedData: any[] = [];
  employees: any[] = [];
  fileName: string | null = '';
  isLoading: boolean = false;
  newRecord: any = {
    emp_id: '',
    date: '',
    check_in: '',
    check_out: '',
    saturday_check_out: '',
    startDate: '',
    endDate: '',
  };
  isMonthModalOpen: boolean = false;
  isSingleModalOpen: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 25;
  totalPages: number = 1;
  pages: number[] = [];

  // Selection properties
  selectedRecords: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const fileId = localStorage.getItem('fileId');

    if (fileId) {
      this.loadFileData(fileId);
      this.getAllEmployees();
    } else {
      console.error('File ID is missing.');
    }
  }

  loadFileData(fileId: string): void {
    this.isLoading = true;
    const url = `${apiBaseUrl}api/uploaded_files/${fileId}/view`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.isLoading = false;
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
        this.isLoading = false;
        console.error('Error fetching file data:', err);
      },
    });
  }

  getAllEmployees() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe(
      (resultData: any) => {
        this.employees = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading employees.');
        this.isLoading = false;
      }
    );
  }

  onEmployeeSelect() {
    const selectedEmployee = this.employees.find(
      (employee) => employee.EmpId === this.newRecord.emp_id
    );

    if (selectedEmployee) {
      this.newRecord.department = selectedEmployee.Department;
      this.newRecord.shift = selectedEmployee.DefaultShift;
    }
  }

  isColumnDataAvailable(column: string): boolean {
    return this.pagedData.some(
      (data) => data[column] !== null && data[column] !== undefined
    );
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

  alertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  alertError(message: string) {
    this.showAlert(message, 'error');
  }

  showAlert(message: string, type: string) {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.innerText = message;
      alertBox.className = `alert-box visible ${type}`;
      setTimeout(() => {
        alertBox.classList.remove('visible', type);
      }, 3000);
    }
  }

  processData(): void {
    this.router.navigate(['/process']);
    console.log('Navigating to the process page...');
  }

  openAddMonthRecordModal(): void {
    this.isMonthModalOpen = true;
  }

  openAddSingleRecordModal(): void {
    this.isSingleModalOpen = true;
  }

  closeMonthModal(): void {
    this.isMonthModalOpen = false;
    this.newRecord = {
      emp_id: '',
      date: '',
      check_in: '',
      check_out: '',
      startDate: '',
      endDate: '',
    };
  }

  closeSingleModal(): void {
    this.isSingleModalOpen = false;
    this.newRecord = {
      emp_id: '',
      date: '',
      check_in: '',
      check_out: '',
      saturday_check_out: '',
      startDate: '',
      endDate: '',
    };
  }

  getFileId(): string | null {
    return localStorage.getItem('fileId');
  }

  addMonthRecord(): void {
    const fileId = this.getFileId();
    if (!fileId) {
      this.alertError('File ID is missing. Please reload the page.');
      return;
    }

    if (
      this.newRecord.emp_id &&
      this.newRecord.startDate &&
      this.newRecord.endDate
    ) {
      this.isLoading = true;

      const payload = {
        emp_id: this.newRecord.emp_id,
        start_date: this.newRecord.startDate,
        end_date: this.newRecord.endDate,
        check_in: this.newRecord.check_in,
        check_out: this.newRecord.check_out,
        saturday_check_out: this.newRecord.saturday_check_out,
        file_id: fileId,
      };

      this.http.post(`${apiBaseUrl}api/uploaded_files/${fileId}/view/month-record`, payload).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.alertSuccess('Month attendance records added successfully!');
          this.closeMonthModal();
          this.loadFileData(fileId);
        },
        error: (error) => {
          this.isLoading = false;
          this.alertError('Failed to add month records. Please try again.');
        },
      });
    } else {
      this.alertError('Please fill all required fields.');
    }
  }

  addSingleRecord(): void {
    const fileId = this.getFileId();
    if (!fileId) {
      this.alertError('File ID is missing. Please reload the page.');
      return;
    }

    if (this.newRecord.emp_id && this.newRecord.date && this.newRecord.check_in && this.newRecord.check_out) {
      this.isLoading = true;
      const payload = {
        emp_id: this.newRecord.emp_id,
        date: this.newRecord.date,
        check_in: this.newRecord.check_in,
        check_out: this.newRecord.check_out,
        file_id: fileId,
      };
      this.http.post(`${apiBaseUrl}api/uploaded_files/${fileId}/view/single-record`, payload).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.alertSuccess('Attendance record added successfully!');
          console.log('Attendance record added:', response);
          this.closeSingleModal();
          this.loadFileData(fileId); // Reload the data
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error adding record:', error);
          this.alertError('Failed to add record. Please try again.');
        }
      });
    } else {
      this.alertError('Please fill all required fields.');
    }
  }

  // Selection and Deletion Logic
  selectAll(event: any): void {
    const isChecked = event.target.checked;
    this.pagedData.forEach(data => {
      if (isChecked) {
        this.selectedRecords.push(data);
      } else {
        this.selectedRecords = this.selectedRecords.filter(record => record !== data);
      }
    });
  }

  isSelected(data: any): boolean {
    return this.selectedRecords.includes(data);
  }

  toggleSelection(data: any): void {
    if (this.isSelected(data)) {
      this.selectedRecords = this.selectedRecords.filter(record => record !== data);
    } else {
      this.selectedRecords.push(data);
    }
  }

  deleteSelectedRecords(): void {
    if (this.selectedRecords.length === 0) {
      this.alertError('No records selected for deletion.');
      return;
    }

    const fileId = this.getFileId();
    if (!fileId) {
      this.alertError('File ID is missing. Please reload the page.');
      return;
    }

    this.isLoading = true;
    const recordIds = this.selectedRecords.map(record => record.id);

    this.http.post(`${apiBaseUrl}api/uploaded_files/${fileId}/view/delete-records`, { recordIds }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertSuccess('Selected records deleted successfully!');
        console.log('Records deleted:', response);
        this.selectedRecords = [];
        this.loadFileData(fileId); // Reload the data
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error deleting records:', error);
        this.alertError('Failed to delete records. Please try again.');
      },
    });
  }
}
