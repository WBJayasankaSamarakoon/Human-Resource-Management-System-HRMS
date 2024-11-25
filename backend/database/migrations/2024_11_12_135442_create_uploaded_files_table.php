<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUploadedFilesTable extends Migration
{
    public function up()
    {
        Schema::create('uploaded_files', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->integer('year');
            $table->string('month', 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('uploaded_files');
    }
}
