<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdatePasswordRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email'))
    {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('settings');
  }

  public function updatePassword(ProfileUpdatePasswordRequest $request)
  {
    $user = $request->user();

    if (!Hash::check($request->old_password, $user->password))
    {
      return Inertia::render('Dashboard/Settings', ['errors' => ['old_password' => 'The provided password does not match our records.']]);
    }

    $user->password = bcrypt($request->password);
    $user->save();

    return Redirect::route('settings');
  }
  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
