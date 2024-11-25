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
        Schema::create('tblemployees', function (Blueprint $table) {
            $table->id();
            $table->string('EmpId', 50);
            $table->string('NameWithInitials', 255);

            $table->string('EPFNumber', 100);

            $table->string('Phone', 20);

            $table->text('CurrentAddress');
            $table->text('PermanentAddress');

            $table->string('PersonalEmail', 255);
            $table->string('CompanyEmail', 255);

            $table->date('DateOfJoining');

            $table->enum('Status', ['Active', 'Inactive', 'Suspended', 'Left']);

            $table->enum('Salutation', ['Mr', 'Ms', 'Mrs']);

            $table->string('Designation', 100);
            $table->string('Branch', 100);
            $table->string('Company', 100);

            $table->string('ReportsTo', 100);

            $table->enum('EmploymentType', ['Intern', 'Full-time', 'Part-time', 'Contract']);

            $table->string('EmergencyContactName', 255);

            $table->string('EmergencyPhone', 20);

            $table->string('Relation', 100);

            $table->string('DefaultShift', 100);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblemployees');
    }
};
