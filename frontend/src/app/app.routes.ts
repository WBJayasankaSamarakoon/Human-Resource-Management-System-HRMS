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
import { UploadComponent } from './upload/upload/upload.component';
import { ReportComponent } from './upload/report/report.component';
import { ViewComponent } from './upload/view/view.component';
import { SalaryComponent } from './payroll/salary/salary.component';
import { PayComponent } from './payroll/pay/pay.component';
import { LeaveTypeComponent } from './leave/typeleave/typeleave.component';
import { ManageLeaveComponent } from './leave/manageleave/manageleave.component';
import { AdminComponent } from './user/admin/admin.component';

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
        path: 'upload',
        component: UploadComponent,
        data: { title: 'Upload' },
      },

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
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];
