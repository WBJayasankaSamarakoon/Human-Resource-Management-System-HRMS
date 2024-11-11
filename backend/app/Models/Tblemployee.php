<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblemployee extends Model
{
    use HasFactory;

    protected $table = 'tblemployees';

    protected $fillable = [
        'EmpId',
        'NameWithInitials',
        'EPFNumber',
        'Phone',
        'CurrentAddress',
        'PermanentAddress',
        'PersonalEmail',
        'CompanyEmail',
        'DateOfJoining',
        'Status',
        'Designation',
        'Branch',
    ];
}
