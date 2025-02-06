<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
  public function index()
  {
    $products = Product::all();

    $products = $products->map(function ($product)
    {
      $product->image = asset($product->image);
      return $product;
    });

    return Inertia::render('Admin/Product/Index', ['products' => $products]);
  }

  public function create()
  {
    $categories = Category::all();

    $categories->map(function ($category)
    {
      $category->regions = $category->regions()->get();

      return $category;
    });

    return Inertia::render('Admin/Product/Create', ['categories' => $categories]);
  }

  public function store(ProductRequest $request)
  {
    $data = $request->validated();

    if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type))
    {
      $image = substr($data['image'], strpos($data['image'], ',') + 1);
      $type = strtolower($type[1]);

      if (!in_array($type, ['jpg', 'jpeg', 'png']))
      {
        throw new \Exception('invalid image type');
      }

      $image = str_replace(' ', '+', $image);
      $image = base64_decode($image);

      if ($image === false)
      {
        throw new \Exception('base64_decode failed');
      }
    }
    else
    {
      throw new \Exception('Invalid image format');
    }

    $dir = 'images/';
    $file = Str::random() . '.' . $type;
    $absolutePath = public_path($dir);
    $relativePath = $dir . $file;
    if (!File::exists($absolutePath))
    {
      File::makeDirectory($absolutePath, 0755, true);
    }

    file_put_contents($relativePath, $image);

    $data['image'] = $relativePath;

    Product::create($data);

    return redirect()->route('admin.products.index');
  }

  public function edit($id)
  {
    $product = Product::findOrFail($id);
    $product->image = asset($product->image);
    $categories = Category::all();

    return Inertia::render('Admin/Product/Edit', [
      'product' => $product,
      'categories' => $categories
    ]);
  }

  public function update(ProductRequest $request, $id)
  {
    $product = Product::findOrFail($id);
    $data = $request->validated();

    if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type))
    {
      $image = substr($data['image'], strpos($data['image'], ',') + 1);
      $type = strtolower($type[1]);

      if (!in_array($type, ['jpg', 'jpeg', 'png']))
      {
        throw new \Exception('invalid image type');
      }

      $image = str_replace(' ', '+', $image);
      $image = base64_decode($image);

      if ($image === false)
      {
        throw new \Exception('base64_decode failed');
      }

      $dir = 'images/';
      $file = Str::random() . '.' . $type;
      $absolutePath = public_path($dir);
      $relativePath = $dir . $file;
      if (!File::exists($absolutePath))
      {
        File::makeDirectory($absolutePath, 0755, true);
      }

      file_put_contents($relativePath, $image);
      $data['image'] = $relativePath;
    }

    $product->update($data);

    return redirect()->route('admin.products.index');
  }
}
