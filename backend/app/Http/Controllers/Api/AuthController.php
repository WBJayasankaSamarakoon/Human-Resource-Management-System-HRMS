<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['user'] =  $user;

        return $this->sendResponse($success, 'User register successfully.');
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }

        $success = $this->respondWithToken($token);

        return $this->sendResponse($success, 'User login successfully.');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $success = auth()->user();

        return $this->sendResponse($success, 'Refresh token return successfully.');
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return $this->sendResponse([], 'Successfully logged out.');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $success = $this->respondWithToken(auth()->refresh());

        return $this->sendResponse($success, 'Refresh token return successfully.');
    }

    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllUsers()
    {
        $users = User::select('id', 'name', 'email', 'email_verified_at', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->sendResponse($users, 'Users retrieved successfully.');
    }

    /**
     * Delete a user.
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->sendError('User not found.', [], 404);
            }

            // Prevent deleting the currently authenticated user
            if (auth()->id() == $user->id) {
                return $this->sendError('You cannot delete your own account.', [], 403);
            }

            $user->delete();

            return $this->sendResponse([], 'User deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Error deleting user.', $e->getMessage(), 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
