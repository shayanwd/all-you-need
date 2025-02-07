<?php

header("X-Robots-Tag: noindex, nofollow", true);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

// Admin email address
$adminEmails = [
    // "allyouneed.forleaving@gmail.com",
    "shayankhanwd@gmail.com",
    "sheraziabubakar@gmail.com"
];

// Function to send email
function sendEmail($data, $adminEmail)
{
    $subject = "Nuova Invio del Modulo di Contatto";

    // Build a structured email message with all form fields
    $message = "Nuovi Dettagli di Invio del Modulo di Contatto:\n\n";
    $message .= "Nome e Cognome: " . htmlspecialchars($data['fullName']) . "\n";
    $message .= "Numero di Telefono: " . htmlspecialchars($data['phone']) . "\n";
    $message .= "Indirizzo email: " . htmlspecialchars($data['email']) . "\n";
    $message .= "Servizio di interesse: " . htmlspecialchars($data['service']) . "\n";
    $message .= "Messaggio: " . htmlspecialchars($data['message']) . "\n";
    $message .= "Informativa sulla Privacy Accettata: " . ($data['privacy'] ? 'Yes' : 'No') . "\n";

    // Set up email headers
    $headers = "From: " . $data['email'] . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($adminEmail, $subject, $message);
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read input data
    $data = json_decode(file_get_contents('php://input'), true);

    // Send email
    $success = sendEmail($data, $adminEmail);

    if ($success) {
        // Email sent successfully
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully.", "code" => "200"));
    } else {
        // Failed to send email
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email."));
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}
