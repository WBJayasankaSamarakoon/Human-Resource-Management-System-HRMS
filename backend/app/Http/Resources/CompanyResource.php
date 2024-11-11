<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->Id,
            'Name' => $this->Name,
            'Address' => $this->Address,
            'Email' => $this->Email,
            'Telephone' => $this->Telephone,
            'Fax' => $this->Fax,
        ];
    }
}
