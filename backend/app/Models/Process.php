<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;

    // Define the table name
    // protected $table = 'processes';

    // // Define the fillable fields
    // protected $fillable = [
    //     'emp_id',
    //     'name',
    //     'no_pay_count',
    //     'leave_days',
    //     'holidays',
    //     'late_hours',
    //     'basic_salary',
    //     'attendance_incentive',
    //     'super_attendance',
    //     'performance_incentive',
    //     'bra1',
    //     'bra2',
    //     'bra3',
    //     'deductions',
    //     'net_salary',
    //     'total_allowances',
    // ];

    // If you have relationships, you can define them here, e.g.
    // public function employee()
    // {
    //     return $this->belongsTo(Tblemployee::class, 'emp_id', 'EmpId');
    // }
}
