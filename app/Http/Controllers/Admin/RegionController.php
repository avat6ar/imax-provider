<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegionRequest;
use App\Models\Category;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegionController extends Controller
{
  public function index()
  {
    $regions = Region::all();
    $categories = Category::all();

    $regions->map(function ($region)
    {
      $region->category_name = $region->category->name_en;

      return $region;
    });

    return Inertia::render('Admin/Region/Index', ['regions' => $regions, 'categories' => $categories]);
  }

  public function store(RegionRequest $request)
  {
    $data = $request->validated();

    Region::create($data);

    return redirect()->route('admin.regions.index');
  }
}
