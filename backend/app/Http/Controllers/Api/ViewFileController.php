<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ViewFile;  // Import the ViewFile model
use Illuminate\Http\Request;

class ViewFileController extends Controller
{
    /**
     * Retrieve the uploaded file data by file ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function view($id)
    {
        try {
            // Use the ViewFile model to fetch data by file_id
            $fileData = ViewFile::where('file_id', $id)->get();

            if ($fileData->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No data found for the specified file ID.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $fileData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrieving file data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
