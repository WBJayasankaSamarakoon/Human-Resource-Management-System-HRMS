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
        Schema::create('special', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('emp_id');
            $table->date('payment_date');
            $table->integer('leave_count')->default(0);
            $table->enum('type', ['full', 'partial'])->default('full');
            $table->decimal('AttendanceIncentive', 10, 2)->default(0.00);
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('special');
    }
};
