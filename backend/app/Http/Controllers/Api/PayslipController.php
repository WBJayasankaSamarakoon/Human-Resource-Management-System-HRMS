<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Payslip;
use Illuminate\Support\Facades\Log;

class PayslipController extends Controller
{
    public function sendPayslip(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'payslipData' => 'required|array',
        ]);

        $email = $validated['email'];
        $name = $validated['name'];
        $payslipData = $validated['payslipData'];

        try {
            // Send email
            Mail::send('emails.payslip', compact('payslipData', 'name'), function ($message) use ($email, $name) {
                $message->to($email)
                    ->subject("Payslip for $name");
            });

            // Log the success
            Log::info('Payslip sent successfully to ' . $email);

            return response()->json(['message' => 'Payslip sent successfully'], 200);

        } catch (\Exception $e) {
            // Log the error
            Log::error('Error sending payslip: ' . $e->getMessage());

            return response()->json(['message' => 'Failed to send payslip', 'error' => $e->getMessage()], 500);
        }
    }
}
