<?php

namespace App\Http\Controllers;

use App\Http\Requests\WalletRequest;
use App\Mail\SendAdminMail;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;

class WalletController extends Controller
{
  public function index()
  {
    $walletHistory = Wallet::where('user_id', auth()->user()->id)->get();

    return Inertia::render('Dashboard/Wallet/Index', ['walletHistory' => $walletHistory]);
  }

  public function store(WalletRequest $request)
  {
    $data = $request->validated();

    if (preg_match('/^data:image\/(\w+);base64,/', $data['screenshot'], $type))
    {
      $image = substr($data['screenshot'], strpos($data['screenshot'], ',') + 1);
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

    $data['screenshot'] = $relativePath;
    $data['fields'] = json_encode($data['fields']);

    Wallet::create($data);

    $users = User::where('is_admin', true)->get();
    $user = auth()->user();

    foreach ($users as $user)
    {
      Mail::to($user->email)->send(new SendAdminMail("New wallet created by {$user->email}"));
    }

    return redirect()->back();
  }
}
