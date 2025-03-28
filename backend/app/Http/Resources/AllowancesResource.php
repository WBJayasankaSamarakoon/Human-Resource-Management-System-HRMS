<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllowancesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'emp_id' => $this->emp_id,
            'D_AttendanceIncentive' => $this->D_AttendanceIncentive,
            'commission' => $this->commission,
            // 'type' => $this->type,
            // 'amount' => $this->amount,
            'is_active' => $this->is_active,
            'payment_date' => $this->payment_date,
        ];
    }
}
