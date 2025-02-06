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
    Schema::create('product_fields', function (Blueprint $table)
    {
      $table->id();
      $table->string('key');
      $table->string('title_en');
      $table->string('title_ar');
      $table->string('title_ru');
      $table->string('type');
      $table->boolean('required');
      $table->longText('options')->nullable();
      $table->foreignId('product_id')->constrained('products', 'id')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_fields');
  }
};
