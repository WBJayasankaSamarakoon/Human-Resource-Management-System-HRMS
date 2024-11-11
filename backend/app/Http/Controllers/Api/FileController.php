<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'file' => 'required|file|max:10240', // Max 10MB
        ]);

        // Store the file in the 'uploads' directory
        $path = $request->file('file')->store('uploads');

        // Return the file path as response
        return response()->json(['message' => 'File uploaded successfully', 'path' => $path]);
    }
}
