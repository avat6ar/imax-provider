<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('wallets', function (Blueprint $table)
    {
      $table->id();
      $table->longText('fields')->nullable();
      $table->foreignId('user_id')->constrained('users', 'id')->cascadeOnDelete();
      $table->string('screenshot');
      $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending');
      $table->string('payment_method');
      $table->string('amount');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('wallets');
  }
};
