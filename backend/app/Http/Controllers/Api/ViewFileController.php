<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ViewFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;
use DateTime;
use App\Models\ShiftLine;
use App\Models\Leave;
use App\Models\Events;

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

    public function storeSingleRecord(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer',
            'date' => 'required|string',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'required|date_format:H:i',
        ]);

        try {
            // Fetch employee details from the tblemployees table
            $employee = DB::table('tblemployees')->where('EmpId', $request->emp_id)->first();

            if (!$employee) {
                return response()->json(['error' => 'Employee not found.'], 404);
            }

            // Fetch the default shift for the employee
            $defaultShift = $employee->DefaultShift;

            // Fetch the shift details from the shiftline table
            $shiftDetails = DB::table('shiftline')->where('empshift_id', $defaultShift)->get();

            // Check if the date is a weekend (Sunday)
            $date = new DateTime($request->date);
            if ($date->format('N') == 7) {
                return response()->json(['message' => 'Record not added because it is a Sunday.'], 200);
            }

            // Check if the date is a holiday
            $holiday = Events::where('Date', $request->date)->first();
            if ($holiday) {
                return response()->json(['message' => 'Record not added because it is a holiday.'], 200);
            }

            // Check if the date is a leave day
            $leave = Leave::where('employee_id', $request->emp_id)
                ->where('start_date', '<=', $request->date)
                ->where('end_date', '>=', $request->date)
                ->first();
            if ($leave) {
                return response()->json(['message' => 'Record not added because it is a leave day.'], 200);
            }

            // Determine the day of the week
            $dayOfWeek = $date->format('N'); // 1 (Monday) to 7 (Sunday)
            $weekDay = DB::table('week')->where('id', $dayOfWeek)->first();

            // Fetch the shift details for the specific day
            $shiftForDay = $shiftDetails->where('Day', $dayOfWeek)->first();

            // Handle Saturday special case
            if ($dayOfWeek == 6) { // Saturday
                $checkInTime = '08:30:00';
                $checkOutTime = '13:30:00';
            } else {
                $checkInTime = $shiftForDay->StartTime ?? '08:30:00';
                $checkOutTime = $shiftForDay->EndTime ?? '17:30:00';
            }

            // Create a new record in the upexcel table
            ViewFile::create([
                'index' => $request->emp_id,
                'person_id' => $request->emp_id,
                'name' => $employee->NameWithInitials ?? 'Unknown',
                'department' => $employee->Department ?? 'Ultimate Eng',
                'position' => $employee->Designation ?? '-',
                'gender' => $employee->Gender ?? '-',
                'date' => $request->date,
                'week' => $weekDay->Day ?? '-',
                'timetable' => '(' . $checkInTime . '-' . $checkOutTime . ')',
                'check_in' => $request->check_in . ':00',
                'check_out' => $request->check_out . ':00',
                'work' => 0,
                'ot' => 0,
                'attended' => 0,
                'late' => 0,
                'early' => 0,
                'absent' => 0,
                'leave' => 0,
                'status' => '-',
                'records' => 'Manual S Entry',
                'file_id' => $request->file_id,
            ]);

            return response()->json(['message' => 'Attendance record added successfully.'], 200);
        } catch (Exception $e) {
            // Log the error message
            Log::error('Error adding record: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to add record.', 'details' => $e->getMessage()], 500);
        }
    }

    public function storeMonthRecord(Request $request)
{
    $request->validate([
        'emp_id' => 'required|integer',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'file_id' => 'required|integer',
    ]);

    try {
        // Fetch employee
        $employee = DB::table('tblemployees')->where('EmpId', $request->emp_id)->first();
        if (!$employee) {
            return response()->json(['error' => 'Employee not found.'], 404);
        }

        $defaultShiftId = $employee->DefaultShift;

        // Fetch shiftlines related to employee's DefaultShift
        $shiftlines = DB::table('shiftline')
            ->where('empshift_id', $defaultShiftId)
            ->get()
            ->keyBy('Day');

        $startDate = new DateTime($request->start_date);
        $endDate = new DateTime($request->end_date);

        while ($startDate <= $endDate) {
            $date = $startDate->format('Y-m-d');
            $dayOfWeek = $startDate->format('N'); // 1 (Monday) to 7 (Sunday)

            // Check if the employee's shift includes Saturday as a working day
            $isSaturdayWorking = $shiftlines->has(6);

            // Skip Sundays and non-working Saturdays
            if ($dayOfWeek == 7 || ($dayOfWeek == 6 && !$isSaturdayWorking)) {
                $startDate->modify('+1 day');
                continue;
            }

            // Check for holiday
            $holiday = Events::where('Date', $date)->first();
            if ($holiday) {
                $startDate->modify('+1 day');
                continue;
            }

            // Check for leave
            $leave = Leave::where('employee_id', $request->emp_id)
                ->where('start_date', '<=', $date)
                ->where('end_date', '>=', $date)
                ->first();
            if ($leave) {
                $startDate->modify('+1 day');
                continue;
            }

            // Fetch shift times for the selected day
            $shift = $shiftlines->get($dayOfWeek);
            if (!$shift) {
                $startDate->modify('+1 day');
                continue;
            }

            $checkInTime = $shift->StartTime;
            $checkOutTime = $shift->EndTime;

            // Handle Saturdays
            if ($dayOfWeek == 6 && $isSaturdayWorking && !empty($request->saturday_check_out)) {
                $checkOutTime = $request->saturday_check_out;
            }

            // Get weekday name (Monday, etc.)
            $weekDay = DB::table('week')->where('id', $dayOfWeek)->first();

            // Store record
            ViewFile::create([
                'index' => $request->emp_id,
                'person_id' => $request->emp_id,
                'name' => $employee->NameWithInitials ?? 'Unknown',
                'department' => $employee->Department ?? 'Ultimate Eng',
                'position' => $employee->Designation ?? '-',
                'gender' => $employee->Gender ?? '-',
                'date' => $date,
                'week' => $weekDay->Day ?? '-',
                'timetable' => '(' . $checkInTime . '-' . $checkOutTime . ')',
                'check_in' => $checkInTime,
                'check_out' => $checkOutTime,
                'work' => 0,
                'ot' => 0,
                'attended' => 0,
                'late' => 0,
                'early' => 0,
                'absent' => 0,
                'leave' => 0,
                'status' => '-',
                'records' => 'Manual M Entry',
                'file_id' => $request->file_id,
            ]);

            $startDate->modify('+1 day');
        }

        return response()->json(['message' => 'Month attendance records added successfully.'], 200);

    } catch (Exception $e) {
        Log::error('Error adding month records: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to add month records.', 'details' => $e->getMessage()], 500);
    }
}


    public function deleteRecords(Request $request)
{
    $request->validate([
        'recordIds' => 'required|array',
        'recordIds.*' => 'integer',
    ]);

    try {
        // Delete the selected records
        ViewFile::whereIn('id', $request->recordIds)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Records deleted successfully.'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'An error occurred while deleting records.',
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

        // Get the applyAttendanceLogic parameter
        $applyAttendanceLogic = request()->query('applyAttendanceLogic', 'true') === 'true';

        // Query to fetch the combined data with the matching month and year
        $data = DB::select("
        SELECT
            e.EmpId AS emp_id,
            e.NameWithInitials AS name,

            -- Count days without check-in or check-out (excluding Sundays)
            GREATEST(
                SUM(
                    CASE
                        WHEN (u.check_in IS NULL OR u.check_in = '-' OR u.check_out IS NULL OR u.check_out = '-')
                            AND DAYOFWEEK(u.date) != 1
                        THEN
                            CASE
                                WHEN DAYOFWEEK(u.date) = 7 THEN 0.5
                                ELSE 1
                            END
                        ELSE 0
                    END
                ) - IFNULL(l.leave_days, 0) - IFNULL(h.holiday_count, 0),
                0
            ) AS no_pay_count,

            -- Count days worked (valid check-in and check-out)
            SUM(
                CASE
                    WHEN u.check_in IS NOT NULL AND u.check_in != '-'
                         AND u.check_out IS NOT NULL AND u.check_out != '-'
                    THEN
                        CASE WHEN DAYOFWEEK(u.date) = 7 THEN 0.5 ELSE 1 END
                    ELSE 0
                END
            ) AS days_worked,

            IFNULL(l.leave_days, 0) AS leave_days,
            IFNULL(h.holiday_count, 0) AS holidays,

            -- Approve Leave Count
            IFNULL(pa.post_approve_leave, 0) AS post_approve_leave,
            IFNULL(pr.pre_approve_leave, 0) AS pre_approve_leave,
            IFNULL(ua.un_approve_leave, 0) AS un_approve_leave,

            SUM(
    CASE
        WHEN u.check_in IS NOT NULL AND u.check_in != '-'
            AND u.check_out IS NOT NULL AND u.check_out != '-'
            AND s.StartTime IS NOT NULL AND s.EndTime IS NOT NULL THEN
            -- Check if this is a half-day leave (either AM or PM)
            CASE
                -- When it's a half-day leave (either AM or PM)
                WHEN EXISTS (
                    SELECT 1 FROM `leave` l
                    JOIN leaveday ld ON l.leaveday_id = ld.id
                    WHERE l.employee_id = e.id
                    AND ld.Value = 0.5
                    AND u.date BETWEEN l.start_date AND l.end_date
                ) THEN
                    -- For half-day leaves, use HalfTime to determine morning/afternoon
                    CASE
                        -- Morning half-day (check-in before HalfTime)
                        WHEN TIME(STR_TO_DATE(u.check_in, '%H:%i:%s')) < s.HalfTime THEN
                            -- Calculate late arrival only (against StartTime)
                            ROUND(
                                COALESCE(
                                    (
                                        SELECT l.deduction_min
                                        FROM late l
                                        WHERE TIMESTAMPDIFF(
                                            MINUTE,
                                            s.StartTime,
                                            STR_TO_DATE(u.check_in, '%H:%i:%s')
                                        ) BETWEEN l.from_min AND IFNULL(l.to_min, 9999)
                                        ORDER BY l.from_min ASC LIMIT 1
                                    ),
                                    GREATEST(
                                        TIMESTAMPDIFF(
                                            MINUTE,
                                            s.StartTime,
                                            STR_TO_DATE(u.check_in, '%H:%i:%s')
                                        ),
                                        0
                                    )
                                ) / 60.0,
                                2
                            )
                        -- Afternoon half-day (check-in at or after HalfTime)
                        ELSE
                            -- Calculate early departure only (against EndTime)
                            ROUND(
                                COALESCE(
                                    (
                                        SELECT l.deduction_min
                                        FROM late l
                                        WHERE TIMESTAMPDIFF(
                                            MINUTE,
                                            STR_TO_DATE(u.check_out, '%H:%i:%s'),
                                            s.EndTime
                                        ) BETWEEN l.from_min AND IFNULL(l.to_min, 9999)
                                        ORDER BY l.from_min ASC LIMIT 1
                                    ),
                                    GREATEST(
                                        TIMESTAMPDIFF(
                                            MINUTE,
                                            STR_TO_DATE(u.check_out, '%H:%i:%s'),
                                            s.EndTime
                                        ),
                                        0
                                    )
                                ) / 60.0,
                                2
                            )
                    END
                -- Regular full day calculation
                ELSE
                    ROUND(
                        (
                            -- Late arrival minutes (only positive values)
                            COALESCE(
                                (
                                    SELECT l.deduction_min
                                    FROM late l
                                    WHERE TIMESTAMPDIFF(
                                        MINUTE,
                                        s.StartTime,
                                        STR_TO_DATE(u.check_in, '%H:%i:%s')
                                    ) BETWEEN l.from_min AND IFNULL(l.to_min, 9999)
                                    ORDER BY l.from_min ASC LIMIT 1
                                ),
                                GREATEST(
                                    TIMESTAMPDIFF(
                                        MINUTE,
                                        s.StartTime,
                                        STR_TO_DATE(u.check_in, '%H:%i:%s')
                                    ),
                                    0
                                )
                            ) +
                            -- Early departure minutes (only positive values)
                            COALESCE(
                                (
                                    SELECT l.deduction_min
                                    FROM late l
                                    WHERE TIMESTAMPDIFF(
                                        MINUTE,
                                        STR_TO_DATE(u.check_out, '%H:%i:%s'),
                                        s.EndTime
                                    ) BETWEEN l.from_min AND IFNULL(l.to_min, 9999)
                                    ORDER BY l.from_min ASC LIMIT 1
                                ),
                                GREATEST(
                                    TIMESTAMPDIFF(
                                        MINUTE,
                                        STR_TO_DATE(u.check_out, '%H:%i:%s'),
                                        s.EndTime
                                    ),
                                    0
                                )
                            )
                        ) / 60.0,
                        2
                    )
            END
        ELSE 0
    END
) AS late_hours,

            IFNULL(a.type, 0) AS allowance_type,
            IFNULL(a.amount, 0) AS allowance_amount,

            IFNULL(d.type, 0) AS deduction_type,
            IFNULL(d.amount, 0) AS deduction_amount,

            (p.basic_salary + p.BRA1 + p.BRA2) AS gross_salary,

            p.basic_salary,
            COALESCE(sp.AttendanceIncentive, p.AttendanceIncentive) AS AttendanceIncentive,
            p.SuperAttendance,
            p.PerformanceIncentive,
            p.BRA1,
            p.BRA2,

            (
        COALESCE(sp.AttendanceIncentive, p.AttendanceIncentive) +
        p.SuperAttendance +
        p.PerformanceIncentive +
        p.BRA1 +
        p.BRA2 +
        IFNULL(a.amount, 0) -
        IFNULL(d.amount, 0)
    ) AS net_salary,

            (par.work - IFNULL(pa.post_approve_leave, 0)) AS daysForAttendanceIncentive,

            CASE
                WHEN IFNULL(l.leave_days, 0) >= IFNULL(par.leave, 0) THEN 0
                ELSE
                    ROUND(COALESCE(sp.AttendanceIncentive, p.AttendanceIncentive))
            END AS AttendanceIncentive,

            FLOOR(
                p.PerformanceIncentive -
                ((p.PerformanceIncentive / par.work) * GREATEST(
                    SUM(
                        CASE
                            WHEN (u.check_in IS NULL OR u.check_in = '-' OR u.check_out IS NULL OR u.check_out = '-')
                                AND DAYOFWEEK(u.date) != 1
                            THEN
                                CASE
                                    WHEN DAYOFWEEK(u.date) = 7 THEN 0.5
                                    ELSE 1
                                END
                            ELSE 0
                        END
                    ) - IFNULL(l.leave_days, 0) - IFNULL(h.holiday_count, 0),
                    0
                ))
            ) AS PerformanceIncentive,

            (COALESCE(sp.AttendanceIncentive, p.AttendanceIncentive) + p.SuperAttendance + p.PerformanceIncentive + p.BRA1 + p.BRA2 + a.amount ) AS total_allowances,

            (d.amount ) AS total_deductions,

            -- EPF and ETF calculations based on EpfEligible status
            CASE
                WHEN e.EpfEligible = 1 THEN par.epfEmp
                ELSE 0
            END AS epfEmp,

            CASE
                WHEN e.EpfEligible = 1 THEN par.epfCom
                ELSE 0
            END AS epfCom,

            CASE
                WHEN e.EpfEligible = 1 THEN par.etfCom
                ELSE 0
            END AS etfCom

        FROM upexcel u
        JOIN tblemployees e ON u.person_id = e.EmpId

        LEFT JOIN allowances a ON e.EmpId = a.emp_id
        AND MONTH(a.payment_date) = ? AND YEAR(a.payment_date) = ?
        AND a.is_active = 1

        LEFT JOIN deductions d ON e.EmpId = d.emp_id
        AND MONTH(d.payment_date) = ? AND YEAR(d.payment_date) = ?
        AND d.is_active = 1

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
            WHERE MONTH(l.start_date) = ? AND YEAR(l.start_date) = ?
            GROUP BY l.employee_id
        ) l ON e.id = l.employee_id

        LEFT JOIN (
            SELECT employee_id, COUNT(*) AS post_approve_leave
            FROM `leave`
            WHERE approve = 1 AND MONTH(start_date) = ? AND YEAR(start_date) = ?
            GROUP BY employee_id
        ) pa ON e.id = pa.employee_id

        LEFT JOIN (
            SELECT employee_id, COUNT(*) AS pre_approve_leave
            FROM `leave`
            WHERE approve = 2 AND MONTH(start_date) = ? AND YEAR(start_date) = ?
            GROUP BY employee_id
        ) pr ON e.id = pr.employee_id

         LEFT JOIN (
            SELECT employee_id, COUNT(*) AS un_approve_leave
            FROM `leave`
            WHERE approve = 3 AND MONTH(start_date) = ? AND YEAR(start_date) = ?
            GROUP BY employee_id
        ) ua ON e.id = ua.employee_id

        LEFT JOIN (
            SELECT
                SUM(
                    CASE
                        WHEN DAYOFWEEK(Date) = 1 THEN 0   -- Sunday (excluded from count)
                        WHEN DAYOFWEEK(Date) = 7 THEN 0.5 -- Saturday (count as 0.5)
                        ELSE 1                            -- Other days (count as 1)
                    END
                ) AS holiday_count
            FROM events
            WHERE MONTH(Date) = ? AND YEAR(Date) = ?
        ) h ON 1 = 1

        LEFT JOIN payroll p ON e.EmpId = p.emp_id
        AND p.is_active = 1

        LEFT JOIN special sp ON e.EmpId = sp.emp_id -- Join with special table
        AND MONTH(sp.payment_date) = ? AND YEAR(sp.payment_date) = ?

        LEFT JOIN empshift es ON e.DefaultShift = es.id
        LEFT JOIN shiftline s ON s.empshift_id = es.id
            AND s.Day = (
                SELECT id FROM week WHERE week.Day = DATE_FORMAT(u.date, '%a.') LIMIT 1
            )

        LEFT JOIN parameter par ON 1 = 1

        WHERE MONTH(u.date) = ? AND YEAR(u.date) = ?

        GROUP BY e.EmpId, e.NameWithInitials, p.basic_salary, p.AttendanceIncentive,
                p.SuperAttendance, p.PerformanceIncentive,
                p.BRA1, p.BRA2, l.leave_days, a.type, a.amount, d.type, d.amount,
                h.holiday_count, pa.post_approve_leave, pr.pre_approve_leave, ua.un_approve_leave, sp.AttendanceIncentive, e.EpfEligible, par.epfEmp, par.epfCom, par.etfCom, par.work, par.leave;

    ", [$month, $year, $month, $year, $month, $year, $month, $year, $month, $year, $month, $year, $month, $year, $month, $year, $month, $year]);

    return response()->json(['year' => $year, 'month' => $month, 'data' => $data], 200);
}
}
