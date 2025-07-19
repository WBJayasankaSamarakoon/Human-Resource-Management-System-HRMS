<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProcessReport;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class YeareportController extends Controller
{
    // GET all reports, optionally filter by year/month
    public function index(Request $request): JsonResponse
    {
        $year = $request->query('year');
        $month = $request->query('month');

        $query = ProcessReport::query();

        if ($year) {
            $query->where('year', $year);
        }

        if ($month) {
            $query->where('month', $month);
        }

        $reports = $query->orderBy('month')->get();

        return response()->json($reports, 200);
    }

    // GET single report
    public function show($id): JsonResponse
    {
        $report = ProcessReport::find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        return response()->json($report, 200);
    }

    // POST create new report
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'year' => 'required|digits:4',
            'month' => 'required|integer|min:1|max:12',
            'emp_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'no_pay_count' => 'nullable|integer',
            'leave_days' => 'nullable|integer',
            'holidays' => 'nullable|integer',
            'late_hours' => 'nullable|numeric',
            'days_worked' => 'nullable|integer',
            'post_approve_leave' => 'nullable|integer',
            'pre_approve_leave' => 'nullable|integer',
            'basic_salary' => 'nullable|numeric',
            'bra1' => 'nullable|numeric',
            'bra2' => 'nullable|numeric',
            'attendance_incentive' => 'nullable|numeric',
            'super_attendance' => 'nullable|numeric',
            'performance_incentive' => 'nullable|numeric',
            'additional' => 'nullable|numeric',
            'advance' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'total_allowances' => 'nullable|numeric',
            'total_deductions' => 'nullable|numeric',
            'gross_salary' => 'nullable|numeric',
            'net_salary' => 'nullable|numeric',
        ]);

        $report = ProcessReport::create($validated);

        return response()->json($report, 201);
    }

    // PUT update existing report
    public function update(Request $request, $id): JsonResponse
    {
        $report = ProcessReport::find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $validated = $request->validate([
            'year' => 'sometimes|digits:4',
            'month' => 'sometimes|integer|min:1|max:12',
            'emp_id' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'no_pay_count' => 'nullable|integer',
            'leave_days' => 'nullable|integer',
            'holidays' => 'nullable|integer',
            'late_hours' => 'nullable|numeric',
            'days_worked' => 'nullable|integer',
            'post_approve_leave' => 'nullable|integer',
            'pre_approve_leave' => 'nullable|integer',
            'basic_salary' => 'nullable|numeric',
            'bra1' => 'nullable|numeric',
            'bra2' => 'nullable|numeric',
            'attendance_incentive' => 'nullable|numeric',
            'super_attendance' => 'nullable|numeric',
            'performance_incentive' => 'nullable|numeric',
            'additional' => 'nullable|numeric',
            'advance' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'total_allowances' => 'nullable|numeric',
            'total_deductions' => 'nullable|numeric',
            'gross_salary' => 'nullable|numeric',
            'net_salary' => 'nullable|numeric',
        ]);

        $report->update($validated);

        return response()->json($report, 200);
    }

    // DELETE report
    public function destroy($id): JsonResponse
    {
        $report = ProcessReport::find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $report->delete();

        return response()->json(['message' => 'Report deleted successfully'], 200);
    }
}
