<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SlipMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PayslipController extends Controller
{
    public function sendPayslip(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required|string',
            'subject' => 'required|string',
            'message' => 'nullable|string',
            'payslipData' => 'required|string',
            'companyData' => 'nullable|string',
            'attachPdf' => 'required|boolean',
            'customPdf' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Decode the JSON strings
            $payslipData = json_decode($request->payslipData, true);
            $companyData = json_decode($request->companyData ?? '{}', true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid JSON data');
            }

            // Handle file upload if present
            $customPdfPath = null;
            if ($request->hasFile('customPdf')) {
                $file = $request->file('customPdf');
                $path = 'temp_pdfs/' . uniqid() . '.pdf';
                Storage::put($path, file_get_contents($file));
                $customPdfPath = Storage::path($path);
            }

            // Prepare data for email
            $mailData = [
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
                'payslipData' => $payslipData,
                'companyData' => $companyData,
                'attachPdf' => $request->boolean('attachPdf'),
                'customPdfPath' => $customPdfPath,
            ];

            // Create and send the mailable
            Mail::to($request->email)->send(new SlipMail($mailData));

            // Clean up temporary file if it exists
            if ($customPdfPath && file_exists($customPdfPath)) {
                unlink($customPdfPath);
            }

            return response()->json(['message' => 'Payslip sent successfully'], 200);

        } catch (\Exception $e) {
            // Clean up temporary file if it exists (in case of error)
            if (isset($customPdfPath)) {
                @unlink($customPdfPath);
            }

            Log::error('Failed to send payslip: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to send payslip',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
