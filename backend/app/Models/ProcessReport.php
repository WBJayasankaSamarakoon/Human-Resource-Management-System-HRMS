<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessReport extends Model
{
    protected $fillable = [
        'year',
        'month',
        'emp_id',
        'name',
        'no_pay_count',
        'leave_days',
        'holidays',
        'late_hours',
        'days_worked',
        'post_approve_leave',
        'pre_approve_leave',
        'basic_salary',
        'bra1',
        'bra2',
        'attendance_incentive',
        'super_attendance',
        'performance_incentive',
        'additional',
        'advance',
        'stock',
        'total_allowances',
        'total_deductions',
        'gross_salary',
        'net_salary',
    ];
}
