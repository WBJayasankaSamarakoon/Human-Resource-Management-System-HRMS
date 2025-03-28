<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeShift;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TypeShiftController extends Controller
{
    // Display a listing of type shifts
    public function index(): JsonResponse
    {
        $typeShifts = TypeShift::all();
        return response()->json($typeShifts, 200);
    }

    // Store a newly created type shift
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Value' => 'nullable|numeric',
        ]);

        $typeShift = TypeShift::create($validated);
        return response()->json($typeShift, 201);
    }

    // Display the specified type shift
    public function show($id): JsonResponse
    {
        $typeShift = TypeShift::find($id);

        if (!$typeShift) {
            return response()->json(['error' => 'TypeShift not found'], 404);
        }

        return response()->json($typeShift, 200);
    }

    // Update the specified type shift
    public function update(Request $request, $id): JsonResponse
    {
        $typeShift = TypeShift::find($id);

        if (!$typeShift) {
            return response()->json(['error' => 'TypeShift not found'], 404);
        }

        $validated = $request->validate([
            'Name' => 'required|string|max:20',
            'Value' => 'nullable|numeric',
        ]);

        $typeShift->update($validated);
        return response()->json($typeShift, 200);
    }

    // Remove the specified type shift
    public function destroy($id): JsonResponse
    {
        $typeShift = TypeShift::find($id);

        if (!$typeShift) {
            return response()->json(['error' => 'TypeShift not found'], 404);
        }

        $typeShift->delete();
        return response()->json(['message' => 'TypeShift deleted successfully'], 200);
    }
}
