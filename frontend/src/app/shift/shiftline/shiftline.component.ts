import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-shiftline',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shiftline.component.html',
  styleUrls: ['./shiftline.component.scss'],
})
export class ShiftlineComponent {
  shiftLineArray: any[] = [];
  shiftArray: any[] = [];
  typeshiftArray: any[] = [];
  weekArray: any[] = [];
  groupedShiftLines: any[] = [];
  currentShiftLine: any = {
    id: '',
    empshift_id: '',
    StartTime: '',
    HalfTime: null,
    EndTime: '',
    Day: '',
    Name: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  showStartTimeError: boolean = false;
  showEndTimeError: boolean = false;
  showDayError: boolean = false;
  showShiftTypeError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllShiftLines();
    this.getAllEmpShifts();
    this.getWeekDays();
    this.getAllTypeShifts();
  }

  getAllShiftLines() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/shiftline`).subscribe(
      (data: any) => {
        this.shiftLineArray = data;
        this.groupShiftLinesByShiftName();
        this.isLoading = false;
      },
      () => {
        console.error('Error loading shift lines.');
        this.isLoading = false;
      }
    );
  }

  groupShiftLinesByShiftName() {
    const grouped: any = {};

    this.shiftLineArray.forEach((shiftLine: any) => {
      const shiftName = shiftLine.empshift.Name;
      if (!grouped[shiftName]) {
        grouped[shiftName] = { empshift: shiftLine.empshift, lines: [] };
      }
      grouped[shiftName].lines.push(shiftLine);
    });

    this.groupedShiftLines = Object.values(grouped);
  }

  // Fetch week data for the Day dropdown
  getWeekDays() {
    this.http.get(`${apiBaseUrl}api/week`).subscribe(
      (data: any) => {
        this.weekArray = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error loading week days:', error);
      }
    );
  }

  getAllEmpShifts() {
    this.http.get(`${apiBaseUrl}api/empshift`).subscribe(
      (data: any) => {
        this.shiftArray = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error loading employee shifts:', error);
      }
    );
  }

  // Fetch Type Shift
  getAllTypeShifts() {
    this.http.get(`${apiBaseUrl}api/typeshift`).subscribe(
      (data: any) => {
        this.typeshiftArray = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error loading type shifts:', error);
      }
    );
  }

  // openAddModal() {
  //   this.resetForm();
  //   this.showNameError = false;
  //   this.showStartTimeError = false;
  //   this.showEndTimeError = false;
  //   this.showDayError = false;
  //   this.showShiftTypeError = false;
  //   this.removeModalFade();
  // }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    this.showStartTimeError = false;
    this.showEndTimeError = false;
    this.showDayError = false;
    this.showShiftTypeError = false;
  const modalElement = document.getElementById('addShiftLineModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  openEditModal(shiftLineItem: any) {
    this.currentShiftLine = {
      ...shiftLineItem,
      HalfTime: shiftLineItem.HalfTime || null
    };
    this.showNameError = false;
    this.showStartTimeError = false;
    this.showEndTimeError = false;
    this.showDayError = false;
    this.showShiftTypeError = false;
    this.removeModalFade();
  }

  save() {
    // Validate the form before saving
    if (
      !this.currentShiftLine.empshift_id ||
      !this.currentShiftLine.StartTime ||
      !this.currentShiftLine.EndTime ||
      !this.currentShiftLine.Day ||
      !this.currentShiftLine.Name
    ) {
      this.showNameError = !this.currentShiftLine.empshift_id;
      this.showStartTimeError = !this.currentShiftLine.StartTime;
      this.showEndTimeError = !this.currentShiftLine.EndTime;
      this.showDayError = !this.currentShiftLine.Day;
      this.showShiftTypeError = !this.currentShiftLine.Name;
      return;
    }

    // Check if the record has an ID. If not, it's a new record.
    if (!this.currentShiftLine.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/shiftline`, this.currentShiftLine)
      .subscribe(
        () => {
          this.alertSuccess('Shift Line added successfully!');
          this.getAllShiftLines();
          this.resetForm();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding shift line:', error);
          this.alertError('Failed to add shift line!');
        }
      );
  }

  updateRecords() {
    // Format times to include seconds
    const formattedData = {
        ...this.currentShiftLine,
        StartTime: this.formatTimeWithSeconds(this.currentShiftLine.StartTime),
        EndTime: this.formatTimeWithSeconds(this.currentShiftLine.EndTime),
        HalfTime: this.currentShiftLine.HalfTime ?
                 this.formatTimeWithSeconds(this.currentShiftLine.HalfTime) :
                 null
    };

    this.http
        .put(
            `${apiBaseUrl}api/shiftline/${this.currentShiftLine.id}`,
            formattedData
        )
        .subscribe(
            () => {
                this.alertSuccess('Shift Line updated successfully!');
                this.getAllShiftLines();
                this.resetForm();
                this.closeModal();
            },
            (error) => {
                console.error('Error updating shift line:', error);
                this.alertError('Failed to update shift line!');
            }
        );
}

// Helper method to format time with seconds
private formatTimeWithSeconds(time: string): string {
    if (!time) return time;
    if (time.length === 5) { // If format is HH:mm
        return time + ':00'; // Add seconds
    }
    return time;
}

  confirmDelete(shiftLine: any) {
    this.currentShiftLine = { ...shiftLine };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteShiftLine() {
    if (this.currentShiftLine.id) {
      this.deleteRecord(this.currentShiftLine);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(shiftLine: any) {
    this.http.delete(`${apiBaseUrl}api/shiftline/${shiftLine.id}`).subscribe(
      () => {
        this.alertSuccess('Shift Line deleted successfully!');
        this.getAllShiftLines();
      },
      (error) => {
        console.error('Error deleting shift line:', error);
        this.alertError('Failed to delete shift line!');
      }
    );
  }

  closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('visible');
    }
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
        alertBox.classList.remove('visible');
      }, 3000);
    }
  }

  resetForm() {
    this.currentShiftLine = {
      id: '',
      empshift_id: '',
      StartTime: '',
      HalfTime: null,
      EndTime: '',
      Day: '',
      Name: '',
    };
    this.showNameError = false;
    this.showStartTimeError = false;
    this.showEndTimeError = false;
    this.showDayError = false;
    this.showShiftTypeError = false;
  }

  trackById(index: number, shiftLineItem: any): number {
    return shiftLineItem.id;
  }

  closeModal() {
    const modalElement = document.getElementById('addShiftLineModal');
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new (window as any).bootstrap.Modal(modalElement).hide();
      }
    }

    // Cleanup: Remove any leftover backdrop or modal-open class
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; // Allow scroll
  }


  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
