<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('uploaded_files', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->integer('year');
            $table->integer('month');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('uploaded_files');
    }
};
