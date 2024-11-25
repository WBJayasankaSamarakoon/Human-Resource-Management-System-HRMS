<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Events;
use App\Models\Tblemployee;
use App\Models\Tblemployees;
use App\Models\Event;
use App\Models\LeaveType;

class DashboardController extends Controller
{
    public function getCounts()
    {
        return response()->json([
            'totalAdmins' => Admin::count(),
            'totalEmployees' => Tblemployee::count(),
            'totalEvents' => Events::count(),
            'totalLeaves' => LeaveType::count(),
        ]);
    }
}
