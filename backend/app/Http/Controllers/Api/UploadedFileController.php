<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UploadedFile;
use Illuminate\Http\Request;

class UploadedFileController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->query('year');
        $month = $request->query('month');

        if ($year && $month) {
            return UploadedFile::where('year', $year)
                ->where('month', $month)
                ->get();
        }

        return UploadedFile::all();
    }

    // Show a specific uploaded file by ID
    public function show($id)
    {
        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->json($file);
    }

    public function destroy($id)
    {
        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $file->delete();

        return response()->json(['message' => 'File deleted successfully.']);
    }
}
