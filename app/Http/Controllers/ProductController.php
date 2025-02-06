<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  public function index()
  {
    $products = Product::get();

    return Inertia::render('Dashboard/Product/Index', [
      'products' => $products
    ]);
  }

  public function show($slug)
  {
    $product = Product::where('slug', $slug)->first();

    $product->category_name = $product->category->name_en;

    $category = $product->category;
    $relatedProducts = Product::where('category_id', $category->id)->where('id', '!=', $product->id)->get();

    $product->fields = $product->fields()->get();

    $category = Category::find($product->category_id);
    $regions = $category->regions()->get();

    foreach ($regions as $region)
    {
      $region->products = $region->products()->get(['value', 'slug','id']);
    }

    return Inertia::render('Dashboard/Product/Show', [
      'product' => $product,
      'products' => $relatedProducts,
      'regions' => $regions
    ]);
  }
}
