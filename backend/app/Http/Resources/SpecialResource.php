<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'emp_id' => $this->emp_id,
            'attendanceIncentive' => $this->attendanceIncentive,
            'parcelAttendance' => $this->parcelAttendance,
            'is_active' => $this->is_active,
            'payment_date' => $this->payment_date,
        ];
    }
}
