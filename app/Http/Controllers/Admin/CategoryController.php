<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class CategoryController extends Controller
{
  public function index()
  {
    $categories = Category::all();

    return Inertia::render('Admin/Category/Index', ['categories' => $categories]);
  }

  public function store(CategoryRequest $request)
  {
    $data = $request->validated();
    Category::create($data);

    return redirect()->route('admin.categories.index');
  }

  public function edit($id)
  {
    $category = Category::find($id);
    $categories = Category::all();

    return Inertia::render('Admin/Category/Index', ['categories' => $categories, 'category' => $category]);
  }

  public function update(CategoryRequest $request, $id)
  {
    $data = $request->validated();
    $category = Category::find($id);
    $category->update($data);

    return redirect()->route('admin.categories.index');
  }

  public function destroy($id)
  {
    $category = Category::find($id);
    $category->delete();

    return redirect()->route('admin.categories.index');
  }
}
