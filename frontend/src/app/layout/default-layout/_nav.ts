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
        url: '/upexcel',
        iconComponent: { name: 'cil-file' },
      },
      {
        name: 'View Uploads',
        url: '/view',
        iconComponent: { name: 'cil-list' },
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
        iconComponent: { name: 'cil-dollar' },
      },
      {
        name: 'Payroll Information',
        url: '/payroll',
        iconComponent: { name: 'cil-notes' },
      },
    ],
  },
  {
    name: 'Master',
    url: '/master',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Employee',
        url: '/employee',
        iconComponent: { name: 'cil-user' },
      },
      {
        name: 'Machine',
        url: '/machine',
        iconComponent: { name: 'cil-notes' },
      },
      {
        name: 'Company',
        url: '/company',
        iconComponent: { name: 'cil-notes' },
      },
      {
        name: 'Department',
        url: '/department',
        iconComponent: { name: 'cil-notes' },
      },
      {
        name: 'Shift',
        url: '/shift',
        iconComponent: { name: 'cil-list' },
      },
      {
        name: 'Position',
        url: '/position',
        iconComponent: { name: 'cil-notes' },
      },
      {
        name: 'Gender',
        url: '/gender',
        iconComponent: { name: 'cil-people' },
      },
      {
        name: 'Calendar',
        url: '/calendar',
        iconComponent: { name: 'cil-calendar' },
      },
      {
        name: 'Holiday',
        url: '/holiday',
        iconComponent: { name: 'cil-sun' },
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
        iconComponent: { name: 'cil-list' },
      },
      {
        name: 'Manage Leave Employee',
        url: '/manageleave',
        iconComponent: { name: 'cil-user' },
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
        iconComponent: { name: 'cil-shield-alt' },
      },
    ],
  },
];
