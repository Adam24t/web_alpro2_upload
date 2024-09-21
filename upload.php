<?php
if ($_FILES['csvFile']) {
    $file = $_FILES['csvFile'];
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($file['name']);

    // Move the uploaded file to the server's designated directory
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        echo "File has been uploaded successfully.";
    } else {
        echo "Failed to upload the file.";
    }
} else {
    echo "No file received.";
}
?>
