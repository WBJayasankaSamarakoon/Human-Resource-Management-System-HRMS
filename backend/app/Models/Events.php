<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = ['Title', 'Date'];

    // Scope for filtering by month and year
    public function scopeForMonthAndYear($query, $month, $year)
    {
        return $query->whereYear('Date', $year)->whereMonth('Date', $month);
    }
}
