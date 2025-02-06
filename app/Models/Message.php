<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;

  protected $fillable = ['ticket_id', 'sender_id', 'message','admin'];

  public function ticket()
  {
    return $this->belongsTo(Ticket::class);
  }

  public function sender()
  {
    return $this->belongsTo(User::class, 'sender_id');
  }

  public function attachment()
  {
    return $this->hasOne(Attachment::class);
  }
}
