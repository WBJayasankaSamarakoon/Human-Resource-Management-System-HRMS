<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TbldepartmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'DepartmentName' => $this->DepartmentName,
            'DepartmentShortName' => $this->DepartmentShortName,
            'DepartmentCode' => $this->DepartmentCode,
            'CreationDate' => $this->CreationDate,
        ];
    }
}
