<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UeshrAttendanceDaily extends Model
{
    use HasFactory;

    protected $fillable = [
        'PersonID',
        'Name',
        'Department',
        'Position',
        'Gender',
        'Date',
        'Year',
        'Month',
        'Week',
        'Timetable',
        'CheckIn',
        'CheckOut',
        'Work',
        'OT',
        'Attended',
        'Late',
        'Early',
        'Absent',
        'Leave',
        'Status',
        'Records',
    ];
}
