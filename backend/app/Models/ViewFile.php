<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewFile extends Model
{
    use HasFactory;

    // Specify the table name
    protected $table = 'upexcel';

    // Specify the fillable fields
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
}
