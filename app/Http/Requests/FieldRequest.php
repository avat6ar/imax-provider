<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FieldRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'product_id' => 'required|exists:products,id',
      'key' => 'required|string',
      'title_en' => 'required|string',
      'title_ar' => 'required|string',
      'title_ru' => 'required|string',
      'type' => 'required|in:text,select',
      'required' => 'required|boolean',
      'options' => 'string|nullable',
    ];
  }
}
