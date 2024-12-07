<?php

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
    ViewFileController
};

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

// Dashboard Routes
Route::get('/dashboard/counts', [DashboardController::class, 'getCounts']);

// Payroll Routes
Route::get('payrolls', [PayrollController::class, 'index']);
Route::get('payrolls/by-empid/{empId}', [PayrollController::class, 'getPayrollByEmpId']);

// File Upload Routes
Route::group(['prefix' => 'uploaded_files'], function () {
    Route::get('{id}/view', [UpexcelController::class, 'viewFile']);
    Route::delete('{id}/delete', [UpexcelController::class, 'deleteFile']);
    Route::get('{fileId}/view', [ViewFileController::class, 'viewFile']);
    Route::get('{fileId}/view/combined-data', [ViewFileController::class, 'getCombinedData']);
});

// Process Routes
Route::get('process/{id}/combined-data', [ProcessController::class, 'getCombinedData'])->name('process.combinedData');

// Test Route
Route::get('/test', function () {
    return response()->json(['message' => 'API working successfully'], 200);
});
