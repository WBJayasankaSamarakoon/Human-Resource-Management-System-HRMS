import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DefaultLayoutComponent } from './layout';
import { DashboardComponent } from './views/dashboard/dashboard.component';
//import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MachineComponent } from './master/machine/machine.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { CompanyComponent } from './master/company/company.component';
import { ShiftComponent } from './master/shift/shift.component';
import { DepartmentComponent } from './master/department/department.component';
import { PositionComponent } from './master/position/position.component';
import { GenderComponent } from './master/gender/gender.component';
import { HolidayComponent } from './master/holiday/holiday.component';
import { CalendarComponent } from './master/calendar/calendar.component';
import { ReportComponent } from './upload/report/report.component';
import { ViewComponent } from './upload/view/view.component';
import { SalaryComponent } from './payroll/salary/salary.component';
import { LeaveTypeComponent } from './leave/typeleave/typeleave.component';
import { ManageLeaveComponent } from './leave/manageleave/manageleave.component';
import { AdminComponent } from './user/admin/admin.component';
import { UpexcelComponent } from './upload/upexcel/upexcel.component';
import { PayrollComponent } from './payroll/payroll/payroll.component';
import { ViewFileComponent } from './upload/view-file/view-file.component';
import { ProcessComponent } from './upload/process/process.component';
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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: 'Dashboard' },
      },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      //   canActivate: [AuthGuard],
      //   data: { title: 'Profile' },
      // },
      {
        path: 'machine',
        component: MachineComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'shift',
        component: ShiftComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'position',
        component: PositionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'gender',
        component: GenderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'holiday',
        component: HolidayComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
        data: { title: 'Report' },
      },
      {
        path: 'view',
        component: ViewComponent,
        canActivate: [AuthGuard],
        data: { title: 'View' },
      },
      {
        path: 'view-file',
        component: ViewFileComponent,
        canActivate: [AuthGuard],
        data: { title: 'View File' },
      },
      {
        path: 'process',
        component: ProcessComponent,
        canActivate: [AuthGuard],
        data: { title: 'Process' },
      },
      {
        path: 'slip',
        component: SlipComponent,
        canActivate: [AuthGuard],
        data: { title: 'Slip' },
      },
      {
        path: 'upexcel',
        component: UpexcelComponent,
        canActivate: [AuthGuard],
        data: { title: 'Upload Excel' },
      },
      {
        path: 'salary',
        component: SalaryComponent,
        canActivate: [AuthGuard],
        data: { title: 'Salary' },
      },
      {
        path: 'typeleave',
        component: LeaveTypeComponent,
        canActivate: [AuthGuard],
        data: { title: 'Leave Type' },
      },
      {
        path: 'manageleave',
        component: ManageLeaveComponent,
        canActivate: [AuthGuard],
        data: { title: 'Manage Leave' },
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { title: 'Admin' },
      },
      {
        path: 'payroll',
        component: PayrollComponent,
        canActivate: [AuthGuard],
        data: { title: 'Payroll' },
      },
      {
        path: 'empshift',
        component: EmpshiftComponent,
        canActivate: [AuthGuard],
        data: { title: 'Empshift' },
      },
      {
        path: 'shiftline',
        component: ShiftlineComponent,
        canActivate: [AuthGuard],
        data: { title: 'Shiftline' },
      },
      {
        path: 'week',
        component: WeekComponent,
        canActivate: [AuthGuard],
        data: { title: 'DayofWeek' },
      },
      {
        path: 'leaveapproval',
        component: LeaveApprovalComponent,
        canActivate: [AuthGuard],
        data: { title: 'LeaveApprove' },
      },
      {
        path: 'typeshift',
        component: TypeshiftComponent,
        canActivate: [AuthGuard],
        data: { title: 'TypeShift' },
      },
      {
        path: 'allowances',
        component: AllowancesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Allowances' },
      },
      {
        path: 'deducations',
        component: DeductionsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Deducations' },
      },
      {
        path: 'adrecord',
        component: AdrecordComponent,
        canActivate: [AuthGuard],
        data: { title: 'adrecord' },
      },
      {
        path: 'parameter',
        component: ParameterComponent,
        canActivate: [AuthGuard],
        data: { title: 'Attendance Parameter' },
      },

      {
        path: 'addallowances',
        component: AddallowancesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Add Allowance Type' },
      },
      {
        path: 'adddeductions',
        component: AdddeductionsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Add Dedutions Type' },
      },
      {
        path: 'leaveday',
        component: LeavedayComponent,
        canActivate: [AuthGuard],
        data: { title: 'Leave Day Type' },
      },
      {
        path: 'special',
        component: SpecialComponent,
        canActivate: [AuthGuard],
        data: { title: 'Special Instruction' },
      },
      {
        path: 'late',
        component: LateComponent,
        canActivate: [AuthGuard],
        data: { title: 'Late Deduction' },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
