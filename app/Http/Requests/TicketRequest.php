<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TicketRequest extends FormRequest
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
      'message' => 'required|string',
      'subject' => 'required|string',
      'category' => 'required|string',
      'file' => 'nullable|mimes:jpeg,png,jpg',
    ];
  }
}
