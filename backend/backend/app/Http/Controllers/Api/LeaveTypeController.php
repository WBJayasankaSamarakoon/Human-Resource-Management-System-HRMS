<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeaveTypeController extends Controller
{
    // Display a listing of leave types
    public function index(): JsonResponse
    {
        $leaveTypes = LeaveType::all();
        return response()->json($leaveTypes, 200);
    }

    // Store a newly created leave type
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'LeaveType' => 'required|string|max:200',
            'Description' => 'nullable|string',
        ]);

        $leaveType = LeaveType::create($request->all());
        return response()->json($leaveType, 201);
    }

    // Display the specified leave type
    public function show($id): JsonResponse
    {
        $leaveType = LeaveType::find($id);

        if (!$leaveType) {
            return response()->json(['error' => 'LeaveType not found'], 404);
        }

        return response()->json($leaveType, 200);
    }

    // Update the specified leave type
    public function update(Request $request, $id): JsonResponse
    {
        $leaveType = LeaveType::find($id);

        if (!$leaveType) {
            return response()->json(['error' => 'LeaveType not found'], 404);
        }

        $request->validate([
            'LeaveType' => 'required|string|max:200',
            'Description' => 'nullable|string',
        ]);

        $leaveType->update($request->all());
        return response()->json($leaveType, 200);
    }

    // Remove the specified leave type
    public function destroy($id): JsonResponse
    {
        $leaveType = LeaveType::find($id);

        if (!$leaveType) {
            return response()->json(['error' => 'LeaveType not found'], 404);
        }

        $leaveType->delete();
        return response()->json(['message' => 'LeaveType deleted successfully'], 200);
    }
}
