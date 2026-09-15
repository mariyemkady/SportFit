const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Get users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check duplicate email
  const exists = users.some(user =>
    user.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    alert("Email already exists");
    return;
  }

  // New user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    status: "active"
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("Registration successful!");

  form.reset();

  // بعد التسجيل نرجعو للصفحة الرئيسية
  window.location.href = "index.html";

});