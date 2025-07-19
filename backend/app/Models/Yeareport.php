<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Yeareport extends Model
{
    use HasFactory;

    protected $table = 'process_reports';

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

    protected $casts = [
        'year' => 'integer',
        'month' => 'integer',
        'no_pay_count' => 'integer',
        'leave_days' => 'integer',
        'holidays' => 'integer',
        'late_hours' => 'decimal:2',
        'days_worked' => 'integer',
        'post_approve_leave' => 'integer',
        'pre_approve_leave' => 'integer',
        'basic_salary' => 'decimal:2',
        'bra1' => 'decimal:2',
        'bra2' => 'decimal:2',
        'attendance_incentive' => 'decimal:2',
        'super_attendance' => 'decimal:2',
        'performance_incentive' => 'decimal:2',
        'additional' => 'decimal:2',
        'advance' => 'decimal:2',
        'stock' => 'decimal:2',
        'total_allowances' => 'decimal:2',
        'total_deductions' => 'decimal:2',
        'gross_salary' => 'decimal:2',
        'net_salary' => 'decimal:2',
    ];
}
