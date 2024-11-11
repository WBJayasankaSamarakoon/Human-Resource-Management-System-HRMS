<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{


    protected $table = 'position';

    protected $fillable = [
        'Name',
    ];
}
