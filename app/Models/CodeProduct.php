<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeProduct extends Model
{
  use HasFactory;

  protected $fillable = ['code', 'product_id', 'expired'];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}
