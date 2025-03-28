<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('upexcel', function (Blueprint $table) {
            $table->id();
            $table->integer('index');
            $table->integer('person_id');
            $table->string('name')->nullable();
            $table->string('department')->nullable();
            $table->string('position')->nullable();
            $table->string('gender')->nullable();
            $table->string('date')->nullable();
            $table->string('week')->nullable();
            $table->string('timetable')->nullable();
            $table->string('check_in')->nullable();
            $table->string('check_out')->nullable();
            $table->integer('work')->nullable();
            $table->integer('ot')->nullable();
            $table->integer('attended')->nullable();
            $table->integer('late')->nullable();
            $table->integer('early')->nullable();
            $table->integer('absent')->nullable();
            $table->integer('leave')->nullable();
            $table->string('status')->nullable();
            $table->string('records')->nullable();
            $table->unsignedBigInteger('file_id')->nullable();
            $table->foreign('file_id')
                  ->references('id')
                  ->on('uploaded_files')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('upexcel', function (Blueprint $table) {
            $table->dropForeign(['file_id']);
            $table->dropColumn('file_id');
        });

        Schema::dropIfExists('upexcel');
    }
};
