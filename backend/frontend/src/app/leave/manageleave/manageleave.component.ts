import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any; // jQuery for modal handling

@Component({
  selector: 'app-manageleave',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manageleave.component.html',
  styleUrls: ['./manageleave.component.scss'],
})
export class ManageLeaveComponent {
  leaveArray: any[] = [];
  employeesArray: any[] = [];
  leaveTypesArray: any[] = [];
  currentLeave: any = {
    id: '',
    employeeId: '',
    leaveTypeId: '',
    startDate: '',
    endDate: '',
  };

  constructor(private http: HttpClient) {
    this.getAllLeaves();
    this.getAllEmployees();
    this.getAllLeaveTypes();
  }

  // Fetch all leave records from the API
  getAllLeaves() {
    this.http.get(`${apiBaseUrl}api/leave`).subscribe((data: any) => {
      // Process the leave data to include employee and leaveType names
      this.leaveArray = data.map((leave: any) => ({
        ...leave,
        employeeName: leave.employee
          ? leave.employee.NameWithInitials
          : 'Unknown', // Handle missing employee data
        leaveType: leave.leaveType ? leave.leaveType.LeaveType : 'Unknown', // Handle missing leave type
        startDate: leave.start_date, // Ensure start date is in the correct format
        endDate: leave.end_date, // Ensure end date is in the correct format
      }));
    });
  }

  // Fetch all employees from the API
  getAllEmployees() {
    this.http.get(`${apiBaseUrl}api/tblemployees`).subscribe((data: any) => {
      this.employeesArray = data;
    });
  }

  // Fetch all leave types from the API
  getAllLeaveTypes() {
    this.http.get(`${apiBaseUrl}api/leavetypes`).subscribe((data: any) => {
      this.leaveTypesArray = data.map((type: any) => ({
        id: type.id,
        typeName: type.LeaveType,
      }));
    });
  }

  // Open modal for adding a new leave entry
  openAddModal() {
    this.resetForm();
    this.currentLeave.id = '';
  }

  // Open modal for editing a leave entry
  openEditModal(leave: any) {
    this.currentLeave = { ...leave };
  }

  // Register a new leave record
  register() {
    if (!this.currentLeave.employeeId || !this.currentLeave.leaveTypeId) {
      alert('Please select both Employee and Leave Type');
      return;
    }

    const leaveData = {
      employee_id: this.currentLeave.employeeId,
      leave_type_id: this.currentLeave.leaveTypeId,
      start_date: this.currentLeave.startDate,
      end_date: this.currentLeave.endDate,
    };

    this.http.post(`${apiBaseUrl}api/leave`, leaveData).subscribe(() => {
      alert('Leave Registered Successfully');
      this.getAllLeaves(); // Refresh table data
      this.resetForm();
      $('#addLeaveModal').modal('hide'); // Close the modal
    });
  }

  // Update an existing leave record
  updateRecords() {
    const leaveData = {
      employee_id: this.currentLeave.employeeId,
      leave_type_id: this.currentLeave.leaveTypeId,
      start_date: this.currentLeave.startDate,
      end_date: this.currentLeave.endDate,
    };

    this.http
      .put(`${apiBaseUrl}api/leave/${this.currentLeave.id}`, leaveData)
      .subscribe(() => {
        alert('Leave Updated Successfully');
        this.getAllLeaves(); // Refresh table data
        this.resetForm();
        $('#editLeaveModal').modal('hide'); // Close the modal
      });
  }

  // Save leave (either add or update)
  save() {
    if (!this.currentLeave.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  // Delete a leave record
  setDelete(leave: any) {
    this.http.delete(`${apiBaseUrl}api/leave/${leave.id}`).subscribe(() => {
      alert('Leave Deleted Successfully');
      this.getAllLeaves(); // Refresh table data after deletion
    });
  }

  // Reset the current leave form
  resetForm() {
    this.currentLeave = {
      id: '',
      employeeId: '',
      leaveTypeId: '',
      startDate: '',
      endDate: '',
    };
  }

  // Track leave data
  trackById(index: number, leave: any) {
    return leave.id;
  }
}
