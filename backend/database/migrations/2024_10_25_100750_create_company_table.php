<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company', function (Blueprint $table) {
            $table->id();
            $table->string('Name', 255);
            $table->string('Address', 255)->nullable();
            $table->string('Email', 255)->nullable();
            $table->string('Telephone', 20)->nullable();
            $table->string('Fax', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('company');
    }
};
