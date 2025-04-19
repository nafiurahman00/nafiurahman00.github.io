document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const savedMode = localStorage.getItem("dark-mode");
  
    if (savedMode === "enabled") {
      body.classList.add("dark-mode");
    }
  
    toggle?.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
      toggle.innerText = isDark ? "☀️" : "🌙";
    });
  
    if (toggle) {
      toggle.innerText = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    }
  });
  