<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmpShift;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmpShiftController extends Controller
{
    // Display a listing of emp shifts
    public function index(): JsonResponse
    {
        $shifts = EmpShift::all();
        return response()->json($shifts, 200);
    }

    // Store a newly created emp shift
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Description' => 'nullable|string|max:50',
        ]);

        $shift = EmpShift::create($validated);
        return response()->json($shift, 201);
    }

    // Display the specified emp shift
    public function show($id): JsonResponse
    {
        $shift = EmpShift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'EmpShift not found'], 404);
        }

        return response()->json($shift, 200);
    }

    // Update the specified emp shift
    public function update(Request $request, $id): JsonResponse
    {
        $shift = EmpShift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'EmpShift not found'], 404);
        }

        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Description' => 'nullable|string|max:50',
        ]);

        $shift->update($validated);
        return response()->json($shift, 200);
    }

    // Remove the specified emp shift
    public function destroy($id): JsonResponse
    {
        $shift = EmpShift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'EmpShift not found'], 404);
        }

        $shift->delete();
        return response()->json(['message' => 'EmpShift deleted successfully'], 200);
    }
}
