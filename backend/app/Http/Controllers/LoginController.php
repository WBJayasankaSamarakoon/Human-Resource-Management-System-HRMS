<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        // Find the admin by username
        $admin = Admin::where('username', $credentials['username'])->first();

        // Check if admin exists and the password matches
        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            $token = $admin->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
