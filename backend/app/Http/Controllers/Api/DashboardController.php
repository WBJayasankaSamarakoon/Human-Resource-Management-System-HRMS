<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Events;
use App\Models\Tblemployee;
use App\Models\LeaveType;
use App\Models\Leave;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getCounts()
    {
        $totalEmployees = Tblemployee::count();
        $activeEmployees = Tblemployee::where('Status', 'Active')->count();
        $inactiveEmployees = Tblemployee::where('Status', '!=', 'Active')->orWhereNull('Status')->count();
        
        // Recent employees (last 5)
        $recentEmployees = Tblemployee::where('Status', 'Active')
            ->orderBy('DateOfJoining', 'desc')
            ->take(5)
            ->select('id', 'EmpId', 'NameWithInitials', 'Designation', 'Department', 'DateOfJoining')
            ->get()
            ->map(function ($emp) {
                return [
                    'id' => $emp->id,
                    'empId' => $emp->EmpId,
                    'name' => $emp->NameWithInitials,
                    'designation' => $emp->Designation,
                    'department' => $emp->Department,
                    'dateOfJoining' => $emp->DateOfJoining,
                ];
            });

        // Upcoming work anniversaries (next 30 days based on DateOfJoining)
        $upcomingAnniversaries = Tblemployee::where('Status', 'Active')
            ->whereNotNull('DateOfJoining')
            ->get()
            ->filter(function ($emp) {
                if (!$emp->DateOfJoining) return false;
                $joiningDate = Carbon::parse($emp->DateOfJoining);
                $thisYear = Carbon::now()->year;
                $anniversaryThisYear = $joiningDate->copy()->year($thisYear);
                $anniversaryNextYear = $joiningDate->copy()->year($thisYear + 1);
                
                $now = Carbon::now();
                $daysUntilThisYear = $now->diffInDays($anniversaryThisYear, false);
                $daysUntilNextYear = $now->diffInDays($anniversaryNextYear, false);
                
                // Check if anniversary is within next 30 days (either this year or next year)
                return ($daysUntilThisYear >= 0 && $daysUntilThisYear <= 30) || 
                       ($daysUntilNextYear >= 0 && $daysUntilNextYear <= 30);
            })
            ->sortBy(function ($emp) {
                $joiningDate = Carbon::parse($emp->DateOfJoining);
                $thisYear = Carbon::now()->year;
                $anniversaryThisYear = $joiningDate->copy()->year($thisYear);
                $anniversaryNextYear = $joiningDate->copy()->year($thisYear + 1);
                $now = Carbon::now();
                $daysUntilThisYear = $now->diffInDays($anniversaryThisYear, false);
                $daysUntilNextYear = $now->diffInDays($anniversaryNextYear, false);
                
                if ($daysUntilThisYear >= 0) return $daysUntilThisYear;
                return $daysUntilNextYear;
            })
            ->take(5)
            ->map(function ($emp) {
                $joiningDate = Carbon::parse($emp->DateOfJoining);
                $thisYear = Carbon::now()->year;
                $anniversaryThisYear = $joiningDate->copy()->year($thisYear);
                $anniversaryNextYear = $joiningDate->copy()->year($thisYear + 1);
                $now = Carbon::now();
                $daysUntilThisYear = $now->diffInDays($anniversaryThisYear, false);
                $daysUntilNextYear = $now->diffInDays($anniversaryNextYear, false);
                
                $daysUntil = $daysUntilThisYear >= 0 ? $daysUntilThisYear : $daysUntilNextYear;
                $yearsOfService = $now->year - $joiningDate->year;
                
                return [
                    'id' => $emp->id,
                    'empId' => $emp->EmpId,
                    'name' => $emp->NameWithInitials,
                    'designation' => $emp->Designation,
                    'dateOfJoining' => $emp->DateOfJoining,
                    'daysUntil' => $daysUntil,
                    'yearsOfService' => $yearsOfService,
                ];
            })
            ->values();

        // Pending leave requests
        $pendingLeaves = Leave::where('approve', 0)
            ->with(['employee', 'leaveType'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($leave) {
                return [
                    'id' => $leave->id,
                    'employeeName' => $leave->employee ? $leave->employee->NameWithInitials : 'N/A',
                    'leaveType' => $leave->leaveType ? $leave->leaveType->LeaveType : 'N/A',
                    'startDate' => $leave->start_date,
                    'endDate' => $leave->end_date,
                    'days' => Carbon::parse($leave->start_date)->diffInDays(Carbon::parse($leave->end_date)) + 1,
                ];
            });

        // Employees by department
        $employeesByDepartment = Tblemployee::where('Status', 'Active')
            ->whereNotNull('Department')
            ->select('Department', DB::raw('count(*) as count'))
            ->groupBy('Department')
            ->orderBy('count', 'desc')
            ->get();

        // Recent events (upcoming)
        $upcomingEvents = Events::where('Date', '>=', Carbon::now()->toDateString())
            ->orderBy('Date', 'asc')
            ->take(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->Name,
                    'date' => $event->Date,
                    'type' => $event->Type ?? 'Event',
                ];
            });

        return response()->json([
            'totalAdmins' => Admin::count(),
            'totalEmployees' => $totalEmployees,
            'activeEmployees' => $activeEmployees,
            'inactiveEmployees' => $inactiveEmployees,
            'totalEvents' => Events::count(),
            'totalLeaves' => LeaveType::count(),
            'pendingLeavesCount' => Leave::where('approve', 0)->count(),
            'recentEmployees' => $recentEmployees,
            'upcomingAnniversaries' => $upcomingAnniversaries,
            'pendingLeaves' => $pendingLeaves,
            'employeesByDepartment' => $employeesByDepartment,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }
}
