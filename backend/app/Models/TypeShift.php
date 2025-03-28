<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeShift extends Model
{
    protected $table = 'typeshift';

    protected $fillable = [
        'Name',
        'Value',
    ];
}
