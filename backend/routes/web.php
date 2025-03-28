<?php

use App\Mail\SlipMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/send-slip', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email',
        'slipData' => 'required|array',
    ]);

    Mail::to($validated['email'])->send(new SlipMail($validated['slipData']));

    return response()->json(['message' => 'Payslip sent successfully!']);
});

