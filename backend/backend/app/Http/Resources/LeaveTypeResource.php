<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->Id,
            'LeaveType' => $this->LeaveType,
            'Description' => $this->Description,
        ];
    }
}
