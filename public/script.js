// Wait for the document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- HAMBURGER MENU LOGIC ---
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    // Toggle the menu when icon is clicked
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (for better UX)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- FORM SUBMISSION LOGIC (Existing Code) ---
    const form = document.getElementById('waitlistForm');
    const messageDisplay = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        const userData = {
            fullName,
            email,
            password,
            userType
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                messageDisplay.style.color = 'green';
                messageDisplay.textContent = '✅ ' + data.message;
                form.reset();
            } else {
                messageDisplay.style.color = 'red';
                messageDisplay.textContent = '❌ ' + data.message;
            }

        } catch (error) {
            console.error('Error:', error);
            messageDisplay.style.color = 'red';
            messageDisplay.textContent = '❌ Something went wrong. Please try again.';
        }
    });
});