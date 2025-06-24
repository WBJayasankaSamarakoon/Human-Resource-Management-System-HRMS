<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;

class MailController extends Controller
{
    /**
     * Send demo email
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $mailData = [
            'title' => 'Mail from ItSolutionStuff.com',
            'body' => 'This is for testing email using smtp.',
            'files' => [
                public_path('attachments/test-one.pdf'),
                public_path('attachments/test-two.png')
            ]
        ];

        try {
            Mail::to($request->email)->send(new DemoMail($mailData));
            return response()->json(['message' => 'Email sent successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Email failed to send', 'error' => $e->getMessage()], 500);
        }
    }
}
