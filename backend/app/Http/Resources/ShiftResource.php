<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->Id,
            'StartTime' => $this->StartTime,
            'EndTime' => $this->EndTime,
            'Week' => $this->Week,
        ];
    }
}
