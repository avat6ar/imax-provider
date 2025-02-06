<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // User::factory(10)->create();

    User::create([
      'name' => 'Abdullah',
      'email' => 'abdullah@web.dev',
      'password' => Hash::make('password'),
      'phone' => '123456789',
      'email_verified_at' => now(),
      'role' => 'super_admin',
      'status' => true
    ]);
  }
}
