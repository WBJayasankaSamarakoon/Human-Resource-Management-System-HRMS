import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/app.config';
import { CommonModule } from '@angular/common';

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
    MachineName: '',
    MachineCode: '',
    CreationDate: '',
  };

  constructor(private http: HttpClient) {
    this.getAllMachines();
  }

  getAllMachines() {
    this.http.get(`${apiBaseUrl}api/machine`).subscribe((resultData: any) => {
      if (Array.isArray(resultData)) {
        this.MachineArray = resultData;
      } else {
        console.error('API response is not an array:', resultData);
        this.MachineArray = [];
      }
    });
  }

  openAddModal() {
    this.resetForm();
    this.currentMachine.id = '';
  }

  openEditModal(machineItem: any) {
    this.currentMachine = { ...machineItem };
  }

  register() {
    this.http
      .post(`${apiBaseUrl}api/machine`, this.currentMachine)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Machine Registered Successfully');
        this.getAllMachines();
        this.resetForm();
      });
  }

  updateRecords() {
    this.http
      .put(
        `${apiBaseUrl}api/machine/${this.currentMachine.id}`,
        this.currentMachine
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Machine Updated Successfully');
        this.getAllMachines();
        this.resetForm();
      });
  }

  save() {
    if (!this.currentMachine.id) {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`${apiBaseUrl}api/machine/${data.id}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Machine Deleted Successfully');
        this.getAllMachines();
      });
  }

  resetForm() {
    this.currentMachine = {
      id: '',
      MachineName: '',
      MachineCode: '',
      CreationDate: '',
    };
  }

  trackById(index: number, machineItem: any): number {
    return machineItem.id;
  }
}
