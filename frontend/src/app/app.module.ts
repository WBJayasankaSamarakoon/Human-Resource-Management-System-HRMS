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
import { PayrollComponent } from './payroll/payroll/payroll.component';
import { ViewFileComponent } from './upload/view-file/view-file.component';
import { ProcessComponent } from './upload/process/process.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SlipComponent } from './upload/slip/slip.component';

import { appConfig } from './app.config';
import { routes } from './app.routes';

// Modern HttpClient configuration
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Import paths for additional components
import { ReportComponent } from './upload/report/report.component';
import { ViewComponent } from './upload/view/view.component';
import { SalaryComponent } from './payroll/salary/salary.component';
import { PayComponent } from './payroll/pay/pay.component';
import { LeaveTypeComponent } from './leave/typeleave/typeleave.component';
import { ManageLeaveComponent } from './leave/manageleave/manageleave.component';
import { AdminComponent } from './user/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';

// Import the AuthGuard
import { AuthGuard } from './auth.guard'; // Adjust the path if necessary
import { HttpClientModule } from '@angular/common/http';

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
    ReportComponent,
    ViewComponent,
    SalaryComponent,
    PayComponent,
    LeaveTypeComponent,
    ManageLeaveComponent,
    AdminComponent,
    PayrollComponent,
    ViewFileComponent,
    ProcessComponent,
    SlipComponent,
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes), // Routing setup
    HttpClientModule, // Required for HTTP requests
  ],

  providers: [
    { provide: 'AppConfig', useValue: appConfig },
    provideHttpClient(withInterceptorsFromDi()), // Modern HttpClient setup
    AuthGuard, // Register the AuthGuard
  ],

  bootstrap: [AppComponent], // Bootstrap root component
})
export class AppModule {}
