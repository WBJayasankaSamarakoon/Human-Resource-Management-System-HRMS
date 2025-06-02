<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProcessReport;
use App\Http\Resources\ProcessReportResource;

class ProcessReportController extends Controller
{
    protected $report;

    public function __construct()
    {
        $this->report = new ProcessReport();
    }

    // GET all reports
    public function index()
    {
        $reports = $this->report->all();
        return response()->json(ProcessReportResource::collection($reports), 200);
    }

    // POST - Store new reports
    public function store(Request $request)
    {
        $year = $request->input('year');
        $month = $request->input('month');
        $data = $request->input('data');

        $savedReports = [];

        foreach ($data as $entry) {
            $savedReports[] = $this->report->create([
                'year' => $year,
                'month' => $month,
                'emp_id' => $entry['emp_id'],
                'name' => $entry['name'],
                'no_pay_count' => $entry['no_pay_count'] ?? 0,
                'leave_days' => $entry['leave_days'] ?? 0,
                'holidays' => $entry['holidays'] ?? 0,
                'late_hours' => $entry['late_hours'] ?? 0,
                'days_worked' => $entry['days_worked'] ?? 0,
                'post_approve_leave' => $entry['post_approve_leave'] ?? 0,
                'pre_approve_leave' => $entry['pre_approve_leave'] ?? 0,
                'basic_salary' => $entry['basic_salary'] ?? 0,
                'bra1' => $entry['bra1'] ?? 0,
                'bra2' => $entry['bra2'] ?? 0,
                'attendance_incentive' => $entry['attendance_incentive'] ?? 0,
                'super_attendance' => $entry['super_attendance'] ?? 0,
                'performance_incentive' => $entry['performance_incentive'] ?? 0,
                'additional' => $entry['additional'] ?? 0,
                'advance' => $entry['advance'] ?? 0,
                'stock' => $entry['stock'] ?? 0,
                'total_allowances' => $entry['total_allowances'] ?? 0,
                'total_deductions' => $entry['total_deductions'] ?? 0,
                'gross_salary' => $entry['gross_salary'] ?? 0,
                'net_salary' => $entry['net_salary'] ?? 0,
            ]);
        }

        return response()->json([
            'message' => 'Process reports saved successfully',
            'data' => ProcessReportResource::collection($savedReports)
        ], 201);
    }

    // GET single report
    public function show($id)
    {
        $report = $this->report->find($id);

        if (!$report) {
            return response()->json(['error' => 'Process report not found'], 404);
        }

        return new ProcessReportResource($report);
    }

    // PUT - Update a report
    public function update(Request $request, $id)
    {
        $report = $this->report->find($id);

        if (!$report) {
            return response()->json(['error' => 'Process report not found'], 404);
        }

        $report->update($request->all());

        return response()->json(new ProcessReportResource($report), 200);
    }

    // DELETE - Remove a report
    public function destroy($id)
    {
        $report = $this->report->find($id);

        if (!$report) {
            return response()->json(['error' => 'Process report not found'], 404);
        }

        $report->delete();

        return response()->json(['message' => 'Process report deleted successfully'], 200);
    }
}
