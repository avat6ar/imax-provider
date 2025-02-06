<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CodeProductRequest;
use App\Http\Resources\CodeProductResource;
use App\Models\CodeProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CodeProductController extends Controller
{
  public function index()
  {
    $codes = CodeProduct::all();
    $products = Product::all();

    return Inertia::render('Admin/CodeProduct/Index', [
      'codes' => CodeProductResource::collection($codes),
      'products' => $products,
    ]);
  }


  public function store(CodeProductRequest $request)
  {
    $data = $request->validated();

    $data['codes'] = explode("\n", $data['codes']);
    foreach ($data['codes'] as $code)
    {
      CodeProduct::create([
        'code' => trim($code),
        'product_id' => $data['product_id'],
      ]);
    }

    return redirect()->route('admin.code-products.index');
  }

  public function edit($id)
  {
    $code = CodeProduct::find($id);
    $codes = CodeProduct::all();
    $products = Product::all();

    return Inertia::render('Admin/CodeProduct/Index', ['codes' => $codes, 'code' => $code, 'products' => $products]);
  }
}
