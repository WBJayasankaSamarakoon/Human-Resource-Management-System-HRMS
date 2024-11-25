<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'Index' => $this->Index,
            'PersonID' => $this->PersonID,
            'Name' => $this->Name,
            'Department' => $this->Department,
            'Position' => $this->Position,
            'Gender' => $this->Gender,
            'Date' => $this->Date,
            'Week' => $this->Week,
            'Timetable' => $this->Timetable,
            'CheckIn' => $this->CheckIn,
            'CheckOut' => $this->CheckOut,
            'Work' => $this->Work,
            'OT' => $this->OT,
            'Attended' => $this->Attended,
            'Late' => $this->Late,
            'Early' => $this->Early,
            'Absent' => $this->Absent,
            'Leave' => $this->Leave,
            'Status' => $this->Status,
            'Records' => $this->Records,
            'Year'       => $this->Date ? $this->Date->format('Y') : null,
            'Month'      => $this->Date ? $this->Date->format('m') : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
