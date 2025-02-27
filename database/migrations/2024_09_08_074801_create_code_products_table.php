<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('code_products', function (Blueprint $table)
    {
      $table->id();
      $table->string('code');
      $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
      $table->boolean('expired')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('code_products');
  }
};
