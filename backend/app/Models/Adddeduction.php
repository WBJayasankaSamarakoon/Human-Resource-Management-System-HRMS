<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Adddeduction extends Model
{
    use HasFactory;

    protected $table = 'adddeduction';

    protected $fillable = [
        'Name',
    ];
}
