<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Week extends Model
{
    protected $table = 'week';

    protected $fillable = [
        'Day',
    ];
}
