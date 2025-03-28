<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveDay extends Model
{
    protected $table = 'leaveday';

    protected $fillable = [
        'Name',
        'Value',
    ];
}
