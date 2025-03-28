<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Upexcel;
use App\Models\UploadedFile;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;
use Exception;

class UpexcelController extends Controller
{
    // Fetch data by year and month or return all
    public function index(Request $request)
    {
        $year = $request->query('year');
        $month = $request->query('month');

        if ($year && $month) {
            return Upexcel::whereYear('date', $year)
                ->whereMonth('date', $month)
                ->get();
        }

        return Upexcel::all();
    }

    // Store uploaded file data and associated rows
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
            'year' => 'required|integer',
            'month' => 'required|integer',
        ]);

        $file = $request->file('file');
        $filePath = $file->getPathName();
        $fileName = $file->getClientOriginalName();

        try {
            // Create a record in uploaded_files table
            $uploadedFile = UploadedFile::create([
                'file_name' => $fileName,
                'year' => $request->year,
                'month' => $request->month,
            ]);

            // Parse Excel file
            $spreadsheet = IOFactory::load($filePath);
            $sheetData = $spreadsheet->getActiveSheet()->toArray();

            // Skip header and import rows
            foreach (array_slice($sheetData, 2) as $row) {
                if (isset($row[0]) && is_numeric($row[0])) {
                    Upexcel::create([
                        'file_id' => $uploadedFile->id,
                        'index' => (int) $row[0],
                        'person_id' => (int) $row[1],
                        'name' => $row[2],
                        'department' => $row[3],
                        'position' => $row[4] ?? null,
                        'gender' => $row[5],
                        'date' => $row[6],
                        'week' => $row[7],
                        'timetable' => $row[8],
                        'check_in' => $row[9] ?? null,
                        'check_out' => $row[10] ?? null,
                        'work' => isset($row[11]) ? (int) $row[11] : null,
                        'ot' => isset($row[12]) ? (int) $row[12] : null,
                        'attended' => isset($row[13]) ? (int) $row[13] : null,
                        'late' => isset($row[14]) ? (int) $row[14] : null,
                        'early' => isset($row[15]) ? (int) $row[15] : null,
                        'absent' => isset($row[16]) ? (int) $row[16] : null,
                        'leave' => isset($row[17]) ? (int) $row[17] : null,
                        'status' => $row[18] ?? null,
                        'records' => $row[19] ?? null,
                    ]);
                }
            }

            return response()->json(['message' => 'Excel data imported successfully!']);
        } catch (Exception $e) {
            \Log::error('Error importing Excel: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to import data'], 500);
        }
    }

    // View data associated with a specific file
    public function viewFile($id)
    {
        if ($id === 'undefined') {
            return response()->json(['error' => 'Invalid file ID'], 400);
        }

        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $data = Upexcel::where('file_id', $file->id)->get();

        if ($data->isEmpty()) {
            return response()->json(['error' => 'No data found for the selected file'], 404);
        }

        return response()->json($data);
    }

    // Delete file and associated data
    public function deleteFile($id)
    {
        if ($id === 'undefined') {
            return response()->json(['error' => 'Invalid file ID'], 400);
        }

        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Delete all related rows in upexcel table
        Upexcel::where('file_id', $file->id)->delete();

        // Delete the file record
        $file->delete();

        return response()->json(['message' => 'File and related data deleted successfully!']);
    }
}

    // Fetch combined data
    // public function getCombinedData()
    // {
    //     $data = DB::select("
    //         SELECT
    //             e.EmpId AS emp_id,
    //             e.NameWithInitials AS name,
    //             COUNT(
    //                 CASE
    //                     WHEN (u.check_in IS NULL OR u.check_in = '00:00:00' OR u.check_out IS NULL OR u.check_out = '00:00:00')
    //                     THEN 1
    //                 END
    //             ) AS no_pay_count,
    //             IFNULL(l.leave_days, 0) AS leave_days,
    //             IFNULL(h.holiday_count, 0) AS holidays,
    //             ROUND(SUM(u.late) / 60 + SUM(u.early) / 60, 2) AS late_hours,
    //             p.basic_salary,
    //             p.AttendanceIncentive,
    //             p.SuperAttendance,
    //             p.PerformanceIncentive,
    //             p.BRA1,
    //             p.BRA2,
    //             p.BRA3,
    //             p.deductions,
    //             (p.basic_salary + p.AttendanceIncentive + p.SuperAttendance + p.PerformanceIncentive + p.BRA1 + p.BRA2 + p.BRA3 - p.deductions) AS net_salary,
    //             (p.AttendanceIncentive + p.SuperAttendance + p.PerformanceIncentive + p.BRA1 + p.BRA2 + p.BRA3) AS total_allowances
    //         FROM
    //             upexcel u
    //         JOIN
    //             tblemployees e ON u.person_id = e.EmpId
    //         LEFT JOIN (
    //             SELECT
    //                 employee_id,
    //                 SUM(DATEDIFF(end_date, start_date) + 1) AS leave_days
    //             FROM
    //                 `leave`
    //             GROUP BY
    //                 employee_id
    //         ) l ON e.id = l.employee_id
    //         LEFT JOIN (
    //             SELECT
    //                 COUNT(*) AS holiday_count
    //             FROM
    //                 events
    //         ) h ON 1 = 1
    //         LEFT JOIN
    //             payroll p ON e.EmpId = p.emp_id
    //         GROUP BY
    //             e.EmpId, e.NameWithInitials, p.basic_salary, p.AttendanceIncentive, p.SuperAttendance,
    //             p.PerformanceIncentive, p.BRA1, p.BRA2, p.BRA3, p.deductions
    //     ");

    //     return response()->json(['data' => $data]);
    // }
// }
