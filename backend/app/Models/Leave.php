<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $table = 'leave';
    protected $fillable = [
        'employee_id',
        'leave_type_id',
        'start_date',
        'end_date',
        'approve',
        'leaveday_id',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'employee_id');
    }

    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id');
    }

    public function leaveapprove()
    {
        return $this->belongsTo(LeaveApprove::class, 'leaveapprove_id');
    }

    public function leaveday()
    {
        return $this->belongsTo(LeaveDay::class, 'leaveday_id');
    }
}
