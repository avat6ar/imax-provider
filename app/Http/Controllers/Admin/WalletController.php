<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WalletAdminRequest;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
  public function index()
  {
    $wallets = Wallet::all();

    $wallets->map(function ($wallet)
    {
      $wallet->user_name = $wallet->user->name;
      $wallet->user_email = $wallet->user->email;

      return $wallet;
    });

    return Inertia::render('Admin/Wallet/Index', ['wallets' => $wallets]);
  }

  public function show(Wallet $wallet)
  {
    $wallet->user = $wallet->user;
    $wallet->fields = json_decode($wallet->fields);

    return Inertia::render('Admin/Wallet/Show', ['wallet' => $wallet]);
  }

  public function update(Request $request, string $id, string $status, int|null $balance = null)
  {
    $wallet = Wallet::find($id);

    if (!$wallet)
    {
      return Inertia::render('NotFound');
    }

    $wallet->update([
      'status' => $status
    ]);

    if ($balance && $status == 'completed')
    {
      $wallet->user->update([
        'balance' => $wallet->user->balance + $balance
      ]);
    }

    return redirect()->route('admin.wallets.index');
  }
}
