const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Alla fält måste fyllas i.");
        return;
    }

    const msg = {
        id: crypto.randomUUID(),
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    const stored = JSON.parse(localStorage.getItem("messages") || "[]");
    stored.push(msg);
    localStorage.setItem("messages", JSON.stringify(stored));

    alert("Tack för ditt meddelande!");
    contactForm.reset();
});