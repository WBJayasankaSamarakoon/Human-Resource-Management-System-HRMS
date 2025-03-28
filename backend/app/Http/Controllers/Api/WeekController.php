<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Week;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WeekController extends Controller
{
    // Display a listing of the day in the week
    public function index(): JsonResponse
    {
        $weeks = Week::all();
        return response()->json($weeks, 200);
    }

    // Store a newly created day in the week
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Day' => 'required|string|max:255',
        ]);

        $week = Week::create($request->all());
        return response()->json($week, 201);
    }

    // Display the specified day
    public function show($id): JsonResponse
    {
        $week = Week::find($id);

        if (!$week) {
            return response()->json(['error' => 'Day not found'], 404);
        }

        return response()->json($week, 200);
    }

    // Update the specified day in the week
    public function update(Request $request, $id): JsonResponse
    {
        $week = Week::find($id);

        if (!$week) {
            return response()->json(['error' => 'Day not found'], 404);
        }

        $request->validate([
            'Day' => 'required|string|max:255',
        ]);

        $week->update($request->all());

        return response()->json($week, 200);
    }

    // Remove the specified day from the week
    public function destroy($id): JsonResponse
    {
        $week = Week::find($id);

        if (!$week) {
            return response()->json(['error' => 'Day not found'], 404);
        }

        $week->delete();

        return response()->json(['message' => 'Day deleted successfully'], 200);
    }
}
