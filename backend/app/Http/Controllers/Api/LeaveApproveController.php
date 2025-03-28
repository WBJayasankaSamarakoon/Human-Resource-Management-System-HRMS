<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveApprove;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeaveApproveController extends Controller
{
    // Display a listing of leave approvals
    public function index(): JsonResponse
    {
        $leaveApprovals = LeaveApprove::all();
        return response()->json($leaveApprovals, 200);
    }

    // Store a newly created leave approval
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Name' => 'required|string|max:20',
        ]);

        $leaveApprove = LeaveApprove::create($request->all());
        return response()->json($leaveApprove, 201);
    }

    // Display the specified leave approval
    public function show($id): JsonResponse
    {
        $leaveApprove = LeaveApprove::find($id);

        if (!$leaveApprove) {
            return response()->json(['error' => 'Leave approval not found'], 404);
        }

        return response()->json($leaveApprove, 200);
    }

    // Update the specified leave approval
    public function update(Request $request, $id): JsonResponse
    {
        $leaveApprove = LeaveApprove::find($id);

        if (!$leaveApprove) {
            return response()->json(['error' => 'Leave approval not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|max:20',
        ]);

        $leaveApprove->update($request->all());
        return response()->json($leaveApprove, 200);
    }

    // Remove the specified leave approval
    public function destroy($id): JsonResponse
    {
        $leaveApprove = LeaveApprove::find($id);

        if (!$leaveApprove) {
            return response()->json(['error' => 'Leave approval not found'], 404);
        }

        $leaveApprove->delete();
        return response()->json(['message' => 'Leave approval deleted successfully'], 200);
    }
}
