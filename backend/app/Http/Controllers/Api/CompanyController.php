<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    // Display a listing of companies
    public function index(): JsonResponse
    {
        $companies = Company::all();
        return response()->json($companies, 200);
    }

    // Store a newly created company
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Name' => 'required|string|max:255',
            'Address' => 'nullable|string|max:255',
            'Email' => 'nullable|string|max:255|email',
            'Telephone' => 'nullable|string|max:20',
            'Fax' => 'nullable|string|max:20',
        ]);

        $company = Company::create($request->all());
        return response()->json($company, 201);
    }

    // Display the specified company
    public function show($id): JsonResponse
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        return response()->json($company, 200);
    }

    // Update the specified company
    public function update(Request $request, $id): JsonResponse
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|max:255',
            'Address' => 'nullable|string|max:255',
            'Email' => 'nullable|string|max:255|email',
            'Telephone' => 'nullable|string|max:20',
            'Fax' => 'nullable|string|max:20',
        ]);

        $company->update($request->all());

        return response()->json($company, 200);
    }

    // Remove the specified company
    public function destroy($id): JsonResponse
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        $company->delete();

        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
