<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CodeProductRequest extends FormRequest
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
    if ($this->method() == 'PUT')
    {
      return [
        'code' => 'required|string',
        'product_id' => 'required|exists:products,id',
      ];
    }

    return [
      'codes' => 'required|string',
      'product_id' => 'required|exists:products,id',
    ];
  }
}
