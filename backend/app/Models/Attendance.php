<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'Index',
        'PersonID',
        'Name',
        'Department',
        'Position',
        'Gender',
        'Date',
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
        'Records'
    ];
}
