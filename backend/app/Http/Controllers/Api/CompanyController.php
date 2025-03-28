<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

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
            'Logo' => 'nullable|file|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
            'Name' => 'required|string|max:255',
            'Address' => 'nullable|string|max:255',
            'Email' => 'nullable|string|max:255|email',
            'Telephone' => 'nullable|string|max:20',
            'Fax' => 'nullable|string|max:20',
        ]);

        $data = $request->all();

        // Handle logo upload only if a logo is provided
        if ($request->hasFile('Logo')) {
            $imageData = file_get_contents($request->file('Logo')->getRealPath());
            $image = $request->file('Logo');
            $mimeType = $image->getClientMimeType();
            $base64Image = base64_encode($imageData);
            $data['Logo'] = "data:$mimeType;base64," . $base64Image;
        } else {
            $data['Logo'] = null; // Ensure Logo is null if not provided
        }

        $company = Company::create($data);
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
            'Logo' => 'nullable|file|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
            'Name' => 'required|string|max:255',
            'Address' => 'nullable|string|max:255',
            'Email' => 'nullable|string|max:255|email',
            'Telephone' => 'nullable|string|max:20',
            'Fax' => 'nullable|string|max:20',
        ]);

        $data = $request->all();

        // Handle logo upload only if a logo is provided
        if ($request->hasFile('Logo')) {
            $imageData = file_get_contents($request->file('Logo')->getRealPath());
            $image = $request->file('Logo');
            $mimeType = $image->getClientMimeType();
            $base64Image = base64_encode($imageData);
            $data['Logo'] = "data:$mimeType;base64," . $base64Image;
        } else {
            // If no logo is provided, keep the existing logo (if any)
            $data['Logo'] = $company->Logo;
        }

        $company->update($data);

        return response()->json($company, 200);
    }

    // Remove the specified company
    public function destroy($id): JsonResponse
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Delete the logo file if it exists
        if ($company->Logo) {
            $logoPath = str_replace('/storage', 'public', $company->Logo);
            Storage::delete($logoPath);
        }

        $company->delete();

        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
