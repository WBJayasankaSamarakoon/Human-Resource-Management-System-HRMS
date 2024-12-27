<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upexcel extends Model
{
    use HasFactory;

    protected $table = 'upexcel';

    protected $fillable = [
        'index',
        'person_id',
        'name',
        'department',
        'position',
        'gender',
        'date',
        'week',
        'timetable',
        'check_in',
        'check_out',
        'work',
        'ot',
        'attended',
        'late',
        'early',
        'absent',
        'leave',
        'status',
        'records',
        'file_id',
    ];

    // Relationship with UploadedFile
    public function uploadedFile()
    {
        return $this->belongsTo(UploadedFile::class, 'file_id', 'id');
    }

    // Relationship with Tblemployee
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'person_id', 'EmpId');
    }

    // Accessor for late hours (sum of late and early hours converted to hours)
    public function getLateHoursAttribute()
    {
        return round(($this->late + $this->early) / 60, 2);
    }
}
