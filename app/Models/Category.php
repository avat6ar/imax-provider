<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  use HasFactory;

  protected $fillable = ['name_en', 'name_ar', 'name_ru'];

  public function products()
  {
    return $this->hasMany(Product::class);
  }

  public function regions()
  {
    return $this->hasMany(Region::class);
  }
}
