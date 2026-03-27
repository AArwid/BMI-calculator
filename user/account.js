
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const newUser = {
            id: crypto.randomUUID(),
            username: username,
            email: email,
            passwordHash: btoa(password),
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(u => u.email === email)) {
            alert("Email is already registered!");
            return;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Registration successful! Redirecting to login...");
        window.location.href = 'account.html';
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.email === email && atob(u.passwordHash) === password);

        if (user) {
            alert(`Welcome back, ${user.username}!`);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));

            if (sessionStorage.getItem('bmiRedirect') === 'true') {
                sessionStorage.removeItem('bmiRedirect');
                sessionStorage.setItem('bmiLoggedIn', 'true');
            }
            window.location.href = 'bmi.html';
        } else {
            alert("Invalid email or password.");
        }
    });
}