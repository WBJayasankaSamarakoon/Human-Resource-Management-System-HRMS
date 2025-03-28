<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpShift extends Model
{
    use HasFactory;

    protected $table = 'empshift';

    protected $fillable = [
        'Name',
        'Description',
    ];
/**
     * Relationship with ShiftLine
     */
    public function shiftlines()
    {
        return $this->hasMany(ShiftLine::class, 'empshift_id');
    }
}
