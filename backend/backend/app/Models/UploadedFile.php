<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    // Define the table name if it's not "uploaded_files"
    protected $table = 'uploaded_files';

    // Define the fillable fields
    protected $fillable = ['file_name', 'year', 'month'];
}
