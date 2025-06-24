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
        Schema::create('asset_allocations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('emp_id');
            $table->unsignedBigInteger('asset_id');
            $table->date('give_date');
            $table->date('handover_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_allocations');
    }
};
