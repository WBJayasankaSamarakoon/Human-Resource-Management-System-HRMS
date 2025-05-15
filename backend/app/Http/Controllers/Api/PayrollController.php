<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payroll;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class PayrollController extends Controller
{
    // Fetch payroll records by EmpId
    public function getPayrollByEmpId($empId)
    {
        $data = DB::table('payroll')
            ->join('tblemployees', 'payroll.emp_id', '=', 'tblemployees.EmpId')
            ->join('upexcel', 'payroll.emp_id', '=', 'upexcel.person_id')
            ->join('leave', 'payroll.emp_id', '=', 'leaves.employee_id')
            //->join('events')

            ->select('payroll.basic_salary',
            'payroll.attendance',
            // 'payroll.D_AttendanceIncentive',
            // 'payroll.deducation',
            // 'payroll.s_advance',
            // 'payroll.t_expenses',
            // 'payroll.commission',
            'payroll.net_salary',
            'payroll.is_active',
            'tblemployees.EmpId',
            'tblemployees.NameWithInitials',
            'leave.date',
            'upexcel.person_id',
            'upexcel.name',
            'upexcel.date'

            )
            ->get();

        // Return the data as JSON
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);



       // return response()->json($payrolls);
    }

    // Fetch all payroll records (with employee details), with optional filtering by Person ID
    public function index(Request $request)
    {
        // Get filter parameters
        $personId = $request->query('person_id');

        // Build the query
        $query = Payroll::with('employee');

        if ($personId) {
            $query->whereHas('employee', function ($query) use ($personId) {
                $query->where('EmpId', $personId);
            });
        }

        $payrolls = $query->get();

        // Map the results for additional data
        $payrolls->map(function ($payroll) {
            $payroll->EmpId = $payroll->employee ? $payroll->employee->EmpId : 'Unknown';
            $payroll->employee_name = $payroll->employee ? $payroll->employee->NameWithInitials : 'Unknown';
            return $payroll;
        });

        return response()->json($payrolls);
    }

    // Store a new payroll record
    public function store(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'basic_salary' => 'required|numeric',
            'payment_date' => 'required|date',
            'AttendanceIncentive' => 'nullable|numeric',
            // 'D_AttendanceIncentive' => 'nullable|numeric',
            'SuperAttendance' => 'nullable|numeric',
            'PerformanceIncentive' => 'nullable|numeric',
            'BRA1' => 'nullable|numeric',
            'BRA2' => 'nullable|numeric',
            'tax' => 'nullable|numeric',
            // 'deductions' => 'nullable|numeric',
            // 's_advance' => 'nullable|numeric',
            // 't_expenses' => 'nullable|numeric',
            // 'commission' => 'nullable|numeric',
            'is_active' => 'nullable|boolean',
        ]);

        // Ensure missing fields are set to zero
        $payrollData = $request->only([
            'emp_id', 'basic_salary', 'AttendanceIncentive', 'SuperAttendance',
                'PerformanceIncentive', 'BRA1', 'BRA2', 'payment_date', 'tax', 'is_active'
        ]);

        // Set default values for missing fields
        $payrollData['AttendanceIncentive'] = $payrollData['AttendanceIncentive'] ?? 0.00;
        // $payrollData['D_AttendanceIncentive'] = $payrollData['D_AttendanceIncentive'] ?? 0.00;
        $payrollData['SuperAttendance'] = $payrollData['SuperAttendance'] ?? 0.00;
        $payrollData['PerformanceIncentive'] = $payrollData['PerformanceIncentive'] ?? 0.00;
        $payrollData['BRA1'] = $payrollData['BRA1'] ?? 0.00;
        $payrollData['BRA2'] = $payrollData['BRA2'] ?? 0.00;
        $payrollData['tax'] = $payrollData['tax'] ?? 0.00;
        // $payrollData['commission'] = $payrollData['commission'] ?? 0.00;
        // $payrollData['s_advance'] = $payrollData['s_advance'] ?? 0.00;
        // $payrollData['t_expenses'] = $payrollData['t_expenses'] ?? 0.00;
        // $payrollData['deductions'] = $payrollData['deductions'] ?? 0.00;
        $payrollData['is_active'] = $payrollData['is_active'] ?? true;

        // Create new payroll entry
        $payroll = Payroll::create($payrollData);

        return response()->json($payroll, 201);
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
           'emp_id' => 'required|integer|exists:tblemployees,EmpId',
            'basic_salary' => 'required|numeric',
            'payment_date' => 'required|date',
            'AttendanceIncentive' => 'nullable|numeric',
            // 'D_AttendanceIncentive' => 'nullable|numeric',
            'SuperAttendance' => 'nullable|numeric',
            'PerformanceIncentive' => 'nullable|numeric',
            'BRA1' => 'nullable|numeric',
            'BRA2' => 'nullable|numeric',
            'tax' => 'nullable|numeric',
            // 'deductions' => 'nullable|numeric',
            // 's_advance' => 'nullable|numeric',
            // 't_expenses' => 'nullable|numeric',
            // 'commission' => 'nullable|numeric',
            'is_active' => 'nullable|boolean',
        ]);

        $payroll = Payroll::find($id);
        if ($payroll) {
            $payrollData = $request->only([
                'emp_id', 'basic_salary', 'AttendanceIncentive', 'SuperAttendance',
                'PerformanceIncentive', 'BRA1', 'BRA2', 'payment_date', 'tax','is_active'
            ]);

            // Set default values for any missing fields
            $payrollData['AttendanceIncentive'] = $payrollData['AttendanceIncentive'] ?? 0.00;
            // $payrollData['D_AttendanceIncentive'] = $payrollData['D_AttendanceIncentive'] ?? 0.00;
            $payrollData['SuperAttendance'] = $payrollData['SuperAttendance'] ?? 0.00;
            $payrollData['PerformanceIncentive'] = $payrollData['PerformanceIncentive'] ?? 0.00;
            $payrollData['BRA1'] = $payrollData['BRA1'] ?? 0.00;
            $payrollData['BRA2'] = $payrollData['BRA2'] ?? 0.00;
            $payrollData['tax'] = $payrollData['tax'] ?? 0.00;
            // $payrollData['commission'] = $payrollData['commission'] ?? 0.00;
            // $payrollData['s_advance'] = $payrollData['s_advance'] ?? 0.00;
            // $payrollData['t_expenses'] = $payrollData['t_expenses'] ?? 0.00;
            // $payrollData['deductions'] = $payrollData['deductions'] ?? 0.00;
            $payrollData['is_active'] = $payrollData['is_active'] ?? true;

            $payroll->update($payrollData);

            return response()->json($payroll);
        }

        return response()->json(['message' => 'Payroll not found'], 404);
    }

    // Delete a payroll record
    public function destroy($id)
{
    try {
        $payroll = Payroll::find($id);

        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }

        $payroll->delete();
        return response()->json(['message' => 'Payroll record deleted successfully']);
    } catch (QueryException $e) {
        return response()->json([
            'error' => 'Failed to delete payroll record',
            'details' => $e->getMessage()
        ], 500);
    }
}
}
