<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Login method
    public function login(Request $request)
{
    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => 'Validation error'], 422);
    }

    // Check if the admin exists
    $admin = Admin::where('username', $request->username)->first();

    if (!$admin || !Hash::check($request->password, $admin->password)) {
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    // Generate a token
    $token = $admin->createToken('YourAppName')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
    ], 200);
}

}
