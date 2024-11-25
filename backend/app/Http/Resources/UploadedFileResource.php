<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UploadedFileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'filename' => $this->filename,
            'year' => $this->year,
            'month' => $this->month,
            'uploaded_at' => $this->uploaded_at,
        ];
    }
}
