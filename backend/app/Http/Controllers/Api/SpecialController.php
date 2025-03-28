<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Special;
use App\Models\Payroll;
use App\Models\Leave;
use App\Models\Tblemployee;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class SpecialController extends Controller
{
    /**
     * Display a listing of the special records.
     */
    public function index(): JsonResponse
    {
        return response()->json(Special::with(['employee', 'payroll', 'leave'])->get(), 200);
    }

    /**
     * Store a new special record.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request data
        $request->validate([
            'emp_id' => 'required|exists:tblemployees,EmpId',
            'payment_date' => 'required|date',
            'type' => 'required|in:full,partial',
            'leave_count' => 'required|integer|min:0',
            'AttendanceIncentive' => 'required|numeric|min:0',
        ]);

        try {
            // Create a new special record
            $special = Special::create([
                'emp_id' => $request->emp_id,
                'payment_date' => Carbon::parse($request->payment_date),
                'type' => $request->type,
                'leave_count' => $request->leave_count,
                'AttendanceIncentive' => $request->AttendanceIncentive,
            ]);

            return response()->json($special, 201); // Return the created special record with a 201 status code
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified special record.
     */
    public function show($id): JsonResponse
    {
        return response()->json(Special::with(['employee', 'payroll', 'leave'])->findOrFail($id), 200);
    }

    /**
     * Update the specified special record.
     */
    public function update(Request $request, $id): JsonResponse
    {
        // Validate the incoming request data
        $request->validate([
            'emp_id' => 'required|exists:tblemployees,EmpId',
            'payment_date' => 'required|date',
            'type' => 'required|in:full,partial',
            'leave_count' => 'required|integer|min:0',
            'AttendanceIncentive' => 'required|numeric|min:0',
        ]);

        try {
            // Find the special record by ID
            $special = Special::findOrFail($id);

            // Update the special record
            $special->update([
                'emp_id' => $request->emp_id,
                'payment_date' => Carbon::parse($request->payment_date),
                'type' => $request->type,
                'leave_count' => $request->leave_count,
                'AttendanceIncentive' => $request->AttendanceIncentive,
            ]);

            return response()->json($special, 200); // Return the updated special record
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Delete the specified special record.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $special = Special::findOrFail($id);
            $special->delete();
            return response()->json(['message' => 'Record deleted successfully'], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get combined data based on employee ID, month, and year.
     */
    public function getCombinedData1(Request $request): JsonResponse
    {
        $emp_id = $request->route('emp_id');
        $month = $request->route('month');
        $year = $request->route('year');

        $data = DB::selectOne("
                SELECT
                    e.EmpId AS emp_id,
                    e.NameWithInitials AS name,
                    IFNULL(l.leave_days, 0) AS leave_days,
                    IFNULL(p.AttendanceIncentive, 0) AS AttendanceIncentive
                FROM tblemployees e
                LEFT JOIN (
                    SELECT
                        l.employee_id,
                        ROUND(
                            SUM(
                                ld.Value * (DATEDIFF(l.end_date, l.start_date) + 1)
                            ), 1
                        ) AS leave_days
                    FROM `leave` l
                    JOIN leaveday ld ON l.leaveday_id = ld.id
                    WHERE MONTH(l.start_date) = ?
                    AND YEAR(l.start_date) = ?
                    AND l.approve != 2  -- Exclude Pre Approve leaves
                    GROUP BY l.employee_id
                ) l ON e.id = l.employee_id
                LEFT JOIN (
                    SELECT emp_id, SUM(AttendanceIncentive) AS AttendanceIncentive
                    FROM payroll
                    GROUP BY emp_id
                ) p ON e.EmpId = p.emp_id
                WHERE e.EmpId = ?
        ", [ $month, $year, $emp_id]);

        return response()->json([
            'year' => $year,
            'month' => $month,
            'data' => $data
        ], 200);
    }


/**
 * Recalculate the Attendance Incentive based on leave days and type.
 */
// public function recalculateAttendanceIncentive($emp_id, $payment_date, $type): JsonResponse
// {
//     $validatedData = Validator::make([
//         'emp_id' => $emp_id,
//         'payment_date' => $payment_date,
//         'type' => $type,
//     ], [
//         'emp_id' => 'required|exists:tblemployees,EmpId',
//         'payment_date' => 'required|date',
//         'type' => 'required|in:full,partial',
//     ]);

//     if ($validatedData->fails()) {
//         return response()->json(['error' => $validatedData->errors()], 422);
//     }

//     try {
//         $payment_date_carbon = Carbon::parse($payment_date);
//         $year = $payment_date_carbon->year;
//         $month = $payment_date_carbon->month;

//         // Fetch employee's payroll data
//         $payroll = Payroll::where('emp_id', $emp_id)->firstOrFail();
//         $baseAttendanceIncentive = $payroll->AttendanceIncentive;

//         // Fetch parameter data
//         $parameter = DB::table('parameter')->first();
//         $workingDays = $parameter->work ?? 26;
//         $maximumLeaveDays = $parameter->leave ?? 4;

//         // Fetch leave data based on month and year for the employee
//         $leaveData = DB::selectOne("
//             SELECT
//                 ROUND(
//                     SUM(
//                         ld.Value * (DATEDIFF(l.end_date, l.start_date) + 1)
//                     ), 1
//                 ) AS leave_days
//             FROM `leave` l
//             JOIN leaveday ld ON l.leaveday_id = ld.id
//             WHERE MONTH(l.start_date) = ?
//               AND YEAR(l.start_date) = ?
//               AND l.employee_id = ?
//             GROUP BY l.employee_id
//         ", [$month, $year, $emp_id]);

//         $leaveDays = $leaveData->leave_days ?? 0;

//         // Calculate the Attendance Incentive
//         $attendanceIncentive = $baseAttendanceIncentive;

//         if ($type === 'partial') {
//             if ($leaveDays >= $maximumLeaveDays) {
//                 $attendanceIncentive = 0;
//             } else {
//                 $attendanceIncentive = round(($baseAttendanceIncentive / $workingDays) * ($workingDays - $leaveDays), 2);
//             }
//         }

//         // Update Special record if exists
//         $special = Special::where('emp_id', $emp_id)
//             ->whereYear('payment_date', $year)
//             ->whereMonth('payment_date', $month)
//             ->first();

//         if ($special) {
//             $special->AttendanceIncentive = $attendanceIncentive;
//             $special->save();
//         }

//         return response()->json([
//             'attendanceIncentive' => $attendanceIncentive,
//             'leave_days' => $leaveDays
//         ], 200);

//     } catch (QueryException $e) {
//         return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
//     }
// }

}
