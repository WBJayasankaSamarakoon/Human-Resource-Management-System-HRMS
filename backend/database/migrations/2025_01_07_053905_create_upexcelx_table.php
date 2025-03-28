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
        Schema::create('upexcelx', function (Blueprint $table) {
            $table->id(); // Primary key
            // $table->integer('index');
            // $table->integer('person_id');
            // $table->string('name');
            // $table->string('department');
            // $table->string('position')->nullable();
            // $table->string('gender');
            // $table->string('date');
            // $table->string('week');
            // $table->string('timetable');
            // $table->time('FirstIn')->nullable();
            // $table->time('LastOut')->nullable();
            // $table->unsignedBigInteger('file_id')->nullable();
            // $table->foreign('file_id')
            //       ->references('id')
            //       ->on('uploaded_filex')
            //       ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('upexcelx', function (Blueprint $table) {
        //     $table->dropForeign(['file_id']);
        //     $table->dropColumn('file_id');
        // });

        Schema::dropIfExists('upexcelx');
    }
};
