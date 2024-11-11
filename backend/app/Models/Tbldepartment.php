<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbldepartment extends Model
{
    use HasFactory;

    protected $table = 'tbldepartments';

    protected $fillable = [
        'DepartmentName',
        'DepartmentShortName',
        'DepartmentCode',
    ];
}
