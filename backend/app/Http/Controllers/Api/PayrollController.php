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
            ->select(
                'payroll.basic_salary',
                'payroll.attendance',
                'payroll.deducation',
                'payroll.net_salary',
                'payroll.payment_year',
                'payroll.payment_month',
                'tblemployees.EmpId',
                'tblemployees.NameWithInitials',
                'leave.date',
                'upexcel.person_id',
                'upexcel.name',
                'upexcel.date'
            )
            ->get();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    // Fetch all payroll records
    public function index(Request $request)
    {
        $personId = $request->query('person_id');
        $query = Payroll::with('employee');

        if ($personId) {
            $query->whereHas('employee', function ($query) use ($personId) {
                $query->where('EmpId', $personId);
            });
        }

        $payrolls = $query->get();

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
            'payment_year' => 'required|integer',
            'payment_month' => 'required|integer',
            'AttendanceIncentive' => 'nullable|numeric',
            'SuperAttendance' => 'nullable|numeric',
            'PerformanceIncentive' => 'nullable|numeric',
            'BRA1' => 'nullable|numeric',
            'BRA2' => 'nullable|numeric',
            'BRA3' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
        ]);

        $payrollData = $request->only([
            'emp_id', 'basic_salary', 'AttendanceIncentive', 'SuperAttendance',
            'PerformanceIncentive', 'BRA1', 'BRA2', 'BRA3', 'deductions', 'payment_year', 'payment_month'
        ]);

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
            'payment_year' => 'required|integer',
            'payment_month' => 'required|integer',
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
                'PerformanceIncentive', 'BRA1', 'BRA2', 'BRA3', 'deductions', 'payment_year', 'payment_month'
            ]);

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
