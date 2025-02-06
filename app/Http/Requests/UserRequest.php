<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
    $userId = $this->route('user');

    return [
      'name' => 'required|string',
      'email' => [
        'required',
        'email',
        Rule::unique('users')->ignore($userId),
      ],
      'phone' => [
        'required',
        Rule::unique('users')->ignore($userId),
      ],
      'balance'=> 'required|numeric',
      'is_admin' => 'required|boolean',
      'status' => 'required|boolean',
    ];
  }
}
