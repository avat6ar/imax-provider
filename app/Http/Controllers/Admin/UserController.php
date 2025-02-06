<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\WalletUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  public function index()
  {
    $users = User::all();

    return Inertia::render('Admin/User/Index', [
      'users' => $users
    ]);
  }

  public function edit($id)
  {
    $user = User::find($id);

    return Inertia::render('Admin/User/Edit', [
      'user' => $user
    ]);
  }

  public function update(UserRequest $request, $id)
  {
    if (auth()->user()->id == $id)
    {
      return redirect()->route('admin.users.index');
    }

    $data = $request->validated();

    $user = User::find($id);
    $user->update($data);

    return redirect()->back();
  }
}
