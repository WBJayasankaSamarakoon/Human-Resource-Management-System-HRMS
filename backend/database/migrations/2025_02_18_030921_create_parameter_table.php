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
        Schema::create('parameter', function (Blueprint $table) {
            $table->id();
            $table->integer('work')->default(0);
            $table->integer('hours')->default(0);
            $table->integer('leave')->default(0);
            // percentage fields
            $table->decimal('epfEmp', 5, 2)->default(0); // EPF Employee (%)
            $table->decimal('epfCom', 5, 2)->default(0); // EPF Company (%)
            $table->decimal('etfCom', 5, 2)->default(0); // ETF Company (%)
            $table->decimal('ot',5,2)->default(0);
            $table->decimal('specot',5,2)->default(0);
            $table->decimal('ot_hours', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parameter');
    }
};
