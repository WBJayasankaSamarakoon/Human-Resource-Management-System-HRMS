# HR Platform – Public API, Function, and Component Documentation

This document captures every public-facing API surface and Angular component that ships with the HR & Payroll platform contained in this repository. Use it as a single source of truth when integrating external systems, extending backend functionality, or wiring new UI/UX flows on top of the existing Angular front end.

---

## 1. System Overview

| Layer | Stack | Location | Notes |
| --- | --- | --- | --- |
| Backend | Laravel 10 (PHP 8), MySQL, JWT Auth (`php-open-source-saver/jwt-auth`) | `backend/` | Provides REST APIs under `/api`. Responses default to JSON. |
| Frontend | Angular 17 (standalone components + CoreUI), TypeScript | `frontend/` | Consumes Laravel APIs via `HttpClient`. Routes are guarded by a token-based `AuthGuard`. |
| Shared Assets | Node/NPM (build tooling), Composer (PHP deps) | repo root | Run `npm install && npm run build` inside `frontend`, `composer install` in `backend`. |

- **Backend base URL (local default):** `http://127.0.0.1:8000/`
- **Frontend base URL (when served via `ng serve`):** `http://localhost:4200/`
- **API base constant (frontend):** `apiBaseUrl` exported from `frontend/src/app/app.config.ts`. Update this file to point to non-local environments.

---

## 2. Backend API Reference

### 2.1 Conventions, Authentication & Error Model

- **Authentication**
  - JWT-based. Obtain a bearer token via `POST /api/auth/login` (email + password).
  - Include `Authorization: Bearer <token>` for protected endpoints (most resource routes sit behind `auth:api` middleware globally configured in `app/Http/Kernel.php`).
  - Refresh via `POST /api/auth/refresh`.
  - Logout via `POST /api/auth/logout`.
  - `POST /api/auth/profile` returns the current user payload.

- **Response envelope (via `App\Http\Controllers\Api\BaseController`)**
  - Success: `{ "success": true, "data": <payload>, "message": "<human readable>" }`
  - Error: `{ "success": false, "message": "Unauthorised.", "data": { "email": ["Required."] } }`

- **Validation**
  - All `store`/`update` actions call `$request->validate(...)`; HTTP `422` is returned on failure.

- **Pagination**
  - Native controllers currently return full collections (`Model::all()`). Add pagination via Eloquent `paginate()` if the dataset grows.

### 2.2 Standard CRUD Resources

The following resources are registered through `Route::apiResource(...)`. Each one exposes `index`, `show`, `store`, `update`, and `destroy` (unless noted). Use `GET /api/<resource>` for listing and the conventional REST verbs for other actions.

| Resource | Base Path | Backing Model & Required Fields | Notable Relationships / Notes |
| --- | --- | --- | --- |
| Machine | `/api/machine` | `Machine` – `Name` required; `Model`, `Brand` optional | Basic device registry. |
| Employees | `/api/tblemployees` | `Tblemployee` – `EmpId`, `NameWithInitials`, `DefaultShift` required | Loads `empshift` relation on `index`. Many optional HR fields. |
| Departments | `/api/tbldepartments` | `Tbldepartment` – `DepartmentName` optional but front end enforces it | Static department data. |
| Company | `/api/company` | `Company` – `Name`; optional `Logo` upload stored as Base64 | Also exposed via `POST /api/company/update/{id}` for legacy clients. |
| Gender | `/api/gender` | `Gender` – `Name` | Lookup table. |
| Events (Holidays) | `/api/events` | `Events` – `Title`, `Date` | `scopeForMonthAndYear` available for filtering. |
| Position | `/api/position` | `Position` – `Name` | Job titles. |
| Shift | `/api/shift` | `Shift` – `StartTime`, `EndTime`, `Week` | Simple weekly schedule block. |
| Salary Structure | `/api/salarystructure` | `SalaryStructure` – `Name`, `Value` | Defines template values. |
| Leave Types | `/api/leavetypes` | `LeaveType` – `LeaveType` required, `Description` optional | Used by Leave + Allocation flows. |
| Admins | `/api/admin` | `Admin` – `username`, `email`, `password` | Password hashed; also has custom `/api/admin/login`. |
| Upexcel | `/api/upexcel` | `Upexcel` – `store` expects Excel upload (`file`, `year`, `month`) | Index supports `?year=&month=` filters. |
| Uploaded Files | `/api/uploaded_files` | `UploadedFile` – `file_name`, `year`, `month` | Resource excludes `create/edit`; extra nested routes exist (see §2.5). |
| Payroll | `/api/payrolls` | `Payroll` – `emp_id`, `basic_salary`, `payment_date` | Contains allowances/tax fields; also exposes custom GET/POST routes. |
| Leave Requests | `/api/leave` | `Leave` – `employee_id`, `leave_type_id`, `start_date`, `end_date`, `approve`, `leaveday_id` | Eager loads `employee`, `leaveType`, `leaveapprove`, `leaveday`. |
| Payslip data | `/api/payslip` | `Payslip` – daily attendance snapshot | Typically read-only. |
| Employee Shifts | `/api/empshift` | `EmpShift` – `Name` required | Links to `shiftline`. |
| Shift Lines | `/api/shiftline` | `ShiftLine` – `empshift_id`, `StartTime`, `EndTime`, `Day`, `Name` (shift type) | `index` loads `empshift`, `week`, `typeshift`. |
| Week Days | `/api/week` | `Week` – `Day` label | Reference table for shift scheduling. |
| Shift Types | `/api/typeshift` | `TypeShift` – `Name`; optional `Value` | Used by `ShiftLine`. |
| Leave Approvers | `/api/leaveapprove` | `LeaveApprove` – `Name` | Approver list. |
| Allowances | `/api/allowances` | `Allowances` – `emp_id`, `type`, `amount`, `payment_date`, `is_active` | Loads `employee`, `allowanceTypes`. Filter by `?emp_id=`. |
| Deductions | `/api/deductions` | `Deductions` – `emp_id`, `type`, `amount`, `payment_date`, `is_active` | Loads `employee`, `deductionType`. |
| Payroll Parameters | `/api/parameter` | `Parameter` – `work`, `hours`, `leave`, `epfEmp`, `epfCom`, `etfCom`, `ot`, `specot` | Single-row config for payroll math. |
| Allowance Types | `/api/addallowance` | `Addallowance` – `Name` | Lookup for allowances. |
| Deduction Types | `/api/adddeduction` | `Adddeduction` – `Name` | Lookup for deductions. |
| Leave Day Types | `/api/leaveday` | `LeaveDay` – `Name`, optional `Value` (0.5 for half-day) | Consumed by Leaves. |
| Special Instructions | `/api/special` | `Special` – `emp_id`, `payment_date`, `type`, `leave_count`, `AttendanceIncentive` | Extra adjustments for payroll. |
| Late Rules | `/api/late` | `Late` – `from_min`, `to_min`, `deduction_min` | Used when computing no-pay & OT. |
| Leave Allocation | `/api/allocation` | `Allocation` – `employee_id`, `year`, `leave_type_id`, `leave_count` | Extra `/api/allocation/count?employee_id=&year=` helper. |
| Process Reports | `/api/processreport` | `ProcessReport` – `year`, `month`, `emp_id`, `name`, plus payroll metrics (see model) | `store` accepts bulk `data[]`. |
| Assets | `/api/assets` | `Assets` – `serial_no`, `name` | Basic asset registry. |
| Asset Allocations | `/api/assetallocation` | `AssetAllocation` – `emp_id`, `asset_id`, `give_date`, optional `handover_date`, `description` | Extra helper `employeeAssets($emp_id)` defined but not routed. |
| Mail | `/api/send-mail` | `MailController` – `email` | `apiResource` only uses `index`; see §2.6. |
| Year Report | `/api/yeareport` | `ProcessReport` reuse – `year`, `month`, payroll totals | Mirrors `processreport` for reporting UIs. |

> ⚠️ **Known gap**: `Route::get('special/recalculate-attendance-incentive/{emp_id}/{payment_date}/{type}')` points to `SpecialController::recalculateAttendanceIncentive`, but that method is currently commented out. Invoking this endpoint will throw a 500. Implement or remove before release.

### 2.3 Authentication Endpoints

| Method | Path | Body | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | `{ name, email, password, c_password }` | Creates a `User`, returns bearer token in `data`. |
| POST | `/api/auth/login` | `{ email, password }` | Issues JWT (`data.access_token`). |
| POST | `/api/auth/logout` | `{}` | Invalidates token. Requires `Authorization` header. |
| POST | `/api/auth/refresh` | `{}` | Returns new token. |
| POST | `/api/auth/profile` | `{}` | Reads authenticated profile. |

**Example – authenticate and call a protected route**

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'

# --> Use the access_token returned here

curl http://127.0.0.1:8000/api/machine \
  -H "Authorization: Bearer <access_token>"
```

### 2.4 Domain-Specific APIs

#### 2.4.1 People & Organization

- **Employees (`/api/tblemployees`)**
  - `index` eager-loads `empshift` to expose default shift metadata.
  - `store`/`update` enforce unique `EmpId` and a valid `DefaultShift`.
  - Use `DELETE /api/tblemployees/{id}` to retire employees.

- **Departments, Positions, Company, Gender**
  - Standard CRUD tables. `Company::store` accepts a multipart file called `Logo`; the controller converts it to a Base64 data URI. To keep binary assets on disk, adapt the controller to store the file path instead.

- **Admin controller**
  - Includes `/api/admin/login` (Sanctum token). Not consumed by the Angular client (the SPA uses `/api/auth/...`). Documented for legacy admin portal compatibility.

#### 2.4.2 Scheduling & Attendance

- **Shifts (`/api/shift`), EmpShift (`/api/empshift`), ShiftLine (`/api/shiftline`), Week (`/api/week`), TypeShift (`/api/typeshift`)**
  - Compose the work calendar. `ShiftLine` enforces referential integrity to `empshift`, `week`, and `typeshift`.
  - `ShiftLineController::index` returns nested objects, which the Angular components expect when rendering rosters.

- **Late deduction rules (`/api/late`)**
  - Define minute ranges and deduction minutes. The complex query inside `ViewFileController::getCombinedData` uses these ranges when calculating `late_hours`.

- **Attendance parameters (`/api/parameter`)**
  - Single-row numeric configuration (working days, EPF/ETF percentages, OT rates). Reference inside payroll calculations.

#### 2.4.3 Leave Management

- **Leave Types, Leave Days, Leave Approvers** – master data.
- **Leave Requests (`/api/leave`)**
  - `index` returns `Leave` models with `employee`, `leaveType`, `leaveapprove`, `leaveday`.
  - `count` helper exists inside the controller but no route points to it. Add `Route::get('leave/count', ...)` if you need monthly leave tallies.

- **Leave Allocation (`/api/allocation`)**
  - Tracks yearly entitlements. `count` helper sums `leave_count` for an employee/year.

- **Special Attendance Adjustments (`/api/special` and `/api/special-new/combined-data/{emp_id}/{month}/{year}`)**
  - Provide manual overrides for attendance incentive calculations.
  - `GET /api/special-new/combined-data/{emp_id}/{month}/{year}` merges leave and payroll data for a single employee-month.

#### 2.4.4 Payroll & Compensation

- **Payroll CRUD (`/api/payrolls`)** plus explicit short-hand routes:
  - `GET /api/payrolls` – list all, optional `?person_id=<EmpId>`.
  - `GET /api/payroll/{empId}` – aggregated join across `payroll`, `tblemployees`, `upexcel`, and `leave`.
  - `POST /api/payrolls`, `PUT /api/payrolls/{id}`, `DELETE /api/payrolls/{id}` – standard operations.
  - Missing fields default to `0.00` or `true` (`is_active`).

- **Allowances & Deductions** – tie to `Addallowance` / `Adddeduction` types and employees via `EmpId`. Both controllers support filtering by employee ID.

- **Process & Reporting**
  - `GET /api/process/{id}/combined-data` (ProcessController) joins attendance uploads, leave, events, and payroll for a given file ID, returning consolidated metrics (no-pay counts, late hours, allowances, etc.).
  - `ProcessReportController` and `YeareportController` expose persistent monthly snapshots. `ProcessReportController::store` accepts payloads shaped as:
    ```json
    {
      "year": 2024,
      "month": 10,
      "data": [
        {
          "emp_id": "E001",
          "name": "Jane",
          "basic_salary": 120000,
          "no_pay_count": 0,
          "...": "..."
        }
      ]
    }
    ```
  - `YeareportController` mirrors CRUD but is optimized for filtering via `?year=2024&month=10`.

#### 2.4.5 Assets

- **Assets (`/api/assets`)** – register company property.
- **Asset Allocation (`/api/assetallocation`)** – assign property to employees, track give/handover dates. All responses include the related `employee` and `asset`.

#### 2.4.6 File Ingestion & Attendance Imports

- **Uploaded Files (`/api/uploaded_files`)** – store metadata for uploaded Excel files (`year`, `month`).
- **Upload Attendance (`/api/upexcel`)**
  - `POST` expects `multipart/form-data` with fields `file`, `year`, `month`.
  - The controller uses PhpSpreadsheet to parse the first sheet and create `Upexcel` rows (skips the first two header rows).
- **Nested routes (defined in `routes/api.php`)**
  - `GET /api/uploaded_files/{id}/view` → `UpexcelController::viewFile` – fetch raw rows for a file.
  - `DELETE /api/uploaded_files/{id}/delete` → `UpexcelController::deleteFile`.
  - `GET /api/uploaded_files/{fileId}/view/combined-data` → `ViewFileController::getCombinedData` – heavy report query using the file’s `year/month`.
  - `POST /api/uploaded_files/{fileId}/view/month-record` → `ViewFileController::storeMonthRecord` – bulk manual entries between `start_date`/`end_date`.
  - `POST /api/uploaded_files/{fileId}/view/single-record` → `ViewFileController::storeSingleRecord`.
  - `POST /api/uploaded_files/{fileId}/view/delete-records` → `ViewFileController::deleteRecords`.

- **Manual Process flows**
  - `ViewFileController::storeSingleRecord` auto-screens weekends, holidays (`events`), and approved leaves. Saturdays fall back to shortened hours if no shiftline exists.
  - `ViewFileController::getCombinedData` exposes a rich JSON object containing:
    - Attendance counts (days worked, no-pay, leave, holidays)
    - Approvals (post/pre/unapproved)
    - Payroll figures (basic, incentives, allowances, deductions, tax)
    - Overtime / late hours, EPF/ETF contributions
  - Some `Route::get('/combined-data{id}', ...)` path is missing a slash before `{id}`; fix this before exposing publicly.

#### 2.4.7 Communication & Mails

- **Payslip Emailing**
  - `POST /api/send-payslip` → `PayslipController::sendPayslip`
    - Body fields: `email`, `name`, `subject`, `message?`, `payslipData` (JSON string), `companyData?` (JSON string), `attachPdf` (boolean), `customPdf?` (file).
    - If `attachPdf` is `true`, the `SlipMail` mailable renders an HTML PDF. You can optionally upload your own `customPdf`.
  - `MailController::index` (wired to both `POST /api/send-mail` and `Route::apiResource('send-mail', ...)`) sends demo emails with hard-coded attachments. Adjust before production use.

- **Web routes**
  - `POST /send-slip` (non-API, defined in `routes/web.php`) also dispatches `SlipMail`. It validates `email` + `slipData` (array) and runs as part of the Blade view.

#### 2.4.8 Dashboard & Utility

- `GET /api/dashboard/counts` → `DashboardController::getCounts` returns `{ totalAdmins, totalEmployees, totalEvents, totalLeaves }`.
- Health checks: `GET /api/test`, `GET /api/greeting`.

### 2.5 Example Payloads

**Create a Department**

```bash
curl -X POST http://127.0.0.1:8000/api/tbldepartments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "DepartmentName": "Engineering",
    "DepartmentShortName": "ENG",
    "DepartmentCode": "D001"
  }'
```

**Upload an Attendance Spreadsheet**

```bash
curl -X POST http://127.0.0.1:8000/api/upexcel \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/attendance.xlsx" \
  -F "year=2024" \
  -F "month=10"
```

**Run the payroll aggregation for a file**

```bash
curl http://127.0.0.1:8000/api/process/42/combined-data \
  -H "Authorization: Bearer <token>"
```

**Send a payslip email with a custom PDF**

```bash
curl -X POST http://127.0.0.1:8000/api/send-payslip \
  -H "Authorization: Bearer <token>" \
  -F "email=employee@example.com" \
  -F "name=Jane Doe" \
  -F "subject=October Payslip" \
  -F 'payslipData={"net_salary":150000,"month":"Oct-2024"}' \
  -F 'companyData={"name":"Ultimate Engineering"}' \
  -F "attachPdf=true" \
  -F "customPdf=@/tmp/custom-payslip.pdf"
```

---

## 3. Frontend Public APIs & Components

Angular uses standalone components with route-based lazy instantiation. Every public component listed below is routable (see `frontend/src/app/app.routes.ts`) or globally reusable (services, guards, layout pieces).

### 3.1 Shared Configuration & Services

| Artifact | Location | Purpose | Public API |
| --- | --- | --- | --- |
| `apiBaseUrl` | `frontend/src/app/app.config.ts` | Global constant for REST root (`http://127.0.0.1:8000/` by default). | Update to point to staging/prod. All HttpClient calls build URLs via ``${apiBaseUrl}api/...``. |
| `AuthService` | `frontend/src/app/services/auth.service.ts` | Wrapper around `/api/login` etc. | `login(email, password)`, `logout()`, `getUser()`. Returns RxJS `Observable`. |
| `ExcelImportService` | `frontend/src/app/excel-import.service.ts` | Utility to read Excel files on the client using `xlsx`. | `readExcelFile(file: File): Promise<any[]>`. Resolves 2D arrays representing sheet rows. |
| `AuthGuard` | `frontend/src/app/auth.guard.ts` | Route guard checking `localStorage.token`. | `canActivate()` returns boolean, redirects to `/login` when unauthenticated. |
| `DefaultLayoutComponent` | `frontend/src/app/layout/default-layout/...` | Houses sidebar, header, `<router-outlet>`. | Receives children routes defined in `app.routes.ts`. |
| `PopupComponent` | `frontend/src/app/popup/popup.component.ts` | Barebones standalone component for modal-style popups. | Embed via `<app-popup></app-popup>`. Extend template to add custom content. |

**Usage example – AuthService inside a component**

```ts
constructor(private auth: AuthService) {}

onSubmit(form: LoginForm) {
  this.auth.login(form.email, form.password).subscribe({
    next: ({ access_token }) => localStorage.setItem('token', access_token),
    error: () => this.error = 'Invalid credentials'
  });
}
```

### 3.2 Route-to-Component Catalog

All entries below are standalone components declared directly inside `app.routes.ts`. Each description lists the backend APIs it relies on and the key public methods exposed in the TypeScript class.

#### Dashboard & Authentication

- **`DashboardComponent` (`/dashboard`, `frontend/src/app/views/dashboard/dashboard.component.ts`)**
  - Uses `GET https://laravel.ueshr.ultimate.lk/api/dashboard/counts` (production host baked into the component) to populate admin/employee/event/leave counts and drives CoreUI charts via `DashboardChartsData`.
  - Key methods: `ngOnInit`, `fetchCounts`, `setTrafficPeriod`, `updateChartOnColorModeChange`.

- **`LoginComponent` / `RegisterComponent` (`/login`, `/register`)**
  - Located under `frontend/src/app/pages/...`. Both components submit credentials via `AuthService.login` or call backend registration endpoints.
  - Provide form validation helpers and store tokens in `localStorage`.

#### Master Data Module (`frontend/src/app/master/*`)

All master components follow the same CRUD template:

| Component (Route) | Backend APIs | Key Methods |
| --- | --- | --- |
| `MachineComponent` (`/machine`) | `/api/machine` | `getAllMachines`, `save`, `register`, `updateRecords`, `deleteRecord`. |
| `EmployeeComponent` (`/employee`) | `/api/tblemployees`, plus lookups for shifts/departments | `getAllEmployees`, `saveEmployee`, `deleteEmployee`, form validation helpers. |
| `CompanyComponent` (`/company`) | `/api/company`, `/api/company/update/{id}` | Handles logo uploads; methods include `loadCompany`, `uploadLogo`, `save`. |
| `ShiftComponent` (`/shift`) | `/api/shift` | Manage start/end times; `loadShifts`, `saveShift`. |
| `DepartmentComponent` (`/department`) | `/api/tbldepartments` | `getAllDepartments`, `openAddModal`, `save`, `deleteDepartment`. |
| `PositionComponent` (`/position`) | `/api/position` | `fetchPositions`, `savePosition`, `deletePosition`. |
| `GenderComponent` (`/gender`) | `/api/gender` | `loadGenders`, `saveGender`. |
| `HolidayComponent` (`/holiday`) | `/api/events` | Maintains calendar events; includes `getEvents`, `saveEvent`, `deleteEvent`. |
| `CalendarComponent` (`/calendar`) | `/api/events` | Monthly view aggregator with filtering. |
| `AddallowancesComponent` (`/addallowances`) | `/api/addallowance` | Manage allowance types. |
| `AdddeductionsComponent` (`/adddeductions`) | `/api/adddeduction` | Manage deduction types. |
| `LateComponent` (`/late`) | `/api/late` | Defines lateness bands. |

All of the above expose `resetForm`, `alertSuccess`, `alertError`, and DOM-centric helpers (`openAddModal`, `closeModal`, etc.), making them easy to embed elsewhere. Each component is declared as `standalone: true`, so you can reuse them inside other routes templates: `<app-department></app-department>`.

#### Leave Module (`frontend/src/app/leave/*`)

| Component | Route | Responsibilities | APIs |
| --- | --- | --- | --- |
| `LeaveTypeComponent` | `/typeleave` | CRUD for leave types, including descriptive metadata. | `/api/leavetypes` |
| `ManageLeaveComponent` | `/manageleave` | Create/update leave requests, show history, triggers approval status changes. | `/api/leave`, `/api/leaveday`, `/api/leaveapprove`, `/api/tblemployees` |
| `LeavedayComponent` | `/leaveday` | Manage AM/PM/Full-day value definitions used in leave calculations. | `/api/leaveday` |
| `AllocationComponent` | `/allocation` | Assign per-employee leave quotas by year/type. | `/api/allocation`, `/api/leavetypes`, `/api/tblemployees` |

Key class methods include `loadLeaves`, `saveLeave`, `updateLeaveStatus`, `deleteLeave`, plus form-state helpers paralleling the master module.

#### Shift & Attendance Module (`frontend/src/app/shift/*`, `day/week`, `attendance/parameter`, `approve/leaveapproval`)

| Component | Route | Purpose | APIs |
| --- | --- | --- | --- |
| `EmpshiftComponent` | `/empshift` | Manage shift templates (name + description). | `/api/empshift` |
| `ShiftlineComponent` | `/shiftline` | Configure day-by-day start/half/end times for each EmpShift. | `/api/shiftline`, `/api/week`, `/api/typeshift` |
| `TypeshiftComponent` | `/typeshift` | Manage shift categories (e.g., Day/Night). | `/api/typeshift` |
| `WeekComponent` | `/week` | Manage textual description for `week` table entries. | `/api/week` |
| `ParameterComponent` | `/parameter` | Manage attendance/payroll constants (work days, EPF, OT). | `/api/parameter` |
| `LeaveApprovalComponent` | `/leaveapproval` | Manage approver list used by Manage Leave. | `/api/leaveapprove` |

Each TS class exposes `getAllX`, `save`, `updateRecords`, and `deleteRecord` methods in parity with backend endpoints.

#### Payroll Module (`frontend/src/app/payroll/*`, `payroll/salary/*`)

| Component | Route | Description | APIs |
| --- | --- | --- | --- |
| `PayrollComponent` | `/payroll` | Displays payroll rows, supports filtering by `person_id`, editing, deleting. | `/api/payrolls`, `/api/payroll/{empId}` |
| `SalaryComponent` | `/salary` | Aggregates allowances/deductions & net salary calculations. | `/api/payrolls`, `/api/allowances`, `/api/deductions` |
| `AllowancesComponent` | `/allowances` | Manage per-employee allowances; ties into `Addallowances`. | `/api/allowances`, `/api/addallowance`, `/api/tblemployees` |
| `DeductionsComponent` | `/deducations` (typo in route path) | Manage per-employee deductions. | `/api/deductions`, `/api/adddeduction` |
| `SpecialComponent` | `/special` | UI for manual attendance incentive overrides and combined data lookups. | `/api/special`, `/api/special-new/combined-data/...` |

Key methods: `fetchPayrolls`, `savePayroll`, `getAllowances`, `openSpecialModal`, `recalculateIncentive` (client-side logic layered atop the backend).

#### Upload & Reporting Module (`frontend/src/app/upload/*`)

| Component | Route | Core Flows | APIs Used |
| --- | --- | --- | --- |
| `UpexcelComponent` | `/upexcel` | Upload Excel files, list uploaded months, delete files. Provides `uploadFile`, `fetchAvailableFiles`, `deleteFile`. | `/api/upexcel`, `/api/uploaded_files`, `/api/uploaded_files/{id}/delete` |
| `ReportComponent` | `/report` | Visualize aggregated attendance/performance data for a selected file. | `/api/process/{id}/combined-data`, `/api/uploaded_files` |
| `ViewComponent` | `/view` | Browser for raw `upexcel` rows filtered by `year` & `month`. | `/api/uploaded_files/{fileId}/view` |
| `ViewFileComponent` | `/view-file` | Manual adjustments to attendance records, includes `storeSingleRecord`, `storeMonthRecord`, `deleteRecords`. | `/api/uploaded_files/{fileId}/view/...` |
| `ProcessComponent` | `/process` | Steps through post-upload payroll processing and writes `processreport`. | `/api/processreport`, `/api/process/{fileId}/combined-data` |
| `SlipComponent` | `/slip` | Generates printable payslip previews. | `/api/payslip`, `/api/tblemployees`, `/api/payrolls` |
| `SlipmailComponent` | `/slipmail` | UI for `POST /api/send-payslip` (supports attachments). | `/api/send-payslip` |
| `YearreportComponent` | `/yeareport` | Query + export `process_reports` data by year/month. | `/api/yeareport` |
| `AdrecordComponent` | `/adrecord` | Manual attendance record adjustments (ties into ViewFile). | `/api/uploaded_files/{fileId}/view/single-record` |

These components often share helper functions to open/close modals, manage file selection, and show toast notifications. `UpexcelComponent` also interacts with the Angular `Router` via `navigateToUploadedFiles`.

#### Assets Module (`frontend/src/app/assetmas/*`)

| Component | Route | Description | APIs |
| --- | --- | --- | --- |
| `AssetsComponent` | `/assets` | CRUD for company assets. | `/api/assets` |
| `AstallocationComponent` | `/astallocation` | Assigns assets to employees, surfaces active allocations. | `/api/assetallocation`, `/api/tblemployees`, `/api/assets` |

#### Other Routes

