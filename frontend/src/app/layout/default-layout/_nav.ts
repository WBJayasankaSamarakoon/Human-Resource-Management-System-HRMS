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
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'View Uploads',
        url: '/view',
        iconComponent: { name: 'cil-dot' },
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
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Payroll Information',
        url: '/payroll',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },
  {
    name: 'Master',
    url: '/master',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Company',
        url: '/company',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Department',
        url: '/department',
        iconComponent: { name: 'cil-dot' },
      },
      // {
      //   name: 'Shift',
      //   url: '/shift',
      //   iconComponent: { name: 'cil-list' },
      // },
      {
        name: 'Employee',
        url: '/employee',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Machine',
        url: '/machine',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Position',
        url: '/position',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Gender',
        url: '/gender',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Calendar',
        url: '/calendar',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Holiday',
        url: '/holiday',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Additional',
        url: '/addallowances',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Deductions',
        url: '/adddeductions',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Late',
        url: '/late',
        iconComponent: { name: 'cil-dot' },
      },

    ],
  },

  {
    name: 'Attendance',
    url: '/attendance',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Attendance Parameter',
        url: '/parameter',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },

  {
    name: 'Day of Week',
    url: '/day',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Week Days',
        url: '/week',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },

  {
    name: 'Shift Master',
    url: '/shift',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Employee Shift',
        url: '/empshift',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Shift Type',
        url: '/typeshift',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Employee Shift Line',
        url: '/shiftline',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },

  {
    name: 'Approval Master',
    url: '/approve',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Leave Approve',
        url: '/leaveapproval',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },

  {
    name: 'Leave Master',
    url: '/leave',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Leave Type',
        url: '/typeleave',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Leave Day Type',
        url: '/leaveday',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Employee Leave',
        url: '/manageleave',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Leave Allocation',
        url: '/allocation',
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },

  {
    name: 'Asset Master',
    url: '/assetmas',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Assets',
        url: '/assets',
        iconComponent: { name: 'cil-dot' },
      },
      {
        name: 'Asset Allocation',
        url: '/astallocation',
        iconComponent: { name: 'cil-dot' },
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
        iconComponent: { name: 'cil-dot' },
      },
    ],
  },
];
