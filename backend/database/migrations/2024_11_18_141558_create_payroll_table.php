<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('payroll', function (Blueprint $table) {
            $table->id();
            //$table->increments('payroll_id');
            $table->unsignedBigInteger('emp_id');
            $table->decimal('basic_salary', 10, 2)->notNullable();
            $table->decimal('AttendanceIncentive', 10, 2)->default(0.00);
            $table->decimal('SuperAttendance', 10, 2)->default(0.00);
            $table->decimal('PerformanceIncentive', 10, 2)->default(0.00);
            $table->decimal('BRA1', 10, 2)->default(0.00);
            $table->decimal('BRA2', 10, 2)->default(0.00);
            $table->decimal('BRA3', 10, 2)->default(0.00);
            $table->decimal('deductions', 10, 2)->default(0.00);
            $table->decimal('net_salary', 10, 2)
                  ->storedAs('basic_salary + AttendanceIncentive + SuperAttendance + PerformanceIncentive + BRA1 + BRA2 + BRA3 - deductions');
            $table->integer('payment_year');
            $table->integer('payment_month');
            $table->timestamps();

            // Add foreign key constraint
            //$table->foreign('EmpId')->references('emp_id')->on('tblemployees');
        });

    }

    public function down()
    {
        Schema::dropIfExists('payroll');
    }
};
