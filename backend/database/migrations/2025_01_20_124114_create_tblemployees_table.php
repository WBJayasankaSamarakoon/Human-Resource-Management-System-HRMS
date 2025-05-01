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
            $table->id(); // auto-increment primary key
            $table->unsignedBigInteger('EmpId');
            $table->string('NameWithInitials', 255);

            $table->string('FirstName', 100)->nullable();
            $table->string('MiddleName', 100)->nullable();
            $table->string('LastName', 100)->nullable();

            $table->string('EPFNumber', 100)->nullable();
            $table->boolean('EpfEligible')->default(false);
            $table->string('Phone', 20)->nullable();
            $table->text('CurrentAddress')->nullable();
            $table->text('PermanentAddress')->nullable();
            $table->string('PersonalEmail', 255)->nullable();
            $table->string('CompanyEmail', 255)->nullable();
            $table->date('DateOfJoining')->nullable();
            $table->enum('Status', ['Active', 'Inactive', 'Suspended', 'Left'])->nullable();
            $table->enum('Salutation', ['Mr', 'Ms', 'Mrs'])->nullable();
            $table->string('Designation', 100)->nullable();
            $table->string('Branch', 100)->nullable();
            $table->string('Department', 100)->nullable();
            $table->string('Company', 100)->nullable();
            $table->string('ReportsTo', 100)->nullable();
            $table->enum('EmploymentType', ['Intern', 'Full-time', 'Part-time', 'Contract'])->nullable();
            $table->string('EmergencyContactName', 255)->nullable();
            $table->string('EmergencyPhone', 20)->nullable();
            $table->string('Relation', 100)->nullable();
            $table->unsignedBigInteger('DefaultShift');
            $table->timestamps();

            // $table->foreign('DefaultShift')->references('id')->on('empshift')->onDelete('set null');

            // Optionally, add a unique constraint if EmpId should be unique
            // $table->unique('EmpId');
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
