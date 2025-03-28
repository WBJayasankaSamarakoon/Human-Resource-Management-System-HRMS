import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowancesComponent } from './allowances/allowances.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { SpecialComponent } from './special/special.component';

@Component({
  selector: 'app-salary',
  standalone: true,
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
  imports: [
    CommonModule,
    AllowancesComponent,
    DeductionsComponent,
    SpecialComponent,
  ],
})
export class SalaryComponent {
  activeTab: string = 'allowances';

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
