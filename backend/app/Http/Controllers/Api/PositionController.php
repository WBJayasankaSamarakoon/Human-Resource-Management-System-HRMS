<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Position;

class PositionController extends Controller
{
    protected $position;

    public function __construct(){
        $this->position = new Position();
    }

    // Display a listing of positions
    public function index()
    {
        return response()->json($this->position->all(), 200); // Explicitly return JSON response
    }

    // Store a newly created position
    public function store(Request $request)
    {
        $position = $this->position->create($request->all());
        return response()->json($position, 201); // Return created position with HTTP 201 status
    }

    // Display the specified position
    public function show($id)
    {
        $position = $this->position->find($id);
        if (!$position) {
            return response()->json(['error' => 'Position not found'], 404);
        }
        return response()->json($position, 200);
    }

    // Update the specified position
    public function update(Request $request, $id)
    {
        $position = $this->position->find($id);
        if (!$position) {
            return response()->json(['error' => 'Position not found'], 404);
        }
        $position->update($request->all());
        return response()->json($position, 200);
    }

    // Remove the specified position
    public function destroy($id)
    {
        $position = $this->position->find($id);
        if (!$position) {
            return response()->json(['error' => 'Position not found'], 404);
        }
        $position->delete();
        return response()->json(['message' => 'Position deleted successfully'], 200);
    }
}
