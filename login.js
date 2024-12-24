document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
      

    console.log(username)
    console.log(password)
    // Clear any previous messages
    message.textContent = "";
    message.style.color = "black";

    // Show loading message
    message.textContent = "Validating credentials...";

    fetch('http://localhost:3000/users')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching users: ${res.status}`);
            }
            return res.json();
        })
        .then((users) => {
            console.log(users);

            // Check if the username and password match any user
            const user = users.find(
                (user) => user.username == username && user.user_password == password
            );
    
            if (user) {
                localStorage.setItem("userId",user.id)
                message.style.color = "green";
                message.textContent = "Login successful! Redirecting...";
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                message.style.color = "red";
                message.textContent = "Invalid username or password!";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            message.style.color = "red";
            message.textContent = "An error occurred. Please try again later.";
        });
});
