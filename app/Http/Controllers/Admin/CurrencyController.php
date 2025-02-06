<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrencyRequest;
use App\Models\Currency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurrencyController extends Controller
{
  public function index()
  {
    $currencies = Currency::all();

    return Inertia::render('Admin/Currency/Index', ['currencies' => $currencies]);
  }

  public function store(CurrencyRequest $request)
  {
    $data = $request->validated();
    Currency::create($data);

    return redirect()->route('admin.currencies.index');
  }

  public function edit($id)
  {
    $currency = Currency::find($id);
    $currencies = Currency::all();

    return Inertia::render('Admin/Currency/Index', ['currencies' => $currencies, 'currency' => $currency]);
  }

  public function update(CurrencyRequest $request, $id)
  {
    $data = $request->validated();
    $currency = Currency::find($id);
    $currency->update($data);

    return redirect()->route('admin.currencies.index');
  }

  public function destroy($id)
  {
    $currency = Currency::find($id);
    $currency->delete();

    return redirect()->route('admin.currencies.index');
  }
}
