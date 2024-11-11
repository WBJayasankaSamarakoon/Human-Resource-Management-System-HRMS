<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->increments('Index');
            $table->integer('PersonID')->nullable();
            $table->string('Name', 255)->nullable();
            $table->string('Department', 255)->nullable();
            $table->string('Position', 255)->nullable();
            $table->string('Gender', 10)->nullable();
            $table->date('Date')->nullable();
            $table->string('Week', 10)->nullable();
            $table->string('Timetable', 255)->nullable();
            $table->time('CheckIn')->nullable();
            $table->time('CheckOut')->nullable();
            $table->integer('Work')->nullable();
            $table->integer('OT')->nullable();
            $table->integer('Attended')->nullable();
            $table->integer('Late')->nullable();
            $table->integer('Early')->nullable();
            $table->integer('Absent')->nullable();
            $table->integer('Leave')->nullable();
            $table->string('Status', 255)->nullable();
            $table->text('Records')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attendance');
    }
}
