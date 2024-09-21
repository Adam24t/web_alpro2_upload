document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Silakan pilih file CSV untuk diunggah!');
    } else {
        previewCSV(file); // Preview the file
        uploadCSV(file);  // Send the file via AJAX
    }
});

function previewCSV(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n');
        let previewHTML = '<table border="1">';
        
        lines.forEach((line, index) => {
            const row = line.split(',');
            previewHTML += '<tr>';
            row.forEach((cell) => {
                if (index === 0) {
                    previewHTML += `<th>${cell.trim()}</th>`; // Treat the first row as headers
                } else {
                    previewHTML += `<td>${cell.trim()}</td>`; // Data cells
                }
            });
            previewHTML += '</tr>';
        });
        
        previewHTML += '</table>';
        document.getElementById('csvPreview').innerHTML = previewHTML;
    };

    reader.readAsText(file);
}

function uploadCSV(file) {
    const formData = new FormData();
    formData.append('csvFile', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true); // Change 'upload.php' to your server-side endpoint

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('File berhasil diunggah!');
            console.log('Server Response:', xhr.responseText); // Debugging: check server response
        } else {
            alert('Terjadi kesalahan saat mengunggah file.');
        }
    };

    xhr.onerror = function() {
        alert('Request gagal. Pastikan server Anda berjalan.');
    };

    xhr.send(formData);
}


// Example: Fetch data from the API endpoint using AJAX
function fetchCoffeeData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://testingalpro.alwaysdata.net/api/getcoffee.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse and display the API response (assuming it's JSON)
            const coffeeData = JSON.parse(xhr.responseText);
            console.log(coffeeData);
            // Here you can update your webpage with the data (e.g., display it in HTML)
        } else {
            console.error('Failed to fetch coffee data');
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

// Call this function where appropriate, e.g., when your page loads
fetchCoffeeData();
