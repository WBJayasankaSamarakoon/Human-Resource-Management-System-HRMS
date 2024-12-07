<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ProcessController extends Controller
{
    public function getCombinedData($id)
    {
        try {
            // Fetch data with the provided query translated into Laravel Query Builder
            $fileData = DB::table('upexcel as u')
                ->selectRaw("
                    e.EmpId AS emp_id,
                    e.NameWithInitials AS name,
                    COUNT(
                        CASE
                            WHEN (u.check_in IS NULL OR u.check_in = '00:00:00' OR u.check_out IS NULL OR u.check_out = '00:00:00')
                            THEN 1
                        END
                    ) AS no_pay_count,
                    IFNULL(l.leave_days, 0) AS leave_days,
                    IFNULL(h.holiday_count, 0) AS holidays,
                    ROUND(SUM(u.late) / 60 + SUM(u.early) / 60, 2) AS late_hours,
                    p.basic_salary,
                    p.AttendanceIncentive,
                    p.SuperAttendance,
                    p.PerformanceIncentive,
                    p.BRA1,
                    p.BRA2,
                    p.BRA3,
                    p.deductions,
                    (p.basic_salary + p.AttendanceIncentive + p.SuperAttendance + p.PerformanceIncentive + p.BRA1 + p.BRA2 + p.BRA3 - p.deductions) AS net_salary,
                    (p.AttendanceIncentive + p.SuperAttendance + p.PerformanceIncentive + p.BRA1 + p.BRA2 + p.BRA3) AS total_allowances
                ")
                ->join('tblemployees as e', 'u.person_id', '=', 'e.EmpId')
                ->leftJoin(
                    DB::raw('(
                        SELECT employee_id, SUM(DATEDIFF(end_date, start_date)) AS leave_days
                        FROM `leave`
                        GROUP BY employee_id
                    ) l'),
                    'e.id',
                    '=',
                    'l.employee_id'
                )
                ->leftJoin(
                    DB::raw('(
                        SELECT COUNT(*) AS holiday_count
                        FROM events
                    ) h'),
                    DB::raw('1'),
                    '=',
                    DB::raw('1')
                )
                ->leftJoin('payroll as p', 'e.EmpId', '=', 'p.emp_id')
                ->where('u.file_id', $id)
                ->groupBy(
                    'e.EmpId',
                    'e.NameWithInitials',
                    'u.no_pay',
                    'p.basic_salary',
                    'p.AttendanceIncentive',
                    'p.SuperAttendance',
                    'p.PerformanceIncentive',
                    'p.BRA1',
                    'p.BRA2',
                    'p.BRA3',
                    'p.deductions'
                )
                ->get();

            if ($fileData->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No data found for the specified file ID.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $fileData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrieving file data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
