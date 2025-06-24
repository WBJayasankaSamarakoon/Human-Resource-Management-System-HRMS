<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    // Get all leaves along with related employee, leave type, and leaveday
    public function index()
    {
        // Eager load employee, leaveType, leaveapprove, and leaveday relationships
        $leaves = Leave::with(['employee', 'leaveType', 'leaveapprove', 'leaveday'])->get();

        return response()->json($leaves);
    }

    // Store a new leave record
    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'employee_id' => 'required|exists:tblemployees,id',
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'approve' => 'required|in:1,2,3',
            'leaveday_id' => 'required|exists:leaveday,id',
        ]);

        // Create a new leave record
        $leave = Leave::create([
            'employee_id' => $request->employee_id,
            'leave_type_id' => $request->leave_type_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'approve' => $request->approve,
            'leaveday_id' => $request->leaveday_id,
        ]);

        // Return newly created leave record
        return response()->json($leave, 201);
    }

    // Update an existing leave record
    public function update(Request $request, $id)
    {
        $leave = Leave::find($id);

        if (!$leave) {
            return response()->json(['message' => 'Leave record not found'], 404);
        }

        // Validate the incoming data
        $request->validate([
            'employee_id' => 'required|exists:tblemployees,id',
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'approve' => 'required|in:1,2,3',
            'leaveday_id' => 'required|exists:leaveday,id',
        ]);

        // Update leave record
        $leave->update([
            'employee_id' => $request->employee_id,
            'leave_type_id' => $request->leave_type_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'approve' => $request->approve,
            'leaveday_id' => $request->leaveday_id,
        ]);

        // Return updated leave record
        return response()->json($leave);
    }

    // Delete a leave record
    public function destroy($id)
    {
        $leave = Leave::find($id);

        if (!$leave) {
            return response()->json(['message' => 'Leave record not found'], 404);
        }

        // Delete the leave record
        $leave->delete();

        return response()->json(['message' => 'Leave record deleted successfully']);
    }

     // New method to count approved leaves for a specific employee, year, and month
     public function count(Request $request)
     {
         // Validate the request
         $request->validate([
             'employee_id' => 'required|exists:tblemployees,id',
             'year' => 'required|integer',
             'month' => 'required|integer|between:1,12',
         ]);

         // Get employee ID, year, and month from the request
         $employeeId = $request->query('employee_id');
         $year = $request->query('year');
         $month = $request->query('month');

         // Count approved leaves for the given employee, year, and month
         $leaveCount = Leave::where('employee_id', $employeeId)
             ->whereYear('start_date', $year)
             ->whereMonth('start_date', $month)
             ->where('approve', 1)
             ->count();

         return response()->json(['leave_count' => $leaveCount], 200);
     }
 }
