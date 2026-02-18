document.getElementById('login-form').addEventListener('submit', async (e) => {
   e.preventDefault();
   const username = e.target[0].value;
   const password = e.target[1].value; 
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            localStorage.setItem('adminLoggedIn', 'true');
            // Redirect to admin dashboard or perform other actions
            window.location.href = 'Admin_panel.html'; // Example redirect
        } else {
            alert(data.error);
        }   
    }catch (err) {
        console.error(err);
        alert("An error occurred during login");
    }
});