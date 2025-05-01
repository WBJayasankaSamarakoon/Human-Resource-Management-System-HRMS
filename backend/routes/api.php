<?php

use App\Mail\SlipMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

// Import Controllers
use App\Http\Controllers\Api\{
    MachineController,
    TblemployeesController,
    TbldepartmentsController,
    CompanyController,
    GenderController,
    EventsController,
    PositionController,
    ShiftController,
    SalaryStructureController,
    LeaveTypeController,
    AdminController,
    UpexcelController,
    UploadedFileController,
    PayrollController,
    DashboardController,
    LeaveController,
    AuthController,
    ProcessController,
    ViewFileController,
    PayslipController,
    EmpShiftController,
    ShiftLineController,
    WeekController,
    TypeShiftController,
    LeaveApproveController,
    AllowancesController,
    DeductionsController,
    ParameterController,
    AddallowanceController,
    AdddeductionController,
    LeaveDayController,
    SpecialController,
    LateController,
    AllocationController,
};
use App\Models\Addallowance;
use App\Models\Adddeduction;

// Authentication Routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::post('/profile', [AuthController::class, 'profile'])->middleware('auth:api');
});

// API Resource Routes
Route::apiResource('machine', MachineController::class);
Route::apiResource('tblemployees', TblemployeesController::class);
Route::apiResource('tbldepartments', TbldepartmentsController::class);
Route::apiResource('company', CompanyController::class);
Route::apiResource('gender', GenderController::class);
Route::apiResource('events', EventsController::class);
Route::apiResource('position', PositionController::class);
Route::apiResource('shift', ShiftController::class);
Route::apiResource('salarystructure', SalaryStructureController::class);
Route::apiResource('leavetypes', LeaveTypeController::class);
Route::apiResource('admin', AdminController::class);
Route::apiResource('upexcel', UpexcelController::class);
Route::apiResource('uploaded_files', UploadedFileController::class)->except(['create', 'edit']);
Route::apiResource('payrolls', PayrollController::class);
Route::apiResource('leave', LeaveController::class);
Route::apiResource('payslip', PayslipController::class);
Route::apiResource('empshift', EmpShiftController::class);
Route::apiResource('shiftline', ShiftLineController::class);
Route::apiResource('week', WeekController::class);
Route::apiResource('typeshift', TypeShiftController::class);
Route::apiResource('leaveapprove', LeaveApproveController::class);
Route::apiResource('allowances', AllowancesController::class);
Route::apiResource('deductions', DeductionsController::class);
Route::apiResource('parameter', ParameterController::class);
Route::apiResource('addallowance', AddallowanceController::class);
Route::apiResource('adddeduction', AdddeductionController::class);
Route::apiResource('leaveday', LeaveDayController::class);
Route::apiResource('special', SpecialController::class);
Route::apiResource('late', LateController::class);
Route::apiResource('allocation', AllocationController::class);


// Mail Sent Payslip
Route::post('/send-payslip', [PayslipController::class, 'sendPayslip']);

Route::post('/company/update/{id}', [CompanyController::class, 'update']);


// Route::post('/send-slip', function (Request $request) {
//     $validated = $request->validate([
//         'email' => 'required|email',
//         'slipData' => 'required|array',
//     ]);

//     Mail::to($validated['email'])->send(new SlipMail($validated['slipData']));

//     return response()->json(['message' => 'Payslip sent successfully!']);
// });

// Dashboard Routes
Route::get('/dashboard/counts', [DashboardController::class, 'getCounts']);


// Spwcial Instrction Routes
Route::get('/combined-data{id}', [SpecialController::class, 'getCombinedData1']);
Route::get('/special-new/combined-data/{emp_id}/{month}/{year}', [SpecialController::class, 'getCombinedData1']);
    // ->where(['emp_id' => '[0-9]+', 'month' => '[0-9]+', 'year' => '[0-9]+']);
// Route::get('/special/recalculate-attendance-incentive', [SpecialController::class, 'recalculateAttendanceIncentive']);
Route::get('special/recalculate-attendance-incentive/{emp_id}/{payment_date}/{type}', [SpecialController::class, 'recalculateAttendanceIncentive']);


// Payroll Routes
Route::get('payrolls', [PayrollController::class, 'index']);
Route::post('payrolls', [PayrollController::class, 'store']);
Route::put('payrolls/{id}', [PayrollController::class, 'update']);
Route::delete('payrolls/{id}', [PayrollController::class, 'destroy']);
Route::get('payroll/{empId}', [PayrollController::class, 'getPayrollByEmpId']);
//Route::get('payrolls/by-empid/{empId}', [PayrollController::class, 'getPayrollByEmpId']);


// File Upload Routes
Route::group(['prefix' => 'uploaded_files'], function () {
    Route::get('{id}/view', [UpexcelController::class, 'viewFile']);
    Route::delete('{id}/delete', [UpexcelController::class, 'deleteFile']);
    Route::get('{fileId}/view', [ViewFileController::class, 'viewFile']);
    Route::get('{fileId}/view/combined-data', [ViewFileController::class, 'getCombinedData']);
    // routes/api.php
    Route::post('{fileId}/view/month-record', [ViewFileController::class, 'storeMonthRecord']);
    Route::post('{fileId}/view/single-record', [ViewFileController::class, 'storeSingleRecord']);
});

// Add this route for deleting records
Route::post('/uploaded_files/{fileId}/view/delete-records', [ViewFileController::class, 'deleteRecords']);

// Route::get('uploaded_files1/getCombinedData', [ViewFileController::class, 'getCombinedData']);

// Process Routes
Route::get('process/{id}/combined-data', [ProcessController::class, 'getCombinedData'])->name('process.combinedData');

// Test Route
Route::get('/test', function () {
    return response()->json(['message' => 'API working successfully'], 200);
});
Route::get('/greeting', function () {
    return response()->json(['message' => 'API working successfully'], 200);
});

