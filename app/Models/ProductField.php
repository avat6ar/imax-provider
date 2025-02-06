<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductField extends Model
{
  use HasFactory;

  protected $fillable = ['product_id', 'key', 'title_en', 'title_ar', 'title_ru', 'type', 'required', 'options'];

  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
