<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tbldepartment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TbldepartmentsController extends Controller
{
    // Display a listing of departments
    public function index(): JsonResponse
    {
        $departments = Tbldepartment::all();
        return response()->json($departments, 200);
    }

    // Store a newly created department
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'DepartmentName' => 'nullable|string|max:150',
            'DepartmentShortName' => 'nullable|string|max:100',
            'DepartmentCode' => 'nullable|string|max:50',
        ]);

        $department = Tbldepartment::create($request->all());
        return response()->json($department, 201); // HTTP 201 for created resource
    }

    // Display the specified department
    public function show($id): JsonResponse
    {
        $department = Tbldepartment::find($id);

        if (!$department) {
            return response()->json(['error' => 'Department not found'], 404);
        }

        return response()->json($department, 200);
    }

    // Update the specified department
    public function update(Request $request, $id): JsonResponse
    {
        $department = Tbldepartment::find($id);

        if (!$department) {
            return response()->json(['error' => 'Department not found'], 404);
        }

        $request->validate([
            'DepartmentName' => 'nullable|string|max:150',
            'DepartmentShortName' => 'nullable|string|max:100',
            'DepartmentCode' => 'nullable|string|max:50',
        ]);

        $department->update($request->all());
        return response()->json($department, 200);
    }

    // Remove the specified department
    public function destroy($id): JsonResponse
    {
        $department = Tbldepartment::find($id);

        if (!$department) {
            return response()->json(['error' => 'Department not found'], 404);
        }

        $department->delete();
        return response()->json(['message' => 'Department deleted successfully'], 200);
    }
}
