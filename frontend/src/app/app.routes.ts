import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DefaultLayoutComponent } from './layout';
import { DashboardComponent } from './views/dashboard/dashboard.component';
//import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
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
