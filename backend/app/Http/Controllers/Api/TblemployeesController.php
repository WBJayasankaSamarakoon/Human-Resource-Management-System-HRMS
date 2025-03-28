<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tblemployee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TblemployeesController extends Controller
{
    // Display a listing of employees
    public function index(): JsonResponse
    {
        $employees = Tblemployee::with('empshift')->get();
        return response()->json($employees, 200);
    }

    // Store a newly created employee
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'EmpId' => 'required|numeric|unique:tblemployees,EmpId',
            'NameWithInitials' => 'required|string|max:255',
            'EPFNumber' => 'nullable|string|max:100',
            'EpfEligible' => 'nullable|boolean',
            'Phone' => 'nullable|string|max:20',
            'CurrentAddress' => 'nullable|string',
            'PermanentAddress' => 'nullable|string',
            'PersonalEmail' => 'nullable|email|max:255',
            'CompanyEmail' => 'nullable|email|max:255',
            'DateOfJoining' => 'nullable|date',
            'Status' => 'nullable|in:Active,Inactive,Suspended,Left',
            'Salutation' => 'nullable|in:Mr,Ms,Mrs',
            'Designation' => 'nullable|string|max:100',
            'Branch' => 'nullable|string|max:100',
            'Department' => 'nullable|string|max:100',
            'Company' => 'nullable|string|max:100',
            'ReportsTo' => 'nullable|string|max:100',
            'EmploymentType' => 'nullable|in:Intern,Full-time,Part-time,Contract',
            'EmergencyContactName' => 'nullable|string|max:255',
            'EmergencyPhone' => 'nullable|string|max:20',
            'Relation' => 'nullable|string|max:100',
            'DefaultShift' => 'required|exists:empshift,id',
        ]);

        // Create employee
        $employee = Tblemployee::create($request->all());
        return response()->json($employee, 201);
    }

    // Display the specified employee
    public function show($id): JsonResponse
    {
        $employee = Tblemployee::find($id);

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        return response()->json($employee, 200);
    }

    // Update the specified employee
    public function update(Request $request, $id): JsonResponse
    {
        $employee = Tblemployee::find($id);

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        $request->validate([
            'EmpId' => 'required|numeric|unique:tblemployees,EmpId,' . $id,
            'NameWithInitials' => 'required|string|max:255',
            'EPFNumber' => 'nullable|string|max:100',
            'EpfEligible' => 'nullable|boolean',
            'Phone' => 'nullable|string|max:20',
            'CurrentAddress' => 'nullable|string',
            'PermanentAddress' => 'nullable|string',
            'PersonalEmail' => 'nullable|email|max:255',
            'CompanyEmail' => 'nullable|email|max:255',
            'DateOfJoining' => 'nullable|date',
            'Status' => 'nullable|in:Active,Inactive,Suspended,Left',
            'Salutation' => 'nullable|in:Mr,Ms,Mrs',
            'Designation' => 'nullable|string|max:100',
            'Branch' => 'nullable|string|max:100',
            'Department' => 'nullable|string|max:100',
            'Company' => 'nullable|string|max:100',
            'ReportsTo' => 'nullable|string|max:100',
            'EmploymentType' => 'nullable|in:Intern,Full-time,Part-time,Contract',
            'EmergencyContactName' => 'nullable|string|max:255',
            'EmergencyPhone' => 'nullable|string|max:20',
            'Relation' => 'nullable|string|max:100',
            'DefaultShift' => 'required|exists:empshift,id',
        ]);

        // Update employee
        $employee->update($request->all());
        return response()->json($employee, 200);
    }

    // Remove the specified employee
    public function destroy($id): JsonResponse
    {
        $employee = Tblemployee::find($id);

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
