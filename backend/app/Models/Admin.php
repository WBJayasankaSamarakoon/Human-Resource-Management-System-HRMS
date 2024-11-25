<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Use Authenticatable instead of Model
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'admin';

    protected $fillable = [
        'username',
        'email',
        'password',
    ];
}
