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
        Schema::create('process_reports', function (Blueprint $table) {
        $table->id();
        $table->year('year');
        $table->tinyInteger('month');
        $table->string('emp_id');
        $table->string('name');
        $table->integer('no_pay_count')->nullable();
        $table->integer('leave_days')->nullable();
        $table->integer('holidays')->nullable();
        $table->decimal('late_hours', 8, 2)->nullable();
        $table->integer('days_worked')->nullable();
        $table->integer('post_approve_leave')->nullable();
        $table->integer('pre_approve_leave')->nullable();
        $table->decimal('basic_salary', 10, 2)->nullable();
        $table->decimal('bra1', 10, 2)->nullable();
        $table->decimal('bra2', 10, 2)->nullable();
        $table->decimal('attendance_incentive', 10, 2)->nullable();
        $table->decimal('super_attendance', 10, 2)->nullable();
        $table->decimal('performance_incentive', 10, 2)->nullable();
        $table->decimal('additional', 10, 2)->nullable();
        $table->decimal('advance', 10, 2)->nullable();
        $table->decimal('stock', 10, 2)->nullable();
        $table->decimal('total_allowances', 10, 2)->nullable();
        $table->decimal('total_deductions', 10, 2)->nullable();
        $table->decimal('gross_salary', 10, 2)->nullable();
        $table->decimal('net_salary', 10, 2)->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('process_reports');
    }
};
