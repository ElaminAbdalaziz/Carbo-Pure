<?php
// Define variables and initialize with empty values
$name = $email = $subject = $message = "";
$name_err = $email_err = $subject_err = $message_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validate name
    if (empty(trim($_POST["name"]))) {
        $name_err = "Please enter your name.";
    } else {
        $name = trim($_POST["name"]);
    }

    // Validate email
    if (empty(trim($_POST["email"]))) {
        $email_err = "Please enter your email.";
    } elseif (!filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL)) {
        $email_err = "Invalid email format.";
    } else {
        $email = trim($_POST["email"]);
    }

    // Validate subject
    if (empty(trim($_POST["subject"]))) {
        $subject_err = "Please enter a subject.";
    } else {
        $subject = trim($_POST["subject"]);
    }

    // Validate message
    if (empty(trim($_POST["message"]))) {
        $message_err = "Please enter your message.";
    } else {
        $message = trim($_POST["message"]);
    }

    // Check input errors before sending email
    if (empty($name_err) && empty($email_err) && empty($subject_err) && empty($message_err)) {
        
        // Recipient email address
        $recipient = "carbopure8@gmail.com";

        // Email subject
        $email_subject = "New Contact Message: $subject";

        // Email body
        $email_body = "You have received a new message from the user $name.\n\n".
                      "Subject: $subject\n\n".
                      "Message:\n$message";

        // Email headers
        $headers = "From: $email";

        // Send email
        if (mail($recipient, $email_subject, $email_body, $headers)) {
            echo "Message sent successfully.";
        } else {
            echo "Something went wrong. Please try again later.";
        }
    } else {
        // Display error messages
        echo $name_err . "<br>";
        echo $email_err . "<br>";
        echo $subject_err . "<br>";
        echo $message_err . "<br>";
    }
}
?>
