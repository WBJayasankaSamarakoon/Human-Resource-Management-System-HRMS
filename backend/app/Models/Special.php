<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Special extends Model
{
    use HasFactory;

    protected $table = 'special';

    protected $fillable = [
        'emp_id',
        'payment_date',
        'type',
        'leave_count',
        'AttendanceIncentive',
    ];

    // Relationship: Get Employee Details
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'emp_id', 'EmpId');
    }

    // Relationship: Fetch Payroll Data
    public function payroll()
    {
        return $this->belongsTo(Payroll::class, 'emp_id', 'emp_id');
    }

    // Relationship: Fetch Leave Data
    public function leave()
    {
        return $this->belongsTo(Leave::class, 'emp_id', 'employee_id');
    }
}
