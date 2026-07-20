<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos del formulario
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $categoria = $_POST['categoria'];
    $mensaje = $_POST['mensaje'];

    // Correo de destino (¡Cámbialo por tu correo!)
    $to = "tu-correo@academia.com";
    $subject = "Nuevo mensaje desde la web de Hércules";

    // Construir el cuerpo del correo
    $body = "Has recibido un nuevo mensaje desde tu sitio web.\n\n";
    $body .= "Nombre: $nombre\n";
    $body .= "Teléfono: $telefono\n";
    $body .= "Categoría: $categoria\n";
    $body .= "Mensaje:\n$mensaje\n";

    // Cabeceras del correo
    $headers = "From: webmaster@academia-hercules.com\r\n";
    $headers .= "Reply-To: $nombre <$telefono>\r\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "<!DOCTYPE html>
        <html lang='es'>
        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='refresh' content='3;url=index.html'>
            <title>Mensaje enviado</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0a3d62; color: white; }
                .container { max-width: 500px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; }
                h1 { color: #f39c12; }
                p { font-size: 1.2rem; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h1>¡Mensaje enviado!</h1>
                <p>Gracias por contactarnos, $nombre. En breve nos pondremos en contacto contigo.</p>
                <p>Serás redirigido en 3 segundos...</p>
            </div>
        </body>
        </html>";
    } else {
        echo "Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo o contáctanos directamente por WhatsApp.";
    }
} else {
    // Si alguien intenta acceder directamente al archivo sin enviar el formulario
    header("Location: index.html");
    exit();
}
?>