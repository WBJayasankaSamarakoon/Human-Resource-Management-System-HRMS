<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $table = 'payroll';

    protected $fillable = [
        'emp_id',
        'basic_salary',
        'AttendanceIncentive',
        // 'D_AttendanceIncentive',
        'SuperAttendance',
        'PerformanceIncentive',
        'BRA1',
        'BRA2',
        'tax',
        'commission',
        // 'deductions',
        // 's_advance',
        // 't_expenses',
        'payment_date',
        'is_active',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
    ];

    // Define the relationship with Tblemployee
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'emp_id', 'EmpId');
    }

    // Add a dynamic accessor for all allowances
    public function getAllowancesAttribute()
    {
        return [
            'AttendanceIncentive' => $this->AttendanceIncentive,
            'SuperAttendance' => $this->SuperAttendance,
            'PerformanceIncentive' => $this->PerformanceIncentive,
            'BRA1' => $this->BRA1,
            'BRA2' => $this->BRA2,
            // 'BRA3' => $this->BRA3,
            // 'commission' => $this->BRA3,
        ];
    }
}
