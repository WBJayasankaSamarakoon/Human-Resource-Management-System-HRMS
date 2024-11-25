<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $credentials = $request->only('username', 'password');

        // Find the admin by username in the 'admin' table
        $admin = Admin::where('username', $credentials['username'])->first();

        // Check if admin exists and the password matches
        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            // Generate the authentication token using Laravel Sanctum
            $token = $admin->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        // Return an error if credentials are invalid
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
