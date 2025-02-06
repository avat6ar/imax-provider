<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Mail\SendAdminMail;
use App\Mail\SendCodeMail;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
  public function index()
  {
    $orders = Order::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();

    $orders = $orders->map(function ($order)
    {
      $order->product_title = $order->product->title_en;
      return $order;
    });

    return Inertia::render('Dashboard/Order/Index', ['orders' => $orders]);
  }

  public function store(OrderRequest $request)
  {
    $data = $request->validated();
    $product = Product::find($data['product_id']);
    $user = User::find($data['user_id']);

    if (!$product)
    {
      return redirect()->back();
    }

    $data['fields'] = json_encode($data['fields']);

    $data['price'] = $product->price;

    if ($user->balance >= $product->price)
    {
      $code = $product->codes()->where('expired', false)->first();

      if ($code)
      {
        try
        {
          Mail::to($user->email)->send(new SendCodeMail($code->code));
          $data['status'] = 'completed';
          $user->update(['balance' => $user->balance - $product->price]);
          $data['response'] = "Sent Order to {$user->email} successfully";
          $code->update(['expired' => true]);
        }
        catch (\Exception $e)
        {
          $data['status'] = 'pending';
          $data['response'] = $e->getMessage();
        }
      }
      else
      {
        $data['status'] = 'canceled';
        $data['response'] = 'No codes available';
        $users = User::where('is_admin', true)->get();

        foreach ($users as $user)
        {
          Mail::to($user->email)->send(new SendAdminMail("There is no code available for {$product->title_en}"));
        }
      }
    }
    else
    {
      $data['status'] = 'canceled';
      $data['response'] = 'Not enough balance';
    }

    Order::create($data);

    return redirect()->back();
  }
}
