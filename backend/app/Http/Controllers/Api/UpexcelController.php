<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Upexcel;
use App\Models\UploadedFile;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Exception;

class UpexcelController extends Controller
{
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
            UploadedFile::create([
                'file_name' => $fileName,
                'year' => $request->year,
                'month' => $request->month,
            ]);

            $spreadsheet = IOFactory::load($filePath);
            $sheetData = $spreadsheet->getActiveSheet()->toArray();

            foreach (array_slice($sheetData, 2) as $row) {
                if (isset($row[0]) && is_numeric($row[0])) {
                    Upexcel::create([
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
                        'work' => (int) $row[11],
                        'ot' => (int) $row[12],
                        'attended' => (int) $row[13],
                        'late' => (int) $row[14],
                        'early' => (int) $row[15],
                        'absent' => (int) $row[16],
                        'leave' => (int) $row[17],
                        'status' => $row[18],
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

    public function viewFile($id)
    {
        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $data = Upexcel::whereYear('date', $file->year)
            ->whereMonth('date', $file->month)
            ->get();

        if ($data->isEmpty()) {
            return response()->json(['error' => 'No data found for the selected file'], 404);
        }

        return response()->json($data);
    }

    public function deleteFile($id)
    {
        $file = UploadedFile::find($id);

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        Upexcel::whereYear('date', $file->year)
            ->whereMonth('date', $file->month)
            ->delete();

        $file->delete();

        return response()->json(['message' => 'File and related data deleted successfully!']);
    }
}
