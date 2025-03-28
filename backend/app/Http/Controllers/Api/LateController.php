<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Late;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class LateController extends Controller
{
    /**
     * Fetch all late records.
     */
    public function index(Request $request)
    {
        $lates = Late::all();
        return response()->json($lates);
    }

    /**
     * Store a new late record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'from_min' => 'required|integer|min:0',
            'to_min' => 'nullable|integer|min:0',
            'deduction_min' => 'required|integer|min:0',
        ]);


            $late = Late::create($request->all());
            return response()->json($late, 201);

    }

    /**
     * Show a specific late record by ID.
     */
    public function show($id)
    {
        $late = Late::find($id);

        if (!$late) {
            return response()->json(['message' => 'Late record not found'], 404);
        }

        return response()->json($late, 200);
    }

    /**
     * Update an existing late record.
     */
    public function update(Request $request, $id)

    {

        $late = Late::find($id);

        if (!$late) {
            return response()->json(['message' => 'Late record not found'], 404);
        }

        $request->validate([
            'from_min' => 'required|integer|min:0',
            'to_min' => 'nullable|integer|min:0',
            'deduction_min' => 'required|integer|min:0',
        ]);

            $late->update($request->all());
            return response()->json($late, 200);

    }

    /**
     * Delete a late record.
     */
    public function destroy($id)
    {
            $late = Late::find($id);

            if (!$late) {
                return response()->json(['message' => 'Late record not found'], 404);
            }

            $late->delete();

            return response()->json(['message' => 'Late record deleted successfully'], 200);

    }
}
