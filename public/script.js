// Wait for the document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the form element from the HTML
    const form = document.getElementById('waitlistForm');
    const messageDisplay = document.getElementById('formMessage');

    // Listen for the 'submit' event (when the user clicks the button)
    form.addEventListener('submit', async (e) => {
        // Prevent the default behavior (which is reloading the page)
        e.preventDefault();

        // 1. GATHER DATA
        // Grab values from the input fields
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        // Create a data object to send to the backend
        const userData = {
            fullName,
            email,
            password,
            userType
        };

        try {
            // 2. SEND DATA TO BACKEND
            // Use the 'fetch' API to send a POST request to our server
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Tell server we are sending JSON
                },
                body: JSON.stringify(userData) // Convert JS object to JSON string
            });

            const data = await response.json();

            // 3. HANDLE RESPONSE
            if (response.ok) {
                // Success!
                messageDisplay.style.color = 'green';
                messageDisplay.textContent = '✅ ' + data.message;
                form.reset(); // Clear the form fields
            } else {
                // Error (e.g., user already exists)
                messageDisplay.style.color = 'red';
                messageDisplay.textContent = '❌ ' + data.message;
            }

        } catch (error) {
            // Network error (e.g., server is down)
            console.error('Error:', error);
            messageDisplay.style.color = 'red';
            messageDisplay.textContent = '❌ Something went wrong. Please try again.';
        }
    });
});