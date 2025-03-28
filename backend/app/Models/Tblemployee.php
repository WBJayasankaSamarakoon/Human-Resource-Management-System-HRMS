<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tblemployee extends Model
{
    use HasFactory;

    protected $table = 'tblemployees';

    protected $fillable = [
        'EmpId',
        'NameWithInitials',
        'EPFNumber',
        'EpfEligible',
        'Phone',
        'CurrentAddress',
        'PermanentAddress',
        'PersonalEmail',
        'CompanyEmail',
        'DateOfJoining',
        'Status',
        'Salutation',
        'Designation',
        'Branch',
        'Department',
        'Company',
        'ReportsTo',
        'EmploymentType',
        'EmergencyContactName',
        'EmergencyPhone',
        'Relation',
        'DefaultShift',
    ];

    public function empshift()
    {
        return $this->belongsTo(EmpShift::class, 'DefaultShift');
    }
}
