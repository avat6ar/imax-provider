<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FieldRequest;
use App\Models\Product;
use App\Models\ProductField;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductFieldController extends Controller
{

  public function index()
  {

    $productFields = ProductField::all();

    $productFields = $productFields->map(function ($productField)
    {
      $productField->product_title = $productField->product->title_en;

      return $productField;
    });

    return Inertia::render('Admin/ProductField/Index', ['fields' => $productFields]);
  }


  public function create()
  {
    $products = Product::all();

    return Inertia::render('Admin/ProductField/Create', ['products' => $products]);
  }


  public function store(FieldRequest $request)
  {
    $data = $request->validated();

    if ($data['type'] == 'select')
    {
      if (!isset($data['options']))
      {
        return redirect()->route('admin.product-fields.create');
      }

      $data['options'] = explode("\n", $data['options']);
      $data['options'] = array_map('trim', $data['options']);
      $data['options'] = json_encode($data['options']);
    }
    else
    {
      $data['options'] = null;
    }

    ProductField::create($data);

    return redirect()->route('admin.product-fields.index');
  }


  public function edit($id)
  {
    $productField = ProductField::find($id);
    $products = Product::all();

    return Inertia::render('Admin/ProductField/Edit', ['productField' => $productField, 'products' => $products]);
  }


  public function update(FieldRequest $request, $id)
  {
    $data = $request->validated();

    if ($data['type'] == 'select')
    {
      if (!isset($data['options']))
      {
        return redirect()->route('admin.product-fields.create');
      }

      $data['options'] = explode("\n", $data['options']);
      $data['options'] = array_map('trim', $data['options']);
      $data['options'] = json_encode($data['options']);
    }
    else
    {
      $data['options'] = null;
    }

    $productField = ProductField::find($id);

    if (!$productField)
    {
      return Inertia::render('NotFound');
    }

    $productField->update($data);

    return redirect()->route('admin.product-fields.index');
  }


  public function destroy($id)
  {
    $productField = ProductField::find($id);

    if (!$productField)
    {
      return Inertia::render('NotFound');
    }

    $productField->delete();

    return redirect()->route('admin.product-fields.index');
  }
}
