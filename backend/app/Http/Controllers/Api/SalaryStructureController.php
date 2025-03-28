<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SalaryStructure;

class SalaryStructureController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        // Fetch all salary structures from the database
        $salaryStructures = SalaryStructure::all();
        return response()->json($salaryStructures);
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'Name' => 'required|string|max:255',
            'Value' => 'required|string|max:255',
        ]);

        // Create a new salary structure
        $salaryStructure = SalaryStructure::create($request->all());
        return response()->json($salaryStructure, 201);
    }

    // Display the specified resource
    public function show($id)
    {
        // Find salary structure by ID
        $salaryStructure = SalaryStructure::find($id);
        if ($salaryStructure) {
            return response()->json($salaryStructure);
        } else {
            return response()->json(['message' => 'Salary structure not found'], 404);
        }
    }

    // Update the specified resource in storage
    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'Name' => 'sometimes|required|string|max:255',
            'Value' => 'sometimes|required|string|max:255',
        ]);

        // Find and update the salary structure
        $salaryStructure = SalaryStructure::find($id);
        if ($salaryStructure) {
            $salaryStructure->update($request->all());
            return response()->json($salaryStructure);
        } else {
            return response()->json(['message' => 'Salary structure not found'], 404);
        }
    }

    // Remove the specified resource from storage
    public function destroy($id)
    {
        // Find and delete the salary structure
        $salaryStructure = SalaryStructure::find($id);
        if ($salaryStructure) {
            $salaryStructure->delete();
            return response()->json(['message' => 'Salary structure deleted successfully']);
        } else {
            return response()->json(['message' => 'Salary structure not found'], 404);
        }
    }
}
