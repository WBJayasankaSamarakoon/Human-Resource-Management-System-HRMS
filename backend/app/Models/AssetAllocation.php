<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetAllocation extends Model
{
    use HasFactory;

    protected $table = 'asset_allocations';

    protected $fillable = [
        'emp_id',
        'asset_id',
        'give_date',
        'handover_date',
        'description'
    ];

    // Relationships
    public function employee()
    {
        return $this->belongsTo(Tblemployee::class, 'emp_id');
    }

    public function asset()
    {
        return $this->belongsTo(Assets::class, 'asset_id');
    }
}
