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
            $table->string('name');
            $table->string('department');
            $table->string('position')->nullable();
            $table->string('gender');
            $table->string('date');
            $table->string('week');
            $table->string('timetable');
            $table->string('check_in')->nullable();
            $table->string('check_out')->nullable();
            $table->integer('work')->default(0);
            $table->integer('ot')->default(0);
            $table->integer('attended')->default(0);
            $table->integer('late')->default(0);
            $table->integer('early')->default(0);
            $table->integer('absent')->default(0);
            $table->integer('leave')->default(0);
            $table->string('status');
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
