<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if user already exists
        if (User::where('email', 'admin@hrms.com')->exists()) {
            $this->command->info('Default admin user already exists!');
            return;
        }

        // Create default admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@hrms.com',
            'password' => Hash::make('password'), // Default password: password
            'email_verified_at' => now(),
        ]);

        $this->command->info('Default admin user created successfully!');
        $this->command->info('Email: admin@hrms.com');
        $this->command->info('Password: password');
    }
}

