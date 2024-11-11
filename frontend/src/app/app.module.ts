import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MachineComponent } from './master/machine/machine.component';
import { PositionComponent } from './master/position/position.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { DepartmentComponent } from './master/department/department.component';
import { GenderComponent } from './master/gender/gender.component';
import { HolidayComponent } from './master/holiday/holiday.component';
import { ShiftComponent } from './master/shift/shift.component';
import { CompanyComponent } from './master/company/company.component';
import { CalendarComponent } from './master/calendar/calendar.component';

import { appConfig } from './app.config';
import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

//import path for UploadNewComponent
import { UploadComponent } from './upload/upload/upload.component';
import { ReportComponent } from './upload/report/report.component';
import { ViewComponent } from './upload/view/view.component';

//import path for PayrollComponent
import { SalaryComponent } from './payroll/salary/salary.component';
import { PayComponent } from './payroll/pay/pay.component';

//import path for LeaveComponent
import { LeaveTypeComponent } from './leave/typeleave/typeleave.component';
import { ManageLeaveComponent } from './leave/manageleave/manageleave.component';

//import path for UserComponent
import { AdminComponent } from './user/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    PositionComponent,
    EmployeeComponent,
    CompanyComponent,
    DepartmentComponent,
    GenderComponent,
    HolidayComponent,
    ShiftComponent,
    CalendarComponent,
    UploadComponent,
    ReportComponent,
    ViewComponent,
    SalaryComponent,
    PayComponent,
    LeaveTypeComponent,
    ManageLeaveComponent,
    AdminComponent,
  ],

  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [
    { provide: 'AppConfig', useValue: appConfig },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
