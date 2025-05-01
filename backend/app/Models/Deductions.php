<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deductions extends Model
{

    use HasFactory;

    protected $table = 'deductions';

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

        public function deductionType()
        {
            return $this->belongsTo(Adddeduction::class, 'type', 'id');
        }
}
