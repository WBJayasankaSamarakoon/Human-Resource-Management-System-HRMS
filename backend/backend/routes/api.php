<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Import Controllers
use App\Http\Controllers\Api\MachineController;
use App\Http\Controllers\Api\TblemployeesController;
use App\Http\Controllers\Api\TbldepartmentsController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\EventsController;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\SalaryStructureController;
use App\Http\Controllers\Api\LeaveTypeController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UpexcelController;
use App\Http\Controllers\Api\UploadedFileController;
use App\Http\Controllers\Api\PayrollController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LeaveController;


// Import AuthController
use App\Http\Controllers\Api\AuthController;

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);


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
Route::get('/dashboard/counts', [DashboardController::class, 'getCounts']);
Route::apiResource('leave', LeaveController::class);
Route::post('/payrolls/add-column', [PayrollController::class, 'addColumn']);


// Upexcel Specific Routes for Viewing and Deleting Files and Related Data
Route::get('/uploaded_files/{id}/view', [UpexcelController::class, 'viewFile']);
Route::delete('/uploaded_files/{id}/delete', [UpexcelController::class, 'deleteFile']);

// Test Route
Route::get('/test', function () {
    return response()->json(['message' => 'API working successfully'], 200);
});
