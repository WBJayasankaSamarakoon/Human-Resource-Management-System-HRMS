<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftLineResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'empshift_id' => $this->empshift_id,
            'StartTime' => $this->StartTime,
            'EndTime' => $this->EndTime,
            'Day' => $this->Day,
            'Name' => $this->Name,
        ];
    }
}
