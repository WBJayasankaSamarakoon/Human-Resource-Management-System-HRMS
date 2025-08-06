<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Parameter;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ParameterController extends Controller
{
    // Display a listing of parameters
    public function index(): JsonResponse
    {
        $parameters = Parameter::all();
        return response()->json($parameters, 200);
    }

    // Store a newly created parameter
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'work' => 'required|integer',
            'hours' => 'required|integer',
            'leave' => 'required|integer',
            'epfEmp' => 'required|numeric|min:0|max:100',
            'epfCom' => 'required|numeric|min:0|max:100',
            'etfCom' => 'required|numeric|min:0|max:100',
            'ot' => 'required|numeric|min:0|max:100,',
            'specot' => 'required|numeric|min:0|max:100',
            'ot_hours' => 'nullable|numeric|min:0|max:999.99',
        ]);

        $parameter = Parameter::create($request->all());
        return response()->json($parameter, 201);
    }

    // Display the specified parameter
    public function show($id): JsonResponse
    {
        $parameter = Parameter::find($id);

        if (!$parameter) {
            return response()->json(['error' => 'Parameter not found'], 404);
        }

        return response()->json($parameter, 200);
    }

    // Update the specified parameter
    public function update(Request $request, $id): JsonResponse
    {
        $parameter = Parameter::find($id);

        if (!$parameter) {
            return response()->json(['error' => 'Parameter not found'], 404);
        }

        $request->validate([
            'work' => 'required|integer',
            'hours' => 'required|integer',
            'leave' => 'required|integer',
            'epfEmp' => 'required|numeric|min:0|max:100',
            'epfCom' => 'required|numeric|min:0|max:100',
            'etfCom' => 'required|numeric|min:0|max:100',
            'ot' => 'required|numeric|min:0|max:100,',
            'specot' => 'required|numeric|min:0|max:100',
            'ot_hours' => 'nullable|numeric|min:0|max:999.99',
        ]);

        $parameter->update($request->all());

        return response()->json($parameter, 200);
    }

    // Remove the specified parameter
    public function destroy($id): JsonResponse
    {
        $parameter = Parameter::find($id);

        if (!$parameter) {
            return response()->json(['error' => 'Parameter not found'], 404);
        }

        $parameter->delete();

        return response()->json(['message' => 'Parameter deleted successfully'], 200);
    }
}
