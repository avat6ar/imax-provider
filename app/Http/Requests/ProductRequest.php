<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }


  protected function prepareForValidation()
  {
    $this->merge([
      'user_id' => $this->user()->id,
    ]);
  }
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'user_id' => 'required|exists:users,id',
      'title_en' => 'required|string|max:255',
      'title_ar' => 'required|string|max:255',
      'title_ru' => 'required|string|max:255',
      'description_en' => 'required|string',
      'description_ar' => 'required|string',
      'description_ru' => 'required|string',
      'category_id' => 'required|exists:categories,id',
      'price' => 'required|numeric',
      'image' => 'required|string',
      'status' => 'required|boolean',
      'region_id' => 'nullable|exists:regions,id',
      'value' => 'string'
    ];
  }
}
