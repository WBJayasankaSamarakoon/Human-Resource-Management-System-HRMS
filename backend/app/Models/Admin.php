<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    protected $table = 'admin';
    protected $fillable = ['username', 'email', 'password'];
    protected $hidden = ['password'];

}
