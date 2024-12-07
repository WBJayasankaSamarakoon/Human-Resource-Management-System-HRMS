<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    // Display a listing of admins
    public function index(): JsonResponse
    {
        try {
            $admins = Admin::all();
            return response()->json($admins, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching admins: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch admins'], 500);
        }
    }

    // Store a newly created admin
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|email|unique:admin,email',
                'password' => 'required|string|min:8',
            ]);

            $admin = Admin::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json($admin, 201);
        } catch (\Exception $e) {
            Log::error('Error creating admin: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create admin'], 500);
        }
    }

    // Display the specified admin
    public function show($id): JsonResponse
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['error' => 'Admin not found'], 404);
            }

            return response()->json($admin, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching admin: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch admin'], 500);
        }
    }

    // Update the specified admin
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['error' => 'Admin not found'], 404);
            }

            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|email|unique:admin,email,' . $id,
                'password' => 'nullable|string|min:8',
            ]);

            $data = $request->only(['username', 'email']);
            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $admin->update($data);

            return response()->json($admin, 200);
        } catch (\Exception $e) {
            Log::error('Error updating admin: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update admin'], 500);
        }
    }

    // Remove the specified admin
    public function destroy($id): JsonResponse
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['error' => 'Admin not found'], 404);
            }

            $admin->delete();

            return response()->json(['message' => 'Admin deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting admin: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete admin'], 500);
        }
    }

    /**
     * Handle login requests for admin users.
     */
    public function login(Request $request): JsonResponse
    {
        // Validate the incoming data
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find the admin by username
        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            // Authentication failed
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Create a token using Sanctum
        $token = $admin->createToken('Admin Token')->plainTextToken;

        // Return the token in response
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
        ], 200);
    }
}
