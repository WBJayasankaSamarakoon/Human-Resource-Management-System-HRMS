import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { apiBaseUrl } from '../../app.config';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
})
export class MachineComponent {
  MachineArray: any[] = [];
  currentMachine: any = {
    id: '',
    Name: '',
    Model: '',
    Brand: '',
  };
  isLoading: boolean = false;
  showNameError: boolean = false;
  // showModelError: boolean = false;
  // showBrandError: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllMachines();
  }

  getAllMachines() {
    this.isLoading = true;
    this.http.get(`${apiBaseUrl}api/machine`).subscribe(
      (resultData: any) => {
        this.MachineArray = Array.isArray(resultData) ? resultData : [];
        this.isLoading = false;
      },
      () => {
        console.error('Error loading machines.');
        this.isLoading = false;
      }
    );
  }

  openAddModal() {
    this.resetForm();
    this.showNameError = false;
    // this.showModelError = false;
    // this.showBrandError = false;
    this.removeModalFade();
  }

  openEditModal(machineItem: any) {
    this.currentMachine = { ...machineItem };
    this.showNameError = false;
    // this.showModelError = false;
    // this.showBrandError = false;
    this.removeModalFade();
  }

  save() {
    this.showNameError = !this.currentMachine.Name?.trim();
    // this.showModelError = !this.currentMachine.Model?.trim();
    // this.showBrandError = !this.currentMachine.Brand?.trim();

    // || this.showModelError || this.showBrandError

    if (this.showNameError) {
      return;
    }

    if (!this.currentMachine.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  register() {
    this.http.post(`${apiBaseUrl}api/machine`, this.currentMachine).subscribe(
      () => {
        this.alertSuccess('Machine added successfully!');
        this.getAllMachines();
        this.resetForm();
        this.closeModal(); // Close the modal after save
      },
      (error) => {
        console.error('Error adding machine:', error);
        this.alertError('Failed to add machine!');
      }
    );
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/machine/${this.currentMachine.id}`,
        this.currentMachine
      )
      .subscribe(
        () => {
          this.alertSuccess('Machine updated successfully!');
          this.getAllMachines();
          this.resetForm();
          this.closeModal(); // Close the modal after save
        },
        (error) => {
          console.error('Error updating machine:', error);
          this.alertError('Failed to update machine!');
        }
      );
  }

  confirmDelete(machine: any) {
    this.currentMachine = { ...machine };
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('visible');
    }
  }

  deleteMachine() {
    if (this.currentMachine.id) {
      this.deleteRecord(this.currentMachine);
      this.closeConfirmationModal();
    }
  }

  deleteRecord(machine: any) {
    this.http.delete(`${apiBaseUrl}api/machine/${machine.id}`).subscribe(
      () => {
        this.alertSuccess('Machine deleted successfully!');
        this.getAllMachines();
      },
      (error) => {
        console.error('Error deleting machine:', error);
        this.alertError('Failed to delete machine!');
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
    this.currentMachine = {
      id: '',
      Name: '',
      Model: '',
      Brand: '',
    };
    this.showNameError = false;
    // this.showModelError = false;
    // this.showBrandError = false;
  }

  trackById(index: number, machineItem: any): number {
    return machineItem.id;
  }

  closeModal() {
    const modal = document.getElementById('addMachineModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.removeModalFade();
    }
  }

  removeModalFade() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
