<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Parameter extends Model
{
    use HasFactory;

    protected $table = 'parameter';

    protected $fillable = [
        'work',
        'hours',
        'leave',
        'epfEmp',
        'epfCom',
        'etfCom',
        'ot',
        'specot',
        'ot_hours'
    ];
}
