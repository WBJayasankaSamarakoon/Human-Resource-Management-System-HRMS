<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssetAllocation;
use Illuminate\Http\Request;

class AssetAllocationController extends Controller
{
    // Get all asset allocations along with related employee and asset
    public function index()
    {
        $allocations = AssetAllocation::with(['employee', 'asset'])->get();
        return response()->json($allocations);
    }

    // Store a new asset allocation record
    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'emp_id' => 'required|exists:tblemployees,id',
            'asset_id' => 'required|exists:assets,id',
            'give_date' => 'required|date',
            'handover_date' => 'nullable|date|after_or_equal:give_date',
            'description' => 'nullable|string',
        ]);

        // Create a new asset allocation record
        $allocation = AssetAllocation::create([
            'emp_id' => $request->emp_id,
            'asset_id' => $request->asset_id,
            'give_date' => $request->give_date,
            'handover_date' => $request->handover_date,
            'description' => $request->description,
        ]);

        // Return newly created asset allocation record with relationships
        return response()->json($allocation->load(['employee', 'asset']), 201);
    }

    // Update an existing asset allocation record
    public function update(Request $request, $id)
    {
        $allocation = AssetAllocation::find($id);

        if (!$allocation) {
            return response()->json(['message' => 'Asset allocation record not found'], 404);
        }

        // Validate the incoming data
        $request->validate([
            'emp_id' => 'required|exists:tblemployees,id',
            'asset_id' => 'required|exists:assets,id',
            'give_date' => 'required|date',
            'handover_date' => 'nullable|date|after_or_equal:give_date',
            'description' => 'nullable|string',
        ]);

        // Update asset allocation record
        $allocation->update([
            'emp_id' => $request->emp_id,
            'asset_id' => $request->asset_id,
            'give_date' => $request->give_date,
            'handover_date' => $request->handover_date,
            'description' => $request->description,
        ]);

        // Return updated asset allocation record with relationships
        return response()->json($allocation->load(['employee', 'asset']));
    }

    // Delete an asset allocation record
    public function destroy($id)
    {
        $allocation = AssetAllocation::find($id);

        if (!$allocation) {
            return response()->json(['message' => 'Asset allocation record not found'], 404);
        }

        // Delete the asset allocation record
        $allocation->delete();

        return response()->json(['message' => 'Asset allocation record deleted successfully']);
    }

    // Get assets allocated to a specific employee
    public function employeeAssets($emp_id)
    {
        $allocations = AssetAllocation::with('asset')
            ->where('emp_id', $emp_id)
            ->whereNull('handover_date')
            ->get();

        return response()->json($allocations);
    }
}
