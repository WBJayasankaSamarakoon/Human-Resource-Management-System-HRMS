<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shiftline', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('empshift_id');
            $table->unsignedBigInteger('Day');
            $table->unsignedBigInteger('Name');
            $table->time('StartTime');
            $table->time('HalfTime')->nullable();
            $table->time('EndTime');
            $table->timestamps();

            // Foreign key for empshift_id
            $table->foreign('empshift_id')->references('id')->on('empshift')->onDelete('cascade');

            // Foreign key for Day
            $table->foreign('Day')->references('id')->on('week')->onDelete('cascade');

            // Foreign key for Shift Line
            $table->foreign('Name')->references('id')->on('typeshift')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shiftline');
    }
};
