<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adddeduction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdddeductionController extends Controller
{
    // Display a listing of deductions
    public function index(): JsonResponse
    {
        $deductions = Adddeduction::all();
        return response()->json($deductions, 200);
    }

    // Store a newly created deduction
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Name' => 'required|string|max:255',
        ]);

        $deduction = Adddeduction::create($request->all());
        return response()->json($deduction, 201);
    }

    // Display the specified deduction
    public function show($id): JsonResponse
    {
        $deduction = Adddeduction::find($id);

        if (!$deduction) {
            return response()->json(['error' => 'Deduction not found'], 404);
        }

        return response()->json($deduction, 200);
    }

    // Update the specified deduction
    public function update(Request $request, $id): JsonResponse
    {
        $deduction = Adddeduction::find($id);

        if (!$deduction) {
            return response()->json(['error' => 'Deduction not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|max:255',
        ]);

        $deduction->update($request->all());

        return response()->json($deduction, 200);
    }

    // Remove the specified deduction
    public function destroy($id): JsonResponse
    {
        $deduction = Adddeduction::find($id);

        if (!$deduction) {
            return response()->json(['error' => 'Deduction not found'], 404);
        }

        $deduction->delete();

        return response()->json(['message' => 'Deduction deleted successfully'], 200);
    }
}
