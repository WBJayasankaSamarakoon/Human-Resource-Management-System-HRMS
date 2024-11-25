<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TblemployeesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'NameWithInitials' => $this->NameWithInitials,
            'EPFNumber' => $this->EPFNumber,
            'Phone' => $this->Phone,
            'CurrentAddress' => $this->CurrentAddress,
            'PermanentAddress' => $this->PermanentAddress,
            'PersonalEmail' => $this->PersonalEmail,
            'CompanyEmail' => $this->CompanyEmail,
            'DateOfJoining' => $this->DateOfJoining,
            'Status' => $this->Status,
            'Salutation' => $this->Salutation,
            'Designation' => $this->Designation,
            'Branch' => $this->Branch,
            'Company' => $this->Company,
            'ReportsTo' => $this->ReportsTo,
            'EmploymentType' => $this->EmploymentType,
            'EmergencyContactName' => $this->EmergencyContactName,
            'EmergencyPhone' => $this->EmergencyPhone,
            'Relation' => $this->Relation,
            'DefaultShift' => $this->DefaultShift,
            'EmpId' => $this->EmpId,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
