<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MachineResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'id' => $this->Id, // Assuming 'Id' is your primary key
            'name' => $this->Name,
            'model' => $this->Model,
            'brand' => $this->Brand,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

    }
}
