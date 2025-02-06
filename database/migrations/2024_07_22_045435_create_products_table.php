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
    Schema::create('products', function (Blueprint $table)
    {
      $table->id();
      $table->string('title_en');
      $table->string('title_ar');
      $table->string('title_ru');
      $table->text('description_en');
      $table->text('description_ar');
      $table->text('description_ru');
      $table->decimal('price', 10, 2);
      $table->string('image');
      $table->integer('seen')->default(0);
      $table->integer('sales_count')->default(0);
      $table->string('slug');
      $table->string('value')->nullable();
      $table->boolean('status')->default(true);
      $table->foreignId('user_id')->constrained("users", "id")->cascadeOnDelete();
      $table->foreignId('category_id')->constrained("categories", "id")->cascadeOnDelete();
      $table->foreignId('region_id')->constrained("regions", "id")->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
