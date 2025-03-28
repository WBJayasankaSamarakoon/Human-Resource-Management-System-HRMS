<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Addallowance extends Model
{
    use HasFactory;

    protected $table = 'addallowance';

    protected $fillable = [
        'Name',
    ];
}
