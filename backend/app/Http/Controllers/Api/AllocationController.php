<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Allocation;
use Illuminate\Http\Request;

class AllocationController extends Controller
{
    // Get all allocations
    public function index()
    {
        // Eager load relationships if you have them (optional)
        $allocations = Allocation::with(['employee', 'leaveType'])->get();

        return response()->json($allocations);
    }

    // Store a new allocation record
    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'employee_id' => 'required|exists:tblemployees,id',
            'year' => 'required|integer|min:1900|max:2100',
            'leave_type_id' => 'required|exists:leave_types,id',
            'leave_count' => 'required|integer|min:0',
        ]);

        // Create a new allocation record
        $allocation = Allocation::create([
            'employee_id' => $request->employee_id,
            'year' => $request->year,
            'leave_type_id' => $request->leave_type_id,
            'leave_count' => $request->leave_count,
        ]);

        return response()->json($allocation, 201);
    }

    // Update an existing allocation record
    public function update(Request $request, $id)
    {
        $allocation = Allocation::find($id);

        if (!$allocation) {
            return response()->json(['message' => 'Allocation record not found'], 404);
        }

        // Validate the incoming data
        $request->validate([
            'employee_id' => 'required|exists:tblemployees,id',
            'year' => 'required|integer|min:1900|max:2100',
            'leave_type_id' => 'required|exists:leave_types,id',
            'leave_count' => 'required|integer|min:0',
        ]);

        // Update allocation record
        $allocation->update([
            'employee_id' => $request->employee_id,
            'year' => $request->year,
            'leave_type_id' => $request->leave_type_id,
            'leave_count' => $request->leave_count,
        ]);

        return response()->json($allocation);
    }

    // Delete an allocation record
    public function destroy($id)
    {
        $allocation = Allocation::find($id);

        if (!$allocation) {
            return response()->json(['message' => 'Allocation record not found'], 404);
        }

        $allocation->delete();

        return response()->json(['message' => 'Allocation record deleted successfully']);
    }

    // Count allocated leave for a specific employee and year
    public function count(Request $request)
    {
        // Validate the request
        $request->validate([
            'employee_id' => 'required|exists:tblemployees,id',
            'year' => 'required|integer|min:1900|max:2100',
        ]);

        $employeeId = $request->query('employee_id');
        $year = $request->query('year');

        $totalAllocatedLeave = Allocation::where('employee_id', $employeeId)
            ->where('year', $year)
            ->sum('leave_count');

        return response()->json(['total_allocated_leave' => $totalAllocatedLeave], 200);
    }
}
