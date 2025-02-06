<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Models\Attachment;
use App\Models\Message;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $tickets = Ticket::all();
    $tickets = $tickets->map(function ($ticket)
    {
      $ticket->last_message = $ticket->messages->last();
      return $ticket;
    });

    return Inertia::render('Admin/Ticket/Index', [
      'tickets' => $tickets
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $ticket = Ticket::with(['messages.attachment'])->findOrFail($id);

    foreach ($ticket->messages as $message)
    {
      if ($message['attachment'])
      {
        $message['attachment']['file_path'] = url('storage/' . $message['attachment']['file_path']);
      }
    }

    return Inertia::render('Admin/Ticket/Show', [
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
      'admin' => true
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

    return redirect()->route('admin.tickets.show', $ticketId);
  }
}
