<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CodeProductController;
use App\Http\Controllers\Admin\CurrencyController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductFieldController;
use App\Http\Controllers\Admin\RegionController;
use App\Http\Controllers\Admin\TicketController as AdminTicketController;
use App\Http\Controllers\Admin\WalletController as AdminWalletController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\WalletController;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function ()
{
  Route::get('/', function ()
  {
    return Inertia::render('Welcome', [
      'canResetPassword' => Route::has('password.request'),
      'locale' => app()->getLocale(),
    ]);
  })->name('login');

  Route::get('/contact', function ()
  {
    return Inertia::render('Contact');
  })->name('home.contact');

  Route::get('/terms', function ()
  {
    return Inertia::render('Terms');
  })->name('home.terms');
});

Route::middleware(['auth', 'status'])->group(function ()
{
  Route::get('/dashboard', function ()
  {
    return Inertia::render('Dashboard/Dashboard');
  })->name('dashboard');

  Route::resource('products', ProductController::class);

  Route::get('/settings', function ()
  {
    return Inertia::render('Dashboard/Settings');
  })->name('settings');

  Route::resource('orders', OrderController::class);
  Route::resource('tickets', TicketController::class);
  Route::post('/tickets/{ticketId}/message', [TicketController::class, 'storeMessage'])->name('tickets.message.store');

  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.updatePassword');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::resource('wallet', WalletController::class);
});

Route::middleware(['admin', 'auth'])->prefix('admin')->name('admin.')->group(function ()
{
  Route::get("/", function ()
  {
    $monthlySales = Order::select(
      DB::raw('SUM(orders.quantity * products.price) as total_sales'),
      DB::raw('DATE_FORMAT(orders.created_at, "%Y-%m") as month')
    )
      ->join('products', 'orders.product_id', '=', 'products.id')->where('orders.status', 'completed')
      ->groupBy(DB::raw('DATE_FORMAT(orders.created_at, "%Y-%m")'))
      ->orderBy('month')
      ->get();

    $topSellingProducts = Product::withSum('orders', 'quantity')
      ->whereHas('orders', function ($query)
      {
        $query->where('status', 'completed');
      })
      ->orderByDesc('orders_sum_quantity')
      ->limit(5)
      ->get();

    $usersCount = User::count();
    $productsCount = Product::count();
    $ordersCount = Order::count();

    return Inertia::render('Admin/Dashboard', [
      'monthlySales' => $monthlySales,
      'products' => $topSellingProducts,
      'usersCount' => $usersCount,
      'ordersCount' => $ordersCount,
      'productsCount' => $productsCount
    ]);
  })->name('index');

  Route::resource('categories', CategoryController::class);
  Route::resource('products', AdminProductController::class);
  Route::resource('users', UserController::class);
  Route::resource('code-products', CodeProductController::class);
  Route::resource('product-fields', ProductFieldController::class);
  Route::resource('currencies', CurrencyController::class)->except('show');
  Route::resource('tickets', AdminTicketController::class)->except('destroy', 'edit', 'update', 'store');
  Route::resource('orders', AdminOrderController::class)->except('destroy', 'edit', 'update', 'store');
  Route::resource('wallets',AdminWalletController::class)->except('destroy', 'edit', 'update', 'store');
  Route::put('/wallets/{id}/{status}/{balance?}', [AdminWalletController::class, 'update'])->name('wallets.update');
  Route::put('/orders/{id}/{status}', [AdminOrderController::class, 'update'])->name('orders.update');
  Route::resource('regions', RegionController::class);
  Route::post('/tickets/{ticketId}/message', [AdminTicketController::class, 'storeMessage'])->name('tickets.message.store');
});

require __DIR__ . '/auth.php';
