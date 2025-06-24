<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assets;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AssetsController extends Controller
{
    // Display a listing of all assets
    public function index(): JsonResponse
    {
        $assets = Assets::all();
        return response()->json($assets, 200);
    }

    // Store a newly created asset
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'serial_no' => 'required|string|unique:assets,serial_no|max:255',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $asset = Assets::create($request->all());

        return response()->json($asset, 201);
    }

    // Display the specified asset
    public function show($id): JsonResponse
    {
        $asset = Assets::find($id);

        if (!$asset) {
            return response()->json(['error' => 'Asset not found'], 404);
        }

        return response()->json($asset, 200);
    }

    // Update the specified asset
    public function update(Request $request, $id): JsonResponse
    {
        $asset = Assets::find($id);

        if (!$asset) {
            return response()->json(['error' => 'Asset not found'], 404);
        }

        $request->validate([
            'serial_no' => 'required|string|unique:assets,serial_no|max:255',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $asset->update($request->all());

        return response()->json($asset, 200);
    }

    // Remove the specified asset
    public function destroy($id): JsonResponse
    {
        $asset = Assets::find($id);

        if (!$asset) {
            return response()->json(['error' => 'Asset not found'], 404);
        }

        $asset->delete();

        return response()->json(['message' => 'Asset deleted successfully'], 200);
    }
}
