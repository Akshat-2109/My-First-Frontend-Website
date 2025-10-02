// QR_DarkMode.js

const toggleBtn = document.getElementById("toggleTheme");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");

  // Smooth transition for theme switch
  document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";

  // Switch icon
  if (icon) {
    icon.classList.toggle("bi-moon", !isDark);
    icon.classList.toggle("bi-sun", isDark);
  }
});
