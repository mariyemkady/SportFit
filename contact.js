const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(e){

    e.preventDefault();

    successMessage.textContent =
    "✅ Your message has been sent successfully!";

    form.reset();

});