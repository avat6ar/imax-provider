<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
  use HasFactory, HasSlug;

  protected $fillable = [
    'title_ar',
    'title_en',
    'title_ru',
    'description_ar',
    'description_en',
    'description_ru',
    'image',
    'price',
    'category_id',
    'seen',
    'sales_count',
    'slug',
    'status',
    'user_id',
    'value',
    'region_id'
  ];

  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('title_en')
      ->saveSlugsTo('slug');
  }

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function codes()
  {
    return $this->hasMany(CodeProduct::class);
  }

  public function fields()
  {
    return $this->hasMany(ProductField::class);
  }

  public function orders()
  {
    return $this->hasMany(Order::class);
  }
}
