<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Addallowance;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AddallowanceController extends Controller
{
    // Display a listing of allowances
    public function index(): JsonResponse
    {
        $allowances = Addallowance::all();
        return response()->json($allowances, 200);
    }

    // Store a newly created allowance
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Name' => 'required|string|max:255',
        ]);

        $allowance = Addallowance::create($request->all());
        return response()->json($allowance, 201);
    }

    // Display the specified allowance
    public function show($id): JsonResponse
    {
        $allowance = Addallowance::find($id);

        if (!$allowance) {
            return response()->json(['error' => 'Allowance not found'], 404);
        }

        return response()->json($allowance, 200);
    }

    // Update the specified allowance
    public function update(Request $request, $id): JsonResponse
    {
        $allowance = Addallowance::find($id);

        if (!$allowance) {
            return response()->json(['error' => 'Allowance not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|max:255',
        ]);

        $allowance->update($request->all());

        return response()->json($allowance, 200);
    }

    // Remove the specified allowance
    public function destroy($id): JsonResponse
    {
        $allowance = Addallowance::find($id);

        if (!$allowance) {
            return response()->json(['error' => 'Allowance not found'], 404);
        }

        $allowance->delete();

        return response()->json(['message' => 'Allowance deleted successfully'], 200);
    }
}
