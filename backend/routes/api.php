<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MachineController;
use App\Http\Controllers\Api\TblemployeesController;
use App\Http\Controllers\Api\TbldepartmentsController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\SalaryStructureController;
use App\Http\Controllers\Api\LeaveTypeController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;

Route::apiResource('machine', MachineController::class);
Route::apiResource('tblemployees', TblemployeesController::class);
Route::apiResource('tbldepartments', TbldepartmentsController::class);
Route::apiResource('company', CompanyController::class);
Route::apiResource('gender', GenderController::class);
Route::apiResource('event', EventController::class);
Route::apiResource('position', PositionController::class);
Route::apiResource('shift', ShiftController::class);
Route::apiResource('salarystructure', SalaryStructureController::class);
Route::apiResource('leavetypes', LeaveTypeController::class);
Route::apiResource('attendance', AttendanceController::class);
Route::apiResource('admin', AdminController::class);




Route::get('/test', function () {
    return response()->json(['message' => 'API working successfully'], 200);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
