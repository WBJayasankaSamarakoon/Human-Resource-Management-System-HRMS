<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->Id,
            'Title' => $this->Title,
            'Description' => $this->Description,
            'Date' => $this->Date,
            'StartTime' => $this->StartTime,
            'EndTime' => $this->EndTime,
            'Location' => $this->Location,
        ];
    }
}
