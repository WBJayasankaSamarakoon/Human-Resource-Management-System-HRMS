<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SlipMail extends Mailable
{
    use Queueable, SerializesModels;

    public $slipData;

    /**
     * Create a new message instance.
     *
     * @param array $slipData
     */
    public function __construct(array $slipData)
    {
        $this->slipData = $slipData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Monthly Payslip',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.slip',
            with: ['slipData' => $this->slipData],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Optionally, attach a PDF if generated.
        return [];
    }
}
