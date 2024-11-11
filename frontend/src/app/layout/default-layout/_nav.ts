import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    name: 'Interface',
    title: true,
  },

  {
    name: 'Upload Sheet',
    url: '/upload',
    iconComponent: { name: 'cil-file' },
    children: [
      {
        name: 'Upload File',
        url: '/upload',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'View Uploads',
        url: '/view',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Report',
        url: '/report',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Payroll List',
    url: '/payroll',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Salary Structure',
        url: '/salary',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Payroll Information',
        url: '/pay',
        icon: 'nav-icon-bullet',
      },
    ],
  },

  {
    name: 'Master',
    url: '/master',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Employees',
        url: '/employee',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Machines',
        url: '/machine',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Companies',
        url: '/company',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Departments',
        url: 'department',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Shifts',
        url: 'shift',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Positions',
        url: 'position',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Genders',
        url: 'gender',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Calendar',
        url: 'calendar',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Holidays',
        url: 'holiday',
        icon: 'nav-icon-bullet',
      },
    ],
  },

  {
    name: 'Leave',
    url: '/leave',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Manage Leave Type',
        url: '/typeleave',
        icon: 'nav-icon-bullet',
      },

      {
        name: 'Manage Leave Employee',
        url: '/manageleave',
        icon: 'nav-icon-bullet',
      },
    ],
  },

  {
    title: true,
    name: 'Login Details',
  },
  {
    name: 'User',
    url: '/user',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Admin',
        url: '/admin',
        icon: 'nav-icon-bullet',
      },
    ],
  },

  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto',
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' },
  },
];
