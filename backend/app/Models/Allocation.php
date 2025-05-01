<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allocation extends Model
{
    use HasFactory;

    protected $table = 'allocation';

    protected $fillable = [
        'employee_id',
        'year',
        'leave_type_id',
        'leave_count',
    ];

    // Relationships (optional but recommended if you have Employee and LeaveType models)
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'employee_id');
    }

    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id');
    }
}
