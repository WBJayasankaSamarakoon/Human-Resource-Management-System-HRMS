<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payroll;
use App\Models\Tblemployee;

class PayrollController extends Controller
{
    // Fetch all payroll records and join with employee data to include employee name
    public function index()
    {
        // Fetch payroll data and join with employee data to get the employee name
        $payrolls = Payroll::with('employee')->get(); // Use the 'employee' relationship defined in the Payroll model
        return response()->json($payrolls);  // Return the payrolls along with employee name
    }

    // Store a new payroll record
    public function store(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,id',
            'basic_salary' => 'required|numeric',
            'payment_date' => 'required|date',
            'AttendanceIncentive' => 'nullable|numeric',
            'SuperAttendance' => 'nullable|numeric',
            'PerformanceIncentive' => 'nullable|numeric',
            'BRA1' => 'nullable|numeric',
            'BRA2' => 'nullable|numeric',
            'BRA3' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
        ]);

        // Ensure missing fields are set to zero
        $payrollData = $request->only([
            'emp_id', 'basic_salary', 'AttendanceIncentive', 'SuperAttendance',
            'PerformanceIncentive', 'BRA1', 'BRA2', 'BRA3', 'deductions', 'payment_date'
        ]);

        // Set default values for missing fields
        $payrollData['AttendanceIncentive'] = $payrollData['AttendanceIncentive'] ?? 0.00;
        $payrollData['SuperAttendance'] = $payrollData['SuperAttendance'] ?? 0.00;
        $payrollData['PerformanceIncentive'] = $payrollData['PerformanceIncentive'] ?? 0.00;
        $payrollData['BRA1'] = $payrollData['BRA1'] ?? 0.00;
        $payrollData['BRA2'] = $payrollData['BRA2'] ?? 0.00;
        $payrollData['BRA3'] = $payrollData['BRA3'] ?? 0.00;
        $payrollData['deductions'] = $payrollData['deductions'] ?? 0.00;

        // Create new payroll entry
        $payroll = Payroll::create($payrollData);

        return response()->json($payroll, 201); // Return the created payroll record
    }

    // Show a specific payroll record by ID
    public function show($id)
    {
        $payroll = Payroll::find($id);
        if ($payroll) {
            return response()->json($payroll);
        } else {
            return response()->json(['message' => 'Payroll not found'], 404);
        }
    }

    // Update an existing payroll record
    public function update(Request $request, $id)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,id',
            'basic_salary' => 'required|numeric',
            'payment_date' => 'required|date',
            'AttendanceIncentive' => 'nullable|numeric',
            'SuperAttendance' => 'nullable|numeric',
            'PerformanceIncentive' => 'nullable|numeric',
            'BRA1' => 'nullable|numeric',
            'BRA2' => 'nullable|numeric',
            'BRA3' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
        ]);

        $payroll = Payroll::find($id);
        if ($payroll) {
            $payrollData = $request->only([
                'emp_id', 'basic_salary', 'AttendanceIncentive', 'SuperAttendance',
                'PerformanceIncentive', 'BRA1', 'BRA2', 'BRA3', 'deductions', 'payment_date'
            ]);

            // Set default values for any missing fields
            $payrollData['AttendanceIncentive'] = $payrollData['AttendanceIncentive'] ?? 0.00;
            $payrollData['SuperAttendance'] = $payrollData['SuperAttendance'] ?? 0.00;
            $payrollData['PerformanceIncentive'] = $payrollData['PerformanceIncentive'] ?? 0.00;
            $payrollData['BRA1'] = $payrollData['BRA1'] ?? 0.00;
            $payrollData['BRA2'] = $payrollData['BRA2'] ?? 0.00;
            $payrollData['BRA3'] = $payrollData['BRA3'] ?? 0.00;
            $payrollData['deductions'] = $payrollData['deductions'] ?? 0.00;

            $payroll->update($payrollData);

            return response()->json($payroll);
        }

        return response()->json(['message' => 'Payroll not found'], 404);
    }

    // Delete a payroll record
    public function destroy($id)
    {
        $payroll = Payroll::find($id);
        if ($payroll) {
            $payroll->delete();
            return response()->json(['message' => 'Payroll deleted successfully']);
        } else {
            return response()->json(['message' => 'Payroll not found'], 404);
        }
    }
}
