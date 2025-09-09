const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");

/* ---------- Sidebar Toggle ---------- */
function toggleMenu() {
  if (window.innerWidth <= 990 && sidebar && overlay) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }
}

function closeSidebar() {
  if (sidebar && overlay) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
}

if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

/* ---------- Dropdowns for Mobile ---------- */
document.querySelectorAll(".navbar li > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 990) {
      const parent = this.parentElement;
      const submenu = parent.querySelector(".dropdown");

      if (submenu) {
        e.preventDefault();
        parent.classList.toggle("open");
        submenu.classList.toggle("show");
      }
    }
  });
});

document.addEventListener("click", function (e) {
  if (window.innerWidth <= 990 && !e.target.closest(".navbar li")) {
    document.querySelectorAll(".navbar li.open").forEach((li) => {
      li.classList.remove("open");
      const submenu = li.querySelector(".dropdown");
      if (submenu) submenu.classList.remove("show");
    });
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 990) {
    closeSidebar();
    document.querySelectorAll(".navbar li").forEach((li) => {
      li.classList.remove("open");
      const submenu = li.querySelector(".dropdown");
      if (submenu) submenu.classList.remove("show");
    });
  }
});

/* ---------- Smooth Scroll for Anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ---------- Sidebar Tabs ---------- */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.getAttribute("data-tab");
    tabContents.forEach((content) => content.classList.remove("active"));
    const activeTab = document.getElementById(tab);
    if (activeTab) activeTab.classList.add("active");
  });
});

/* ---------- Jewellery Cards Animation ---------- */
const cards = document.querySelectorAll(".card");
let ticking = false;

function showCardsOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const triggerBottom = window.innerHeight * 0.85;
      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) card.classList.add("show");
      });
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", showCardsOnScroll);
window.addEventListener("load", showCardsOnScroll);

/* ---------- Card Click Navigation ---------- */
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    if (link) window.location.href = link;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // For mobile: expand/collapse dropdowns
  const dropdownLinks = document.querySelectorAll(".navbar .dropdown > a");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains("dropdown-menu")) {
          submenu.classList.toggle("show");
        }
      }
    });
  });
});