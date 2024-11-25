<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AttendanceResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AttendanceController extends Controller
{
    // Display a listing of attendance records, with optional filtering by year and month
    public function index(Request $request): JsonResponse
    {
        $query = Attendance::query();

        // Apply filtering if year or month is provided
        if ($request->has('year')) {
            $query->where('year', $request->input('year'));
        }

        if ($request->has('month')) {
            $query->where('month', $request->input('month'));
        }

        $attendances = $query->get();
        return response()->json(AttendanceResource::collection($attendances), 200);
    }

    // Store a newly created array of attendance records
    public function store(Request $request): JsonResponse
    {
        // Check if the request contains a file and data field
        if (!$request->hasFile('file') || !$request->has('data')) {
            return response()->json(['error' => 'File or data missing'], 400);
        }

        // Decode JSON data from 'data' field
        $data = json_decode($request->input('data'), true);

        if (!is_array($data) || empty($data)) {
            return response()->json(['error' => 'No valid data provided'], 400);
        }

        // Define validation rules for each record in the array
        $validationRules = [
            '*.Index' => 'required|integer',
            '*.PersonID' => 'required|integer',
            '*.Name' => 'required|string|max:255',
            '*.Department' => 'nullable|string|max:255',
            '*.Position' => 'nullable|string|max:255',
            '*.Gender' => 'nullable|string|max:10',
            '*.Date' => 'required|date',
            '*.Week' => 'nullable|string|max:10',
            '*.Timetable' => 'nullable|string|max:255',
            '*.CheckIn' => 'nullable|string|max:10',
            '*.CheckOut' => 'nullable|string|max:10',
            '*.Work' => 'nullable|integer',
            '*.OT' => 'nullable|integer',
            '*.Attended' => 'nullable|integer',
            '*.Late' => 'nullable|integer',
            '*.Early' => 'nullable|integer',
            '*.Absent' => 'nullable|integer',
            '*.Leave' => 'nullable|integer',
            '*.Status' => 'nullable|string|max:255',
            '*.Records' => 'nullable|string',
            '*.year' => 'nullable|integer',
            '*.month' => 'nullable|string|max:20',
        ];

        // Validate data array
        $validator = Validator::make($data, $validationRules);
        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'details' => $validator->errors()], 422);
        }

        try {
            // Bulk insert validated data, including year and month
            foreach ($data as &$attendance) {
                // Extract year and month from 'Date' field
                $date = \Carbon\Carbon::parse($attendance['Date']);
                $attendance['year'] = $date->year;
                $attendance['month'] = $date->format('F'); // Or use $date->month for numeric month

                // Optionally, ensure that missing fields are set to null if not provided
                $attendance['year'] = $attendance['year'] ?? null;
                $attendance['month'] = $attendance['month'] ?? null;
            }

            Attendance::insert($data);
            return response()->json(['message' => 'Attendance records uploaded successfully!'], 201);
        } catch (\Exception $e) {
            // Log error for debugging
            Log::error('Data upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload data', 'details' => $e->getMessage()], 500);
        }
    }

    // Display the specified attendance record
    public function show($id): JsonResponse
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['error' => 'Attendance record not found'], 404);
        }

        return response()->json(new AttendanceResource($attendance), 200);
    }

    // Update the specified attendance record
    public function update(Request $request, $id): JsonResponse
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['error' => 'Attendance record not found'], 404);
        }

        // Define the validation rules
        $validatedData = $request->validate([
            'Index' => 'required|integer',
            'PersonID' => 'required|integer',
            'Name' => 'required|string|max:255',
            'Department' => 'nullable|string|max:255',
            'Position' => 'nullable|string|max:255',
            'Gender' => 'nullable|string|max:10',
            'Date' => 'required|date',
            'Week' => 'nullable|string|max:10',
            'Timetable' => 'nullable|string|max:255',
            'CheckIn' => 'nullable|date_format:H:i:s',
            'CheckOut' => 'nullable|date_format:H:i:s',
            'Work' => 'nullable|integer',
            'OT' => 'nullable|integer',
            'Attended' => 'nullable|integer',
            'Late' => 'nullable|integer',
            'Early' => 'nullable|integer',
            'Absent' => 'nullable|integer',
            'Leave' => 'nullable|integer',
            'Status' => 'nullable|string|max:255',
            'Records' => 'nullable|string',
            'year' => 'nullable|integer',
            'month' => 'nullable|string|max:20',
        ]);

        // Extract year and month from 'Date' field
        $date = \Carbon\Carbon::parse($validatedData['Date']);
        $validatedData['year'] = $date->year;
        $validatedData['month'] = $date->format('F'); // Or use $date->month for numeric month

        // Update the attendance record with the validated data
        $attendance->update($validatedData);

        return response()->json(new AttendanceResource($attendance), 200);
    }

    // Remove the specified attendance record
    public function destroy($id): JsonResponse
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['error' => 'Attendance record not found'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Attendance record deleted successfully'], 200);
    }
}
