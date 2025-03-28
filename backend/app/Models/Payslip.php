<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payslip extends Model
{
    use HasFactory;

    protected $table = 'upexcelzero';

    protected $fillable = [
        'PersonID',
        'Name',
        'Department',
        'Position',
        'Gender',
        'Date',
        'DayOfWeek',
        'Timetable',
        'FirstIn',
        'LastOut',
    ];
}
