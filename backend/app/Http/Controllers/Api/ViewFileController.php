<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ViewFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ViewFileController extends Controller
{
    /**
     * Retrieve the uploaded file data by file ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function view($id)
    {
        try {
            // Use the ViewFile model to fetch data by file_id
            $fileData = ViewFile::where('file_id', $id)->get();

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

    //Combine data
    public function getCombinedData($fileId)
    {
        // Fetch the year and month from the uploaded_files table for the given fileId
        $fileData = DB::table('uploaded_files')->where('id', $fileId)->first();

        if (!$fileData) {
            return response()->json([
                'success' => false,
                'message' => 'File data not found for the specified file ID.'
            ], 404);
        }

        $year = $fileData->year;
        $month = $fileData->month;

        // Query to fetch the combined data with the matching month and year
        $data = DB::select("
            SELECT
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
            FROM
                upexcel u
            JOIN
                tblemployees e ON u.person_id = e.EmpId
            LEFT JOIN (
                SELECT
                    employee_id,
                    SUM(DATEDIFF(end_date, start_date) + 1) AS leave_days
                FROM
                    `leave`
                WHERE MONTH(start_date) = ? AND YEAR(start_date) = ?
                GROUP BY
                    employee_id
            ) l ON e.id = l.employee_id
            LEFT JOIN (
                SELECT
                    COUNT(*) AS holiday_count
                FROM
                    events
                WHERE MONTH(Date) = ? AND YEAR(Date) = ?
            ) h ON 1 = 1
            LEFT JOIN
                payroll p ON e.EmpId = p.emp_id
            WHERE
                MONTH(u.date) = ? AND YEAR(u.date) = ?
            GROUP BY
                e.EmpId, e.NameWithInitials, p.basic_salary, p.AttendanceIncentive, p.SuperAttendance,
                p.PerformanceIncentive, p.BRA1, p.BRA2, p.BRA3, p.deductions, l.leave_days, h.holiday_count;
        ", [$month, $year, $month, $year, $month, $year]);

        return response()->json(['data' => $data], 200);
    }

}
