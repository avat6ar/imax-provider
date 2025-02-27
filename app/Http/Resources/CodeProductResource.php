<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CodeProductResource extends JsonResource
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
      'code' => $this->code,
      'product_title' => $this->product->title_en,
      'expired' => $this->expired,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