- **`AdminComponent` (`/admin`)** – Manage admin users (username/email/password) via `/api/admin`.
- **`UserComponent` (`/user`)** – Manage non-admin user profiles (tied to `/api/tblemployees` and `/api/auth`). File located at `frontend/src/app/user`.
- **`WeekComponent`, `ParameterComponent`, `LateComponent`** – Already documented within modules but also directly routable.
- **`PopupComponent`** – Not a route, but used inside several modals as a reusable placeholder.

All component TS files expose intuitive method names that align directly with backend actions (`register`, `updateRecords`, `deleteRecord`, `getAllX`). When embedding these components into new templates, ensure the required Bootstrap modal markup and `#id` hooks (e.g., `addDepartmentModal`) are present, as methods rely on `document.getElementById(...)`.

### 3.3 Component Usage Examples

**Embed the Department CRUD UI inside another view**

```html
<!-- host.component.html -->
<section>
  <h2>Organization Units</h2>
  <app-department></app-department>
</section>
```

Because `DepartmentComponent` is standalone, no NgModule wiring is needed. Angular will tree-shake unused `FormsModule`/`CommonModule` imports declared on the component itself.

**Trigger a payslip email from the Slipmail component**

1. Fill the Slipmail form (employee email, subject, attachment toggle).
2. Component calls:
   ```ts
   this.http.post(`${apiBaseUrl}api/send-payslip`, formData).subscribe(...)
   ```
3. Backend `PayslipController::sendPayslip` renders `SlipMail` and returns `{ message: 'Payslip sent successfully' }` on success.

### 3.4 End-to-End Flow Recipes

1. **Onboard a new department and assign employees**
   1. Authenticate and store the JWT token on the browser (`AuthService.login`).
   2. Navigate to `/department` (`DepartmentComponent`).
   3. Use the “Add Department” modal → triggers `POST /api/tbldepartments`.
   4. Open `/employee` and edit employees, selecting the new department from the autocomplete bound to `/api/tbldepartments`.

2. **Import attendance and run payroll**
   1. Go to `/upexcel`, upload the monthly spreadsheet (calls `POST /api/upexcel` and creates an entry in `uploaded_files`).
   2. Visit `/view` or `/view-file` to inspect and patch automatic entries (`ViewFileController` endpoints).
   3. Open `/process` and request `GET /api/process/{fileId}/combined-data` to view KPIs.
   4. Persist the summary via `/api/processreport` or `/api/yeareport`.
   5. Navigate to `/salary` or `/payroll` to review results before issuing payslips.

3. **Send payslips in bulk**
   1. On `/slip`, preview employees’ data (driven by `/api/payslip` + `/api/payrolls`).
   2. Switch to `/slipmail` and submit the email form with `attachPdf=true`.
   3. Backend generates and emails PDF attachments through `SlipMail`.

4. **Manage asset handovers**
   1. Register assets via `/assets` (`POST /api/assets`).
   2. Allocate via `/astallocation` (`POST /api/assetallocation`).
   3. On return, edit the allocation and fill `handover_date`; API responds with the updated object including linked employee and asset.

---

## 4. Testing & Observability

- **Manual testing** – use `Postman` or `curl` against the documented endpoints. Ensure a valid JWT is stored in `localStorage` before hitting guarded Angular routes.
- **Logging** – backend controllers log errors via `Log::error` (e.g., Admin CRUD, `ViewFileController`). Tail `storage/logs/laravel.log` when debugging uploads or mail.
- **Known Limitations**
  - Hard-coded production URL in `DashboardComponent.fetchCounts()`.
  - Missing implementation for `special/recalculate-attendance-incentive`.
  - Duplicate `Route::post('/send-mail', ...)` vs `Route::apiResource('send-mail', ...)`. Decide which one to keep.

Keeping this document up to date:

1. Add new REST endpoints to the summary table in §2.2.
2. Document new frontend services/components under §3 (include path, route, APIs).
3. Provide at least one example request whenever you add a non-CRUD endpoint.

---

**Revision**: Generated on 2025-11-18 from branch `cursor/generate-comprehensive-api-documentation-eaa9`. Update the timestamp when making changes.
