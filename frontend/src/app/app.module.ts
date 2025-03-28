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
import { EmpshiftComponent } from './shift/empshift/empshift.component';
import { ShiftlineComponent } from './shift/shiftline/shiftline.component';
import { WeekComponent } from './day/week/week.component';
import { TypeshiftComponent } from './shift/typeshift/typeshift.component';
import { LeaveApprovalComponent } from './approve/leaveapproval/leaveapproval.component';
import { AllowancesComponent } from './payroll/salary/allowances/allowances.component';
import { DeductionsComponent } from './payroll/salary/deductions/deductions.component';
import { AdrecordComponent } from './upload/view-file/adrecord/adrecord.component';
import { ParameterComponent } from './attendance/parameter/parameter.component';
// import { AddallowancesComponent } from './payroll/salary/addallowances/addallowances.component';
// import { AdddeductionsComponent } from './payroll/salary/adddeductions/adddeductions.component';
import { LeavedayComponent } from './leave/leaveday/leaveday.component';
import { AddallowancesComponent } from './master/addallowances/addallowances.component';
import { AdddeductionsComponent } from './master/adddeductions/adddeductions.component';
import { SpecialComponent } from './payroll/salary/special/special.component';
import { LateComponent } from './master/late/late.component';


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
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

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
    EmpshiftComponent,
    ShiftlineComponent,
    WeekComponent,
    TypeshiftComponent,
    LeaveApprovalComponent,
    AllowancesComponent,
    DeductionsComponent,
    AdrecordComponent,
    ParameterComponent,
    LeavedayComponent,
    AddallowancesComponent,
    AdddeductionsComponent,
    SpecialComponent,
    LateComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    JsonPipe
  ],

  providers: [
    { provide: 'AppConfig', useValue: appConfig },
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
