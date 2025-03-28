<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Late extends Model
{
    use HasFactory;

    protected $table = 'late';

    protected $fillable = [
        'from_min',
        'to_min',
        'deduction_min'
    ];
}
