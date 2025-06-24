<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class SlipMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->data['subject'] ?? 'Your Monthly Payslip',
        );
    }

    public function content(): Content
    {
        // Extract data with fallbacks
        $name = $this->data['name'] ?? 'Employee';
        $month = $this->data['payslipData']['month'] ?? 'this month';
        $year = $this->data['payslipData']['year'] ?? date('Y');
        $companyName = $this->data['companyData']['name'] ?? 'our company';
        $hrName = $this->data['companyData']['hr_name'] ?? 'HR Department';
        $hrEmail = $this->data['companyData']['hr_email'] ?? '';
        $companyPhone = $this->data['companyData']['phone'] ?? '';

        // Build the HTML content
        $htmlContent = '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .footer { margin-top: 20px; font-size: 0.9em; color: #666; }
                .signature { margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <p>Dear '.e($name).',</p>

                <p>I hope this message finds you well.</p>

                <p>Please find attached your payslip for the month of '.e($month).' '.e($year).'.
                The document contains a detailed breakdown of your salary, including basic pay,
                allowances, deductions, and the net salary credited to your account.</p>

                <p>Kindly review the attached file. If you have any questions or require further
                clarification, feel free to contact the HR department.</p>

                <p>This email is confidential and intended solely for you. Please do not share
                this document with others.</p>

                <p>Thank you for your continued contributions to '.e($companyName).'.</p>

                <div class="signature">
                    <p>Best regards,<br>
                    '.e($hrName).'<br>
                    '.($hrEmail ? e($hrEmail).' | ' : '').e($companyPhone).'</p>
                </div>
            </div>
        </body>
        </html>';

        return new Content(
            htmlString: $htmlContent,
            with: [
                'name' => $name,
                'email' => $this->data['email'] ?? '',
                'payslipData' => $this->data['payslipData'] ?? [],
                'companyData' => $this->data['companyData'] ?? [],
            ],
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        // Attach custom PDF if provided
        if (!empty($this->data['customPdfPath'])) {
            $attachments[] = Attachment::fromPath($this->data['customPdfPath'])
                ->as('payslip.pdf')
                ->withMime('application/pdf');
        }

        // Generate and attach PDF if requested
        if ($this->data['attachPdf'] ?? false) {
            $pdfContent = $this->generatePdfContent();
            if ($pdfContent) {
                $attachments[] = Attachment::fromData(
                    fn() => $pdfContent,
                    'payslip.pdf',
                    ['mime' => 'application/pdf']
                );
            }
        }

        return $attachments;
    }

    protected function generatePdfContent()
    {
        // Implement your PDF generation logic here
        return null;
    }
}
