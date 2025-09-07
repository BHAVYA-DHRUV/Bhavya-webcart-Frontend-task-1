const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");

// Toggle sidebar
function toggleMenu() {
  if (window.innerWidth <= 990) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }
}

// Close sidebar
function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

// Dropdown toggle for mobile (desktop nav dropdown)
document.querySelectorAll(".dropdown > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 990) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle("open");
      const submenu = parent.querySelector(".dropdown");
      if (submenu) submenu.classList.toggle("show");
    }
  });
});

// Close mobile dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 990 && !e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
      const submenu = dropdown.querySelector(".dropdown");
      if (submenu) submenu.classList.remove("show");
    });
  }
});

// Reset on resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 990) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("open");
      const submenu = dropdown.querySelector(".dropdown");
      if (submenu) submenu.classList.remove("show");
    });
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Sidebar Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.getAttribute("data-tab");
    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  });
});
