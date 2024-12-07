<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GenderController extends Controller
{
    // Display a listing of genders
    public function index(): JsonResponse
    {
        $genders = Gender::all();
        return response()->json($genders, 200);
    }

    // Store a newly created gender
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Name' => 'required|string|max:50',
        ]);

        $gender = Gender::create($request->all());
        return response()->json($gender, 201);
    }

    // Display the specified gender
    public function show($id): JsonResponse
    {
        $gender = Gender::find($id);

        if (!$gender) {
            return response()->json(['error' => 'Gender not found'], 404);
        }

        return response()->json($gender, 200);
    }

    // Update the specified gender
    public function update(Request $request, $id): JsonResponse
    {
        $gender = Gender::find($id);

        if (!$gender) {
            return response()->json(['error' => 'Gender not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|max:50',
        ]);

        $gender->update($request->all());

        return response()->json($gender, 200);
    }

    // Remove the specified gender
    public function destroy($id): JsonResponse
    {
        $gender = Gender::find($id);

        if (!$gender) {
            return response()->json(['error' => 'Gender not found'], 404);
        }

        $gender->delete();

        return response()->json(['message' => 'Gender deleted successfully'], 200);
    }
}
