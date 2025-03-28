<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deductions;
use Illuminate\Database\QueryException;

class DeductionsController extends Controller
{
    /**
     * Fetch all deductions with employee details.
     */
    public function index(Request $request)
    {
        $empId = $request->query('emp_id');

        // Build the query
        $query = Deductions::with(['employee', 'deductionType']);

        if ($empId) {
            $query->whereHas('employee', function ($query) use ($empId) {
                $query->where('EmpId', $empId);
            });
        }

        $deductions = $query->get();

        return response()->json($deductions);
    }

    /**
     * Store a new deduction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'type' => 'required|integer|exists:adddeduction,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'is_active' => 'required|boolean',
        ]);

        // Create a new deduction record
        $deduction = Deductions::create($request->only(['emp_id', 'type', 'amount', 'payment_date', 'is_active']));

        return response()->json($deduction, 201);
    }

    /**
     * Show a specific deduction record by ID.
     */
    public function show($id)
    {
        $deduction = Deductions::with(['employee', 'deductionType'])->find($id);

        if ($deduction) {
            return response()->json($deduction);
        } else {
            return response()->json(['message' => 'Deduction not found'], 404);
        }
    }

    /**
     * Update an existing deduction record.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'type' => 'required|integer|exists:adddeduction,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'is_active' => 'required|boolean',
        ]);

        $deduction = Deductions::find($id);

        if (!$deduction) {
            return response()->json(['message' => 'Deduction not found'], 404);
        }

        // Update deduction data
        $deduction->update($request->only(['emp_id', 'type', 'amount', 'payment_date', 'is_active']));

        return response()->json($deduction);
    }

    /**
     * Delete a deduction record.
     */
    public function destroy($id)
    {
        try {
            $deduction = Deductions::find($id);

            if (!$deduction) {
                return response()->json(['message' => 'Deduction not found'], 404);
            }

            $deduction->delete();
            return response()->json(['message' => 'Deduction deleted successfully']);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error occurred'], 500);
        }
    }
}
