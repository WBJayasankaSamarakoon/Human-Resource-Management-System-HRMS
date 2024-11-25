<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UploadedFileController extends Controller
{
    /**
     * Display a listing of all uploaded files.
     */
    public function index(Request $request): JsonResponse
    {
        $query = UploadedFile::query();

        // Filter by year if provided
        if ($request->has('year') && !empty($request->year)) {
            $query->where('year', $request->year);
        }

        // Filter by month if provided
        if ($request->has('month') && !empty($request->month)) {
            $query->where('month', $request->month);
        }

        $uploadedFiles = $query->get();

        return response()->json(['files' => $uploadedFiles], 200);
    }

    /**
     * Store a new uploaded file record.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,xls',
            'year' => 'required|integer',
            'month' => 'required|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'details' => $validator->errors()], 422);
        }

        try {
            // Handle file upload
            $file = $request->file('file');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');

            // Store file details in the database
            $uploadedFile = UploadedFile::create([
                'filename' => $fileName,
                'year' => $request->year,
                'month' => $request->month,
                'uploaded_at' => now(),
            ]);

            return response()->json(['message' => 'File uploaded successfully', 'file' => $uploadedFile], 201);
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload file', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Display a specific uploaded file.
     */
    public function show($id): JsonResponse
    {
        $uploadedFile = UploadedFile::find($id);

        if (!$uploadedFile) {
            return response()->json(['error' => 'File record not found'], 404);
        }

        return response()->json(['file' => $uploadedFile], 200);
    }

    /**
     * Update a specific uploaded file record.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $uploadedFile = UploadedFile::find($id);

        if (!$uploadedFile) {
            return response()->json(['error' => 'File record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'year' => 'required|integer',
            'month' => 'required|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'details' => $validator->errors()], 422);
        }

        $uploadedFile->update($request->only(['year', 'month']));

        return response()->json(['message' => 'File record updated successfully', 'file' => $uploadedFile], 200);
    }

    /**
     * Remove a specific uploaded file record.
     */
    public function destroy($id): JsonResponse
    {
        $uploadedFile = UploadedFile::find($id);

        if (!$uploadedFile) {
            return response()->json(['error' => 'File record not found'], 404);
        }

        $uploadedFile->delete();

        return response()->json(['message' => 'File record deleted successfully'], 200);
    }

    /**
     * Get unique years from uploaded files.
     */
    public function getYears(): JsonResponse
    {
        $years = UploadedFile::select('year')->distinct()->pluck('year');

        return response()->json(['years' => $years], 200);
    }
}
