// script.js

// Theme toggle with persistence
const toggleDark = () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

document.getElementById("theme-toggle")?.addEventListener("click", toggleDark);
document.getElementById("theme-toggle-mobile")?.addEventListener("click", toggleDark);

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

// Navbar scroll behavior (hide on scroll down, show on scroll up)
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled-nav");
  } else {
    navbar.classList.remove("scrolled-nav");
  }

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-100px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = { name, email, message, time: new Date().toLocaleString() };
    const oldData = JSON.parse(localStorage.getItem("contactMessages")) || [];
    oldData.push(formData);
    localStorage.setItem("contactMessages", JSON.stringify(oldData));

    alert("Thank you! Your message has been submitted.");
    contactForm.reset();
  });
}

// Support chat toggle
const supportBtn = document.getElementById("support-btn");
const chatWidget = document.getElementById("chatWidget");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const closeChat = document.getElementById("closeChat");

if (supportBtn && chatWidget) {
  supportBtn.addEventListener("click", () => {
    chatWidget.classList.toggle("hidden");
    chatWidget.classList.add("fade-in");
  });
}

if (closeChat) {
  closeChat.addEventListener("click", () => {
    chatWidget.classList.add("hidden");
  });
}

// Simulate chat response
if (chatForm) {
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // Append user message
    const userDiv = document.createElement("div");
    userDiv.className = "text-right text-blue-600 dark:text-blue-400";
    userDiv.textContent = userMsg;
    chatMessages.appendChild(userDiv);

    chatInput.value = "";

    // Simulate bot reply
    setTimeout(() => {
      const botDiv = document.createElement("div");
      botDiv.className = "text-gray-600 dark:text-gray-300";
      botDiv.textContent = "Thanks! We'll get back to you shortly.";
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  });
}

// AOS init
AOS.init({
  once: true,
  duration: 800,
});