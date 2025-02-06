<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index()
  {
    $orders = Order::all();

    $orders = $orders->map(function ($order)
    {
      $order->product_title = $order->product->title_en;
      $order->user_email = $order->user->email;
      $order->user_name = $order->user->name;

      return $order;
    });

    return Inertia::render('Admin/Order/Index', ['orders' => $orders]);
  }

  public function show($id)
  {
    $order = Order::find($id);

    if (!$order)
    {
      return Inertia::render('NotFound');
    }

    $order->user = $order->user;
    $order->product = $order->product;

    return Inertia::render('Admin/Order/Show', ['order' => $order]);
  }

  public function update(string $id, string $status)
  {
    $order = Order::find($id);

    if (!$order)
    {
      return Inertia::render('NotFound');
    }

    $order->update([
      'status' => $status
    ]);

    return redirect()->back();
  }
}
