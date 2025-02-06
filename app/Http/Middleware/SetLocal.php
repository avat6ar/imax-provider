<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SetLocal
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return \Symfony\Component\HttpFoundation\Response
   */
  public function handle(Request $request, Closure $next)
  {
    $locale =  $request->locale ?? 'en';

    // Check if the locale is not 'ar' or 'en'
    if (!in_array($locale, ['ar', 'en']))
    {
      abort(404); // Return a 404 error response
    }

    URL::defaults(['locale' => $locale]);
    App::setLocale($locale);

    return $next($request);
  }
}
