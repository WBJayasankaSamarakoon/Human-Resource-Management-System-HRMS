<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ShiftController extends Controller
{
    // Display a listing of shifts
    public function index(): JsonResponse
    {
        $shifts = Shift::all();
        return response()->json($shifts, 200);
    }

    // Store a newly created shift
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'StartTime' => 'required|date_format:H:i',
            'EndTime' => 'required|date_format:H:i',
            'Week' => 'required|string|max:10',
        ]);

        $shift = Shift::create($request->all());
        return response()->json($shift, 201);
    }

    // Display the specified shift
    public function show($id): JsonResponse
    {
        $shift = Shift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'Shift not found'], 404);
        }

        return response()->json($shift, 200);
    }

    // Update the specified shift
    public function update(Request $request, $id): JsonResponse
    {
        $shift = Shift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'Shift not found'], 404);
        }

        $request->validate([
            'StartTime' => 'required|date_format:H:i',
            'EndTime' => 'required|date_format:H:i',
            'Week' => 'required|string|max:10',
        ]);

        $shift->update($request->all());

        return response()->json($shift, 200);
    }

    // Remove the specified shift
    public function destroy($id): JsonResponse
    {
        $shift = Shift::find($id);

        if (!$shift) {
            return response()->json(['error' => 'Shift not found'], 404);
        }

        $shift->delete();

        return response()->json(['message' => 'Shift deleted successfully'], 200);
    }
}
