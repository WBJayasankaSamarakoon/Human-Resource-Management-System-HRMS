<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('shiftline', function (Blueprint $table) {
            $table->boolean('half_day')->default(false)->after('EndTime');
        });
    }

    public function down(): void
    {
        Schema::table('shiftline', function (Blueprint $table) {
            $table->dropColumn('half_day');
        });
    }
};
