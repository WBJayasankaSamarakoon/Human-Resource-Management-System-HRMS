<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftLine extends Model
{
    use HasFactory;

    protected $table = 'shiftline';

    protected $fillable = [
        'empshift_id',
        'StartTime',
        'HalfTime',
        'EndTime',
        'Day',
        'Name',
    ];

    /**
     * Relationship with EmpShift
     */
    public function empshift()
    {
        return $this->belongsTo(EmpShift::class, 'empshift_id');
    }

    /**
     * Relationship with Week
     */
    public function week()
    {
        return $this->belongsTo(Week::class, 'Day', 'id');
    }

    /**
     * Relationship with Shift Type
     */
    public function typeshift()
    {
        return $this->belongsTo(TypeShift::class, 'Name', 'id'); // Fixed class name
    }
}
