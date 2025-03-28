<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShiftLine;
use Illuminate\Http\Request;

class ShiftLineController extends Controller
{
    public function index()
    {
        // Retrieve all shift lines with related empshift and week data
        $shiftLines = ShiftLine::with(['empshift', 'week', 'typeshift'])->get();
        return response()->json($shiftLines);
    }

    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'empshift_id' => 'required|exists:empshift,id',
            'StartTime' => 'required|date_format:H:i',
            'HalfTime' => 'nullable|date_format:H:i',
            'EndTime' => 'required|date_format:H:i',
            'Day' => 'required|exists:week,id',
            'Name' => 'required|exists:typeshift,id',
        ]);

        // Create a new ShiftLine record
        $shiftLine = ShiftLine::create($validated);

        // Return the newly created ShiftLine record with related week data
        return response()->json($shiftLine->load('empshift', 'week', 'typeshift'), 201);
    }

    public function update(Request $request, $id)
{
    // Find the ShiftLine record
    $shiftline = ShiftLine::find($id);

    if (!$shiftline) {
        return response()->json(['message' => 'ShiftLine record not found'], 404);
    }

    // Validate the incoming data
    $validated = $request->validate([
        'empshift_id' => 'required|exists:empshift,id',
        'StartTime' => 'required|date_format:H:i:s',
        'HalfTime' => 'nullable|date_format:H:i:s',
        'EndTime' => 'required|date_format:H:i:s',
        'Day' => 'required|exists:week,id',
        'Name' => 'required|exists:typeshift,id',
    ]);

    // Format times to include seconds if they don't
    $validated['StartTime'] = $this->formatTimeWithSeconds($validated['StartTime']);
    $validated['EndTime'] = $this->formatTimeWithSeconds($validated['EndTime']);
    if (!empty($validated['HalfTime'])) {
        $validated['HalfTime'] = $this->formatTimeWithSeconds($validated['HalfTime']);
    }

    // Update the ShiftLine record
    $shiftline->update($validated);

    // Return the updated ShiftLine record with related week data
    return response()->json($shiftline->load('empshift', 'week', 'typeshift'));
}

// Helper function to ensure time has seconds
private function formatTimeWithSeconds($time)
{
    if (strlen($time) === 5) { // If format is H:i
        return $time . ':00'; // Add seconds
    }
    return $time;
}

    public function destroy($id)
    {
        // Find the ShiftLine record
        $shiftline = ShiftLine::find($id);

        if (!$shiftline) {
            return response()->json(['message' => 'ShiftLine record not found'], 404);
        }

        // Delete the ShiftLine record
        $shiftline->delete();

        return response()->json(['message' => 'ShiftLine record deleted successfully']);
    }
}
