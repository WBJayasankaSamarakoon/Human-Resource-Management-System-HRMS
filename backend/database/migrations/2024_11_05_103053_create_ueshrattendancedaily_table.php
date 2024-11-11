<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUeshrattendancedailyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ueshrattendancedaily', function (Blueprint $table) {
            // Remove auto_increment from Index or set it as a primary key
            $table->increments('Index'); // Auto-incrementing primary key
            // Alternatively, if you want Index to just be a regular integer:
            // $table->integer('Index')->nullable();

            $table->integer('PersonID')->nullable();
            $table->string('Name')->nullable();
            $table->string('Department')->nullable();
            $table->string('Position')->nullable();
            $table->string('Gender', 10)->nullable();
            $table->date('Date')->nullable();
            $table->integer('Year')->nullable();
            $table->string('Month', 20)->nullable();
            $table->string('Week', 10)->nullable();
            $table->string('Timetable')->nullable();
            $table->time('CheckIn')->nullable();
            $table->time('CheckOut')->nullable();
            $table->integer('Work')->nullable();
            $table->integer('OT')->nullable();
            $table->integer('Attended')->nullable();
            $table->integer('Late')->nullable();
            $table->integer('Early')->nullable();
            $table->integer('Absent')->nullable();
            $table->integer('Leave')->nullable();
            $table->string('Status')->nullable();
            $table->text('Records')->nullable();

            // If you want to keep the auto-incrementing behavior for Index, use it as the primary key.
            // You can also keep the default id column if desired.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ueshrattendancedaily');
    }
}
