<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Allowances;
use Illuminate\Database\QueryException;

class AllowancesController extends Controller
{
    /**
     * Fetch all allowances with employee details.
     */
    public function index(Request $request)
    {
        $empId = $request->query('emp_id');

        // Build the query
        $query = Allowances::with(['employee', 'allowanceTypes']);

        if ($empId) {
            $query->whereHas('employee', function ($query) use ($empId) {
                $query->where('EmpId', $empId);
            });
        }

        $allowances = $query->get();

        return response()->json($allowances);
    }

    /**
     * Store a new allowance.
     */
    public function store(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'type' => 'required|integer|exists:addallowance,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'is_active' => 'required|boolean',
        ]);

        // Create a new allowance record
        $allowance = Allowances::create($request->all());

        return response()->json($allowance, 201);
    }

    /**
     * Show a specific allowance record by ID.
     */
    public function show($id)
    {
        $allowance = Allowances::with(['employee', 'allowanceTypes'])->find($id);

        if ($allowance) {
            return response()->json($allowance);
        } else {
            return response()->json(['message' => 'Allowance not found'], 404);
        }
    }

    /**
     * Update an existing allowance record.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'type' => 'required|integer|exists:addallowance,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'is_active' => 'required|boolean',
        ]);

        $allowance = Allowances::find($id);

        if (!$allowance) {
            return response()->json(['message' => 'Allowance not found'], 404);
        }

        // Update allowance data
        $allowance->update($request->all());

        return response()->json($allowance);
    }

    /**
     * Delete an allowance record.
     */
    public function destroy($id)
    {
        try {
            $allowance = Allowances::find($id);

            if (!$allowance) {
                return response()->json(['message' => 'Allowance not found'], 404);
            }

            $allowance->delete();
            return response()->json(['message' => 'Allowance deleted successfully']);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error occurred'], 500);
        }
    }
}
