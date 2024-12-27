<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    protected $table = 'uploaded_files';

    protected $fillable = ['file_name', 'year', 'month'];

    // Relationship with Upexcel
    public function upexcel()
    {
        return $this->hasMany(Upexcel::class, 'file_id', 'id');
    }
}
