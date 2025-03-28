<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allowances extends Model
{
    use HasFactory;

    protected $table = 'allowances';

    protected $fillable = [
        'emp_id',
        'type',
        'amount',
        'payment_date',
        'is_active',
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'emp_id', 'EmpId');
    }

    // Relationship to AddAllowance
    public function allowanceTypes()
    {
        return $this->belongsTo(Addallowance::class, 'type', 'id');
    }
}

