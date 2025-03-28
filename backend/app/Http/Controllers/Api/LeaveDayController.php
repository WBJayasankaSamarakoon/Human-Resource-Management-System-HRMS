<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveDay;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeaveDayController extends Controller
{
    // Display a listing of leave days
    public function index(): JsonResponse
    {
        $leaveDays = LeaveDay::all();
        return response()->json($leaveDays, 200);
    }

    // Store a newly created leave day
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Value' => 'nullable|numeric',
        ]);

        $leaveDay = LeaveDay::create($validated);
        return response()->json($leaveDay, 201);
    }

    // Display the specified leave day
    public function show($id): JsonResponse
    {
        $leaveDay = LeaveDay::find($id);

        if (!$leaveDay) {
            return response()->json(['error' => 'Leave Day not found'], 404);
        }

        return response()->json($leaveDay, 200);
    }

    // Update the specified leave day
    public function update(Request $request, $id): JsonResponse
    {
        $leaveDay = LeaveDay::find($id);

        if (!$leaveDay) {
            return response()->json(['error' => 'Leave Day not found'], 404);
        }

        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Value' => 'nullable|numeric',
        ]);

        $leaveDay->update($validated);
        return response()->json($leaveDay, 200);
    }

    // Remove the specified leave day
    public function destroy($id): JsonResponse
    {
        $leaveDay = LeaveDay::find($id);

        if (!$leaveDay) {
            return response()->json(['error' => 'Leave Day not found'], 404);
        }

        $leaveDay->delete();
        return response()->json(['message' => 'Leave Day deleted successfully'], 200);
    }
}
