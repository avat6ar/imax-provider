<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Requests\TicketRequest;
use App\Mail\SendAdminMail;
use App\Models\Attachment;
use App\Models\Message;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TicketController extends Controller
{
  public function index()
  {
    $tickets = Ticket::all();
    $tickets = $tickets->map(function ($ticket)
    {
      $ticket->last_message = $ticket->messages->last();
      return $ticket;
    });

    return Inertia::render('Dashboard/Ticket/Index', [
      'tickets' => $tickets
    ]);
  }

  public function store(TicketRequest $request)
  {
    $data = $request->validated();

    $ticket = Ticket::create([
      'user_id' => $data['user_id'],
      'subject' => $data['subject'],
      'category' => $data['category'],
      'status' => 'open',
    ]);

    $message = Message::create([
      'ticket_id' => $ticket->id,
      'sender_id' => $data['user_id'],
      'message' => $data['message'],
    ]);

    if (isset($data['file']))
    {
      $file = $data['file'];
      $filePath = $file->store('attachments', 'public');

      Attachment::create([
        'message_id' => $message->id,
        'file_path' => $filePath,
      ]);
    }

    $users = User::where('is_admin', true)->get();

    foreach ($users as $user)
    {
      Mail::to($user->email)->send(new SendAdminMail("New Ticket: {$ticket->subject}"));
    }

    return redirect()->route('tickets.show', $ticket->id);
  }

  public function show($id)
  {
    $ticket = Ticket::with(['messages.attachment'])->findOrFail($id);

    foreach ($ticket->messages as $message)
    {
      if ($message['attachment'])
      {
        $message['attachment']['file_path'] = url('storage/' . $message['attachment']['file_path']);
      }
    }

    return Inertia::render('Dashboard/Ticket/Show', [
      'ticket' => $ticket,
    ]);
  }

  public function storeMessage(MessageRequest $request, $ticketId)
  {
    $data = $request->validated();

    $message = Message::create([
      'ticket_id' => $ticketId,
      'sender_id' => $data['sender_id'],
      'message' => $data['message'],
    ]);

    if (isset($data['file']))
    {
      $file = $data['file'];
      $filePath = $file->store('attachments', 'public');

      Attachment::create([
        'message_id' => $message->id,
        'file_path' => $filePath,
      ]);
    }

    return redirect()->route('tickets.show', $ticketId);
  }
}
