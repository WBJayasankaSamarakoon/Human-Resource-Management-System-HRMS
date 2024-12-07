import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
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
import { PayComponent } from './payroll/pay/pay.component';
import { LeaveTypeComponent } from './leave/typeleave/typeleave.component';
import { ManageLeaveComponent } from './leave/manageleave/manageleave.component';
import { AdminComponent } from './user/admin/admin.component';
import { UpexcelComponent } from './upload/upexcel/upexcel.component';
import { PayrollComponent } from './payroll/payroll/payroll.component';
import { ViewFileComponent } from './upload/view-file/view-file.component';
import { ProcessComponent } from './upload/process/process.component';
import { SlipComponent } from './upload/slip/slip.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then((m) => m.routes),
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/routes').then((m) => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/routes').then((m) => m.routes),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/routes').then((m) => m.routes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then((m) => m.routes),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then((m) => m.routes),
      },

      {
        path: 'machine',
        component: MachineComponent,
      },

      {
        path: 'employee',
        component: EmployeeComponent,
      },

      {
        path: 'company',
        component: CompanyComponent,
      },

      {
        path: 'shift',
        component: ShiftComponent,
      },

      {
        path: 'department',
        component: DepartmentComponent,
      },

      {
        path: 'position',
        component: PositionComponent,
      },

      {
        path: 'gender',
        component: GenderComponent,
      },

      {
        path: 'holiday',
        component: HolidayComponent,
      },

      { path: 'calendar', component: CalendarComponent },

      {
        path: 'report',
        component: ReportComponent,
        data: { title: 'report' },
      },

      {
        path: 'view',
        component: ViewComponent,
        data: { title: 'view' },
      },

      {
        path: 'view-file', // New Route
        component: ViewFileComponent,
        data: { title: 'View File' },
      },

      {
        path: 'process', // New Route
        component: ProcessComponent,
        data: { title: 'process' },
      },

      {
        path: 'slip', // New Route
        component: SlipComponent,
        data: { title: 'slip' },
      },

      {
        path: 'upexcel',
        component: UpexcelComponent,
        data: { title: 'upexcel' },
      },

      {
        path: 'salary',
        component: SalaryComponent,
        data: { title: 'salary' },
      },

      {
        path: 'pay',
        component: PayComponent,
        data: { title: 'salary' },
      },

      {
        path: 'typeleave',
        component: LeaveTypeComponent,
        data: { title: 'typeleave' },
      },

      {
        path: 'manageleave',
        component: ManageLeaveComponent,
        data: { title: 'typeleave' },
      },

      {
        path: 'admin',
        component: AdminComponent,
        data: { title: 'admin' },
      },

      {
        path: 'payroll',
        component: PayrollComponent,
        data: { title: 'payroll' },
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: {
      title: 'Login Page',
    },
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    data: {
      title: 'Register Page',
    },
  },

  { path: '**', redirectTo: 'dashboard' },
];
