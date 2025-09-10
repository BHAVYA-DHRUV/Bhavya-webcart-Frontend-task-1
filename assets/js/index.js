// ========================================
// JEWELRY STORE - COMPLETE JAVASCRIPT
// ========================================

// ========================================
// 1. SIDEBAR NAVIGATION SYSTEM
// ========================================

// Sidebar toggle open/close
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open sidebar
menuToggle?.addEventListener('click', () => {
  sidebarMenu.classList.add('show');
  sidebarOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
});

// Close sidebar
menuClose?.addEventListener('click', () => {
  closeSidebar();
});

// Close sidebar when clicking overlay
sidebarOverlay?.addEventListener('click', () => {
  closeSidebar();
});

// Helper function to close sidebar
function closeSidebar() {
  sidebarMenu.classList.remove('show');
  sidebarOverlay.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// ========================================
// 2. SIDEBAR TABS FUNCTIONALITY
// ========================================

// Tabs switch
document.querySelectorAll(".sidebar-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    document.querySelectorAll(".sidebar-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Hide all content sections
    document.querySelectorAll(".sidebar-content").forEach(c => c.classList.remove("active"));

    // Show selected content
    const targetContent = document.getElementById(tab.dataset.tab + "Tab");
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

// ========================================
// 3. NESTED SUBMENU FUNCTIONALITY
// ========================================

// Nested submenu toggle (single listener for all levels)
document.querySelectorAll(".sidebar-link.has-submenu").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const submenu = link.nextElementSibling;
    const icon = link.querySelector(".toggle-icon i");
    if (!submenu) return;

    // Close other submenus at the same level
    const parent = link.parentElement;
    parent.querySelectorAll(":scope > .submenu.open").forEach(s => {
      if (s !== submenu) {
        s.classList.remove("open");
        const sibIcon = s.previousElementSibling?.querySelector(".toggle-icon i");
        if (sibIcon) {
          sibIcon.classList.remove("bi-chevron-compact-up");
          sibIcon.classList.add("bi-chevron-compact-down");
        }
      }
    });

    // Toggle current submenu
    submenu.classList.toggle("open");
    if (icon) {
      icon.classList.toggle("bi-chevron-compact-up");
      icon.classList.toggle("bi-chevron-compact-down");
    }
  });
});

// ========================================
// 4. SHOPPING CART FUNCTIONALITY
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  // Update cart total calculation
  function updateTotal() {
    try {
      let total = 0;
      let itemCount = 0;

      document.querySelectorAll(".cart-item").forEach(item => {
        const price = parseInt(item.getAttribute("data-price")) || 0;
        const qtyInput = item.querySelector(".quantity");
        const qty = parseInt(qtyInput?.value) || 1;

        const itemTotal = price * qty;
        total += itemTotal;
        itemCount += qty;

        // Update individual item price display
        const priceElement = item.querySelector(".price");
        if (priceElement) {
          priceElement.innerText = "₹" + itemTotal.toLocaleString();
        }
      });

      // Update total display
      const cartTotalElement = document.getElementById("cartTotal");
      if (cartTotalElement) {
        cartTotalElement.innerText = "₹" + total.toLocaleString();
      }

      // Update cart count badge
      const cartCountElement = document.querySelector(".cart-count");
      if (cartCountElement) {
        cartCountElement.textContent = itemCount;
      }

    } catch (error) {
      console.error('Error updating cart total:', error);
    }
  }

  // Plus button functionality
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", function () {
      const qtyInput = this.parentElement.querySelector(".quantity");
      if (qtyInput) {
        const currentValue = parseInt(qtyInput.value) || 1;
        qtyInput.value = currentValue + 1;
        updateTotal();
      }
    });
  });

  // Minus button functionality
  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", function () {
      const qtyInput = this.parentElement.querySelector(".quantity");
      if (qtyInput) {
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) {
          qtyInput.value = current - 1;
          updateTotal();
        }
      }
    });
  });

  // Remove item functionality
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      if (cartItem && confirm("Remove this item from cart?")) {
        cartItem.remove();
        updateTotal();
      }
    });
  });

  // Initial calculation
  updateTotal();
});

// ========================================
// 5. SEARCH FUNCTIONALITY
// ========================================

const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("searchInput");

// Toggle search container
searchIcon?.addEventListener("click", () => {
  searchContainer.classList.toggle("show");
  if (searchContainer.classList.contains("show")) {
    searchInput.focus();
  }
});

// Search input functionality with debounce
let searchTimeout;
searchInput?.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(e.target.value);
  }, 300);
});

// Perform search function
function performSearch(query) {
  if (query.length < 2) return;

  console.log("Searching for:", query);
  // Add your search logic here
  // Example: filter jewelry items, make API calls, etc.
}

// ========================================
// 6. JEWELRY DATA AND GALLERY SYSTEM
// ========================================
// Enhanced Jewelry Data with Separate Men & Women Categories and 1 Gram Jewelry
const jewelryData = {
  // ========================================
  // MEN'S JEWELRY MAIN CATEGORIES
  // ========================================

  // Men's Chains
  men_chains: {
    title: "Men's Chains Collection",
    images: [
      {
        url: "assets/img/men-jewelry/chain/1.webp",
        title: "Heavy Cuban Link Chain - Men",
        price: "₹3,500 - ₹12,000",
        description:
          "Bold Cuban link chain designed for men. Heavy weight and masculine appeal.",
        badge: "BESTSELLER",
      },
      {
        url: "assets/img/men-jewelry/chain/2.webp",
        title: "Men's Gold Rope Chain",
        price: "₹2,800 - ₹9,500",
        description: "Thick rope design chain perfect for men's style.",
        badge: "CLASSIC",
      },
      {
        url: "assets/img/men-jewelry/chain/3.webp",
        title: "Men's Box Link Chain",
        price: "₹2,200 - ₹8,200",
        description: "Strong box link pattern ideal for pendant wearing.",
        badge: "TRENDING",
      },
      {
        url: "assets/img/men-jewelry/chain/4.webp",
        title: "Men's Figaro Chain",
        price: "₹2,400 - ₹8,800",
        description: "Classic Figaro pattern with masculine thickness.",
        badge: "POPULAR",
      },
      {
        url: "assets/img/men-jewelry/chain/5.webp",
        title: "Men's Snake Chain",
        price: "₹3,200 - ₹10,500",
        description: "Flexible snake design with premium finish.",
        badge: "EXCLUSIVE",
      },
    ],
    sections: [
      {
        title: "Men's Chain Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / 925 Sterling Silver"],
          ["Length Options", '20", 22", 24", 26", 28", 30"'],
          ["Chain Width", "4mm - 12mm (Men's Sizes)"],
          ["Weight Range", "15g - 80g"],
          ["Clasp Type", "Heavy Duty Lobster Clasp"],
          ["Thickness", "3mm - 8mm"],
          ["Style", "Masculine, Bold Design"],
          ["Occasion", "Daily, Party, Formal"],
          ["Warranty", "1 Year Manufacturing"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Men's Rings
  men_rings: {
    title: "Men's Rings Collection",
    images: [
      {
        url: "assets/img/men-jewelry/rings/1.webp",
        title: "Men's Signet Ring",
        price: "₹4,500 - ₹15,000",
        description: "Classic signet ring with custom engraving options.",
        badge: "SIGNATURE",
      },
      {
        url: "assets/img/men-jewelry/rings/2.webp",
        title: "Men's Wedding Band",
        price: "₹3,200 - ₹12,000",
        description: "Premium wedding band for men in gold finish.",
        badge: "WEDDING",
      },
      {
        url: "assets/img/men-jewelry/rings/3.webp",
        title: "Men's Statement Ring",
        price: "₹2,800 - ₹9,500",
        description: "Bold statement ring with masculine design.",
        badge: "BOLD",
      },
      {
        url: "assets/img/men-jewelry/rings/4.webp",
        title: "Men's Class Ring",
        price: "₹3,500 - ₹11,500",
        description: "Traditional class ring with stone setting.",
        badge: "TRADITIONAL",
      },
      {
        url: "assets/img/men-jewelry/rings/5.jpg",
        title: "Men's Band Ring Set",
        price: "₹4,200 - ₹13,800",
        description: "Set of matching band rings for versatile styling.",
        badge: "SET",
      },
    ],
    sections: [
      {
        title: "Men's Rings Specifications",
        type: "table",
        content: [
          ["Material", "Sterling Silver / Brass / Copper"],
          ["Ring Sizes", "Adjustable / Fixed (Size 1-4)"],
          ["Width Options", "2mm - 6mm"],
          ["Weight Per Piece", "0.5g - 3g"],
          ["Design Patterns", "Plain / Carved / Beaded / Twisted"],
          ["Opening Style", "Adjustable Gap / Fixed Circle"],
          ["Set Options", "Single / Pair / Set of 4-8"],
          ["Comfort Level", "Smooth Inner Surface"],
          ["Cultural Style", "Indian Traditional / Modern"],
          ["Cultural Significance", "Traditional Indian Custom"],
          ["Hypoallergenic", "Generally Skin Safe"],
          ["Warranty", "3 Months Replacement"],
          ["Care Instructions", "Regular cleaning prevents tarnish"],
          ["Gift Packaging", "Small Pouch Included"],
          ["Return Policy", "10-Day Easy Returns"],
        ],
      },
    ],
  },

  // Men's Bracelets
  men_bracelets: {
    title: " Men's Bracelets Collection",
    images: [
      {
        url: "assets/img/men-jewelry/Bracelet/1.webp",
        title: "Men's Gold Link Bracelet",
        price: "₹3,500 - ₹12,000",
        description: "Heavy link bracelet designed for men's wrist.",
        badge: "MASCULINE",
      },
      {
        url: "assets/img/men-jewelry/Bracelet/2.webp",
        title: "Men's Cuban Bracelet",
        price: "₹4,200 - ₹14,500",
        description: "Cuban link bracelet with premium finish.",
        badge: "PREMIUM",
      },
      {
        url: "assets/img/men-jewelry/Bracelet/3.webp",
        title: "Men's Cuff Bracelet",
        price: "₹2,800 - ₹9,500",
        description: "Bold cuff bracelet with adjustable fit.",
        badge: "BOLD",
      },
    ],
    sections: [
      {
        title: "Men's  Bracelet Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver"],
          ["Length Options", '6.5" - 8.5" (Adjustable Available)'],
          ["Width Range", "3mm - 15mm"],
          ["Clasp Types", "Lobster / Magnetic / Toggle / Box"],
          ["Weight Range", "8g - 35g"],
          ["Stone Setting", "Prong / Channel / Bezel Set"],
          ["Adjustability", "Micro-adjustable Extension"],
          ["Safety Features", "Double Lock Clasp System"],
          ["Flexibility", "Full Flexible Design"],
          ["Water Resistance", "Splash Proof"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Men's Kada
  men_kada: {
    title: "Men's Traditional Kada Collection",
    images: [
      {
        url: "assets/img/men-jewelry/kada/1.webp",
        title: "Heavy Gold Kada - Men",
        price: "₹6,000 - ₹18,000",
        description: "Traditional heavy gold kada with masculine appeal.",
        badge: "TRADITIONAL",
      },
      {
        url: "assets/img/men-jewelry/kada/2.webp",
        title: "Men's Silver Kada",
        price: "₹3,500 - ₹12,000",
        description: "Contemporary silver kada for modern men.",
        badge: "MODERN",
      },
      {
        url: "assets/img/men-jewelry/kada/3.webp",
        title: "Men's Carved Kada",
        price: "₹4,200 - ₹15,500",
        description: "Intricately carved kada with traditional motifs.",
        badge: "CARVED",
      },
    ],
    sections: [
      {
        title: "Men's  Kada Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver / Brass"],
          ["Inner Diameter", '2.2" - 3.0" (Custom Available)'],
          ["Width Range", "8mm - 25mm"],
          ["Weight Range", "15g - 120g"],
          ["Opening Style", "Fixed / Hinged / Adjustable"],
          ["Surface Finish", "High Polish / Matte / Textured"],
          ["Design Patterns", "Plain / Carved / Religious"],
          ["Cultural Style", "Traditional / Modern / Fusion"],
          ["Comfort Features", "Smooth Inner Edges"],
          ["Cultural Significance", "Strength, Protection, Faith"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Men's Pendants
  men_pendants: {
    title: "Men's Pendants Collection",
    images: [
      {
        url: "assets/img/men-jewelry/Pendant/1.webp",
        title: "Men's Om Pendant",
        price: "₹1,200 - ₹4,500",
        description: "Sacred Om pendant designed for men.",
        badge: "SPIRITUAL",
      },
      {
        url: "assets/img/men-jewelry/Pendant/2.webp",
        title: "Men's Cross Pendant",
        price: "₹1,500 - ₹5,200",
        description: "Classic cross pendant with masculine design.",
        badge: "FAITH",
      },
      {
        url: "assets/img/men-jewelry/Pendant/3.webp",
        title: "Men's Initial Pendant",
        price: "₹1,000 - ₹3,800",
        description: "Personalized initial pendant for men.",
        badge: "PERSONAL",
      },
    ],
    sections: [
      {
        title: "Men's  Pendant Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver"],
          ["Size Range", "10mm - 40mm (Height x Width)"],
          ["Chain Compatibility", "Universal Fit (All Chains)"],
          ["Weight Range", "1g - 15g"],
          ["Bail Type", "Fixed Loop / Removable / Hinged"],
          ["Stone Setting", "Available with Premium CZ"],
          ["Thickness", "2mm - 5mm"],
          ["Engraving Options", "Custom Text / Symbols Available"],
          ["Chain Included", '16" - 24" (Selected Models)'],
          ["Personalization", "Initials, Names, Dates"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // ========================================
  // WOMEN'S JEWELRY MAIN CATEGORIES
  // ========================================

  // Women's Chains
  women_chains: {
    title: " Women's Chains Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-chain/1.webp",
        title: "Women's Delicate Gold Chain",
        price: "₹1,800 - ₹6,500",
        description: "Elegant delicate chain perfect for daily wear.",
        badge: "ELEGANT",
      },
      {
        url: "assets/img/women-jewelry/women-chain/2.webp",
        title: "Women's Pearl Chain",
        price: "₹2,200 - ₹8,200",
        description: "Beautiful pearl chain with gold accents.",
        badge: "SOPHISTICATED",
      },
      {
        url: "assets/img/women-jewelry/women-chain/3.webp",
        title: "Women's Box Chain",
        price: "₹1,500 - ₹5,800",
        description: "Delicate box chain design for pendants.",
        badge: "VERSATILE",
      },
      {
        url: "assets/img/women-jewelry/women-chain/4.webp",
        title: "Women's Snake Chain",
        price: "₹2,000 - ₹7,200",
        description: "Smooth snake chain with feminine appeal.",
        badge: "FEMININE",
      },
      {
        url: "assets/img/women-jewelry/women-chain/5.webp",
        title: "Women's Rope Chain",
        price: "₹1,700 - ₹6,200",
        description: "Delicate rope pattern chain for women.",
        badge: "CLASSIC",
      },
    ],
    sections: [
      {
        title: "Women's Chain Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / 925 Sterling Silver"],
          ["Length Options", '16", 18", 20", 22", 24", Custom'],
          ["Chain Width", "2mm - 8mm"],
          ["Weight Range", "5g - 50g"],
          ["Clasp Type", "Lobster Clasp / Spring Ring"],
          ["Link Pattern", "Cuban, Rope, Box, Snake, Figaro"],
          ["Surface Finish", "High Polish / Matte / Brushed"],
          ["Thickness", "1.5mm - 6mm"],
          ["Tarnish Resistance", "Anti-Tarnish Coating"],
          ["Water Resistance", "Splash Resistant"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Rings
  women_rings: {
    title: " Women's Rings Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-rings/1.webp",
        title: "Women's Solitaire Ring",
        price: "₹8,500 - ₹28,000",
        description: "Classic solitaire ring with premium CZ stone.",
        badge: "PREMIUM",
      },
      {
        url: "assets/img/women-jewelry/women-rings/2.webp",
        title: "Women's Engagement Ring",
        price: "₹12,000 - ₹35,000",
        description: "Beautiful engagement ring with halo setting.",
        badge: "ENGAGEMENT",
      },
      {
        url: "assets/img/women-jewelry/women-rings/3.webp",
        title: "Women's Stackable Rings",
        price: "₹2,500 - ₹8,500",
        description: "Set of stackable rings for layered look.",
        badge: "TRENDY",
      },
      {
        url: "assets/img/women-jewelry/women-rings/4.webp",
        title: "Women's Cocktail Ring",
        price: "₹4,200 - ₹14,500",
        description: "Statement cocktail ring for parties.",
        badge: "STATEMENT",
      },
      {
        url: "assets/img/women-jewelry/women-rings/5.webp",
        title: "Women's Wedding Band",
        price: "₹3,500 - ₹12,000",
        description: "Elegant wedding band for women.",
        badge: "WEDDING",
      },
    ],
    sections: [
      {
        title: "Women's  Ring Specifications",
        type: "table",
        content: [
          ["Material", "18K Gold Plated / Sterling Silver / Platinum"],
          ["Ring Sizes", "4-12 (US) / J-Z (UK) Standard"],
          ["Stone Quality", "AAA Grade CZ / Natural Gemstones"],
          ["Setting Types", "Prong, Bezel, Halo, Channel, Tension"],
          ["Band Width", "2mm - 8mm"],
          ["Stone Size", "0.25ct - 3ct equivalent"],
          ["Resizing", "Free Lifetime Resizing (±2 sizes)"],
          ["Metal Weight", "2g - 15g"],
          ["Comfort Fit", "Smooth Inner Band"],
          ["Certification", "Quality Certificate Included"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Bracelets
  women_bracelets: {
    title: "Women's Bracelets Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-bracelet/1.webp",
        title: "Women's Diamond Tennis Bracelet",
        price: "₹8,500 - ₹25,000",
        description: "Premium tennis bracelet with CZ stones.",
        badge: "LUXURY",
      },
      {
        url: "assets/img/women-jewelry/women-bracelet/2.webp",
        title: "Women's Charm Bracelet",
        price: "₹2,200 - ₹8,200",
        description: "Customizable charm bracelet with removable charms.",
        badge: "CUSTOMIZABLE",
      },
      {
        url: "assets/img/women-jewelry/women-bracelet/3.webp",
        title: "Women's Pearl Bracelet",
        price: "₹3,500 - ₹12,000",
        description: "Elegant pearl bracelet with gold spacers.",
        badge: "ELEGANT",
      },
    ],
    sections: [
      {
        title: "Women's  Bracelet Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver"],
          ["Length Options", '6.5" - 8.5" (Adjustable Available)'],
          ["Width Range", "3mm - 15mm"],
          ["Clasp Types", "Lobster / Magnetic / Toggle / Box"],
          ["Weight Range", "8g - 35g"],
          ["Stone Setting", "Prong / Channel / Bezel Set"],
          ["Adjustability", "Micro-adjustable Extension"],
          ["Safety Features", "Double Lock Clasp System"],
          ["Flexibility", "Full Flexible Design"],
          ["Water Resistance", "Splash Proof"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Earrings
  women_earrings: {
    title: "Women's Earrings Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-Earring/1.webp",
        title: "Women's Diamond Stud Earrings",
        price: "₹2,500 - ₹9,500",
        description: "Classic diamond studs perfect for any occasion.",
        badge: "CLASSIC",
      },
      {
        url: "assets/img/women-jewelry/women-Earring/2.webp",
        title: "Women's Drop Earrings",
        price: "₹3,200 - ₹12,500",
        description: "Elegant drop earrings with cascading design.",
        badge: "ELEGANT",
      },
      {
        url: "assets/img/women-jewelry/women-Earring/3.webp",
        title: "Women's Hoop Earrings",
        price: "₹1,800 - ₹6,500",
        description: "Trendy hoop earrings in various sizes.",
        badge: "TRENDY",
      },
      {
        url: "assets/img/women-jewelry/women-Earring/4.webp",
        title: "Women's Chandelier Earrings",
        price: "₹4,500 - ₹16,500",
        description: "Glamorous chandelier earrings for special occasions.",
        badge: "GLAMOROUS",
      },
      {
        url: "assets/img/women-jewelry/women-Earring/5.webp",
        title: "Women's Pearl Earrings",
        price: "₹2,800 - ₹9,800",
        description: "Timeless pearl earrings with gold settings.",
        badge: "TIMELESS",
      },
    ],
    sections: [
      {
        title: "Women's  Earring Specifications",
        type: "table",
        content: [
          ["Material", "18K Gold Plated / Sterling Silver"],
          ["Stone Quality", "AAA Grade CZ / Natural Gems"],
          ["Length Range", "8mm - 60mm"],
          ["Weight Per Pair", "1g - 12g"],
          ["Back Types", "Push / Screw / Leverback / French Hook"],
          ["Post Material", "Surgical Steel (Hypoallergenic)"],
          ["Stone Size", "3mm - 8mm (for studs)"],
          ["Age Suitability", "Kids (3+), Teen, Adult"],
          ["Occasion Wear", "Daily, Party, Wedding, Formal"],
          ["Stone Setting", "Prong, Bezel, Micro-Pave"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Pendants
  women_pendants: {
    title: "Women's Pendants Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-pendant/1.webp",
        title: "Women's Heart Pendant",
        price: "₹1,200 - ₹4,500",
        description: "Romantic heart pendant with CZ stones.",
        badge: "ROMANTIC",
      },
      {
        url: "assets/img/women-jewelry/women-pendant/2.webp",
        title: "Women's Butterfly Pendant",
        price: "₹1,500 - ₹5,200",
        description: "Delicate butterfly pendant with colorful accents.",
        badge: "COLORFUL",
      },
      {
        url: "assets/img/women-jewelry/women-pendant/3.webp",
        title: "Women's Initial Pendant",
        price: "₹800 - ₹3,200",
        description: "Personalized initial pendant in script font.",
        badge: "PERSONAL",
      },
    ],
    sections: [
      {
        title: "Women's Pendant Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver"],
          ["Size Range", "10mm - 40mm (Height x Width)"],
          ["Chain Compatibility", "Universal Fit (All Chains)"],
          ["Weight Range", "1g - 15g"],
          ["Bail Type", "Fixed Loop / Removable / Hinged"],
          ["Stone Setting", "Available with Premium CZ"],
          ["Thickness", "2mm - 5mm"],
          ["Engraving Options", "Custom Text / Symbols Available"],
          ["Chain Included", '16" - 24" (Selected Models)'],
          ["Personalization", "Initials, Names, Dates"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Bangles
  women_bangles: {
    title: "Women's Bangles Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-Bangle/1.webp",
        title: "Women's Gold Bangles Set",
        price: "₹3,500 - ₹12,500",
        description: "Traditional gold bangles set for women.",
        badge: "TRADITIONAL",
      },
      {
        url: "assets/img/women-jewelry/women-Bangle/3.webp",
        title: "Women's Stone Work Bangles",
        price: "₹2,800 - ₹9,500",
        description: "Elegant bangles with premium stone work.",
        badge: "ELEGANT",
      },
      {
        url: "assets/img/women-jewelry/women-Bangle/4.webp",
        title: "Women's Pearl Bangles",
        price: "₹4,200 - ₹14,500",
        description: "Sophisticated pearl embedded bangles.",
        badge: "SOPHISTICATED",
      },
    ],
    sections: [
      {
        title: "Women's Bangles Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver"],
          ["Inner Diameter", '2.2" - 2.8" (Standard Sizes)'],
          ["Width Options", "4mm - 20mm"],
          ["Weight Per Piece", "5g - 25g"],
          ["Set Options", "Single / Pair / Set of 4-12"],
          ["Opening Type", "Fixed Circle / Hinged / Screw"],
          ["Surface Texture", "Smooth / Textured / Carved"],
          ["Design Patterns", "Plain / Floral / Geometric"],
          ["Occasion Wear", "Daily / Festival / Wedding"],
          ["Age Suitability", "Kids / Teen / Adult"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Nosepins
  women_nosepins: {
    title: "Women's Nosepins Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-Nosepin/1.webp",
        title: "Women's CZ Stone Nosepin",
        price: "₹300 - ₹1,500",
        description: "Delicate nosepin with sparkling CZ stone.",
        badge: "DELICATE",
      },
      {
        url: "assets/img/women-jewelry/women-Nosepin/2.webp",
        title: "Women's Pearl Nosepin",
        price: "₹250 - ₹1,200",
        description: "Elegant pearl nosepin with gold setting.",
        badge: "ELEGANT",
      },
      {
        url: "assets/img/women-jewelry/women-Nosepin/3.webp",
        title: "Women's Floral Nosepin",
        price: "₹350 - ₹1,800",
        description: "Beautiful floral design nosepin.",
        badge: "FLORAL",
      },
    ],
    sections: [
      {
        title: "Women's Nosepins Specifications",
        type: "table",
        content: [
          ["Material", "18K Gold Plated / Sterling Silver"],
          ["Stone Type", "CZ / Natural Gems / Pearl"],
          ["Stone Size", "1.5mm - 4mm"],
          ["Post Thickness", "0.6mm - 0.8mm (20-22 gauge)"],
          ["Post Length", "6mm - 8mm"],
          ["Design Types", "Stud / Hoop / L-Shape / Bone"],
          ["Backing Style", "Push-fit / Screw / Ball End"],
          ["Weight", "0.1g - 1g"],
          ["Post Material", "Surgical Steel (Hypoallergenic)"],
          ["Cultural Style", "Traditional Indian / Modern"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "3 Months Replacement"],
          ["Care Instructions", "Clean regularly with cotton swab"],
          ["Gift Packaging", "Small Jewelry Pouch"],
          ["Return Policy", "15-Day Easy Returns"],
        ],
      },
    ],
  },

  // Women's Necklaces
  women_necklaces: {
    title: "Women's Necklaces Collection",
    images: [
      {
        url: "assets/img/women-jewelry/women-Necklace/1.webp",
        title: "Women's Pearl Necklace Set",
        price: "₹5,500 - ₹18,500",
        description: "Complete pearl necklace set with earrings.",
        badge: "COMPLETE SET",
      },
      {
        url: "assets/img/women-jewelry/women-Necklace/2.webp",
        title: "Women's Statement Necklace",
        price: "₹6,200 - ₹22,000",
        description: "Bold statement necklace for special occasions.",
        badge: "STATEMENT",
      },
      {
        url: "assets/img/women-jewelry/women-Necklace/3.webp",
        title: "Women's Choker Necklace",
        price: "₹2,800 - ₹9,500",
        description: "Trendy choker necklace with modern design.",
        badge: "TRENDY",
      },
    ],
    sections: [
      {
        title: "Women's Necklaces Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / Sterling Silver / Pearl"],
          ["Length Options", '16" Choker - 36" Long'],
          ["Pearl Size", "4mm - 12mm (Natural/Cultured)"],
          ["Clasp Types", "Lobster / Toggle / Magnetic / Box"],
          ["Weight Range", "10g - 80g"],
          ["Strand Count", "Single / Double / Triple Strand"],
          ["Design Style", "Classic / Modern / Traditional"],
          ["Set Options", "Necklace Only / With Earrings"],
          ["Adjustability", "Fixed Length / Adjustable Chain"],
          ["Stone Setting", "CZ / Natural Gems / Pearl / Beads"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Care Instructions", "Keep dry, clean with soft cloth"],
          ["Gift Packaging", "Premium Box Included"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

    // ========================================
    // 1 GRAM JEWELLERY SECTIONS
    // ========================================
    one_gram: {
      title: "🌟 1 Gram Gold Jewellery Collection",
      images: [
        {
          url: "assets/img/men-jewelry/chain/4.webp",
          title: "1 Gram Gold Complete Collection",
          price: "₹800 - ₹8,500",
          description:
            "Complete 1 gram gold jewelry collection for men and women.",
          badge: "COMPLETE SET",
        },
      ],
    },

    // 1 Gram Men's Collection
    one_gram_men: {
      title: "1 Gram Gold - Men's Collection",
      images: [
        {
          url: "assets/img/men-jewelry/chain/1.webp",
          title: "1 Gram Gold Chain - Men",
          price: "₹1,500 - ₹5,500",
          description:
            "Premium 1 gram gold chain for men with authentic gold look.",
          badge: "1 GRAM GOLD",
        },
        {
          url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
          title: "1 Gram Gold Kada - Men",
          price: "₹2,800 - ₹8,500",
          description:
            "Traditional 1 gram gold kada with heavy masculine appeal.",
          badge: "TRADITIONAL",
        },
        {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
          title: "1 Gram Gold Ring - Men",
          price: "₹1,200 - ₹4,200",
          description: "Bold 1 gram gold ring with masculine design elements.",
          badge: "BOLD",
        },
        {
          url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
          title: "1 Gram Gold Bracelet - Men",
          price: "₹2,200 - ₹7,200",
          description: "Stylish 1 gram gold bracelet designed for modern men.",
          badge: "MODERN",
        },
        {
          url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
          title: "1 Gram Gold Pendant - Men",
          price: "₹800 - ₹3,200",
          description: "Religious and spiritual pendants in 1 gram gold for men.",
          badge: "SPIRITUAL",
        },
      ],
      sections: [
        {
          title: "1 Gram Gold Men's Specifications",
          type: "table",
          content: [
            ["Material", "1 Gram Gold Plated Brass/Copper Base"],
            ["Gold Quality", "22K Gold Electroplating"],
            ["Plating Thickness", "2-4 Micron Gold Layer"],
            ["Durability", "8-15 Months with Proper Care"],
            ["Weight Range", "8g - 120g"],
            ["Chain Lengths", '20" - 30" (Men\'s Standard)'],
            ["Ring Sizes", "18-25 (Indian) / 8-12 (US)"],
            ["Kada Sizes", '2.5" - 3.2" Inner Diameter'],
            ["Maintenance", "Store in Dry Environment"],
            ["Water Contact", "Avoid Water and Moisture"],
            ["Occasion Wear", "Festivals, Weddings, Religious Events"],
            ["Warranty", "45 Days Manufacturing Defect"],
            ["Care Instructions", "Clean with dry cloth, avoid chemicals"],
            ["Gift Packaging", "Premium Jewelry Box Included"],
            ["Return Policy", "20-Day Easy Returns"],
          ],
        },
      ],
    },

    // 1 Gram Women's Collection
    one_gram_women: {
      title: "1 Gram Gold - Women's Collection",
      images: [
        {
          url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
          title: "1 Gram Gold Necklace Set - Women",
          price: "₹3,500 - ₹12,500",
          description:
            "Complete 1 gram gold necklace set with matching earrings.",
          badge: "BRIDAL SET",
        },
        {
          url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
          title: "1 Gram Gold Earrings - Women",
          price: "₹1,200 - ₹4,500",
          description: "Traditional 1 gram gold earrings with stone work.",
          badge: "TRADITIONAL",
        },
        {
          url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
          title: "1 Gram Gold Bangles Set - Women",
          price: "₹2,200 - ₹8,200",
          description: "Set of 6-8 bangles in 1 gram gold with elegant design.",
          badge: "BANGLE SET",
        },
        {
          url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
          title: "1 Gram Gold Chain - Women",
          price: "₹1,500 - ₹5,800",
          description: "Delicate 1 gram gold chain perfect for daily wear.",
          badge: "DAILY WEAR",
        },
        {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
          title: "1 Gram Gold Temple Jewelry",
          price: "₹4,500 - ₹16,500",
          description: "Traditional temple jewelry set in 1 gram gold.",
          badge: "TEMPLE WORK",
        },
        {
          url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=400&fit=crop",
          title: "1 Gram Gold Choker - Women",
          price: "₹2,800 - ₹9,500",
          description: "Elegant choker necklace in 1 gram gold with stones.",
          badge: "CHOKER",
        },
        {
          url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=400&fit=crop",
          title: "1 Gram Gold Ring - Women",
          price: "₹800 - ₹3,200",
          description: "Beautiful 1 gram gold rings with CZ stone settings.",
          badge: "STONE WORK",
        },
        {
          url: "https://images.unsplash.com/photo-1635767667132-df27d88f9a98?w=500&h=400&fit=crop",
          title: "1 Gram Gold Nose Pin",
          price: "₹250 - ₹1,200",
          description: "Traditional nose pins in 1 gram gold.",
          badge: "NOSEPIN",
        },
        {
          url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&h=400&fit=crop",
          title: "1 Gram Gold Maang Tikka",
          price: "₹1,200 - ₹4,500",
          description: "Bridal maang tikka in 1 gram gold with pearls.",
          badge: "BRIDAL",
        },
        {
          url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=400&fit=crop",
          title: "1 Gram Gold Anklets",
          price: "₹1,500 - ₹5,200",
          description: "Traditional anklets in 1 gram gold with charms.",
          badge: "ANKLETS",
        },
      ],
      sections: [
        {
          title: "1 Gram Gold Women's Specifications",
          type: "table",
          content: [
            ["Material", "1 Gram Gold Plated Brass/Copper Base"],
            ["Gold Quality", "22K Gold Electroplating"],
            ["Stone Work", "CZ Stones, Pearls, Colored Beads"],
            ["Plating Thickness", "1.5-3 Micron Gold Layer"],
            ["Durability", "6-24 Months with Proper Care"],
            ["Weight Range", "3g - 150g (Complete Sets)"],
            ["Chain Lengths", '16" - 24" (Women\'s Standard)'],
            ["Bangle Sizes", '2.2" - 2.8" Inner Diameter'],
            ["Set Options", "Necklace + Earrings + Bangles + Ring"],
            ["Occasion Wear", "Weddings, Festivals, Religious Functions"],
            ["Maintenance", "Keep in Jewelry Box, Avoid Moisture"],
            ["Water Resistance", "Not Water Resistant"],
            ["Warranty", "45 Days Manufacturing Defect"],
            ["Care Instructions", "Use dry soft cloth for cleaning"],
            ["Return Policy", "20-Day Easy Returns"],
          ],
        },
      ],
    },

    
  // ========================================
  // REGULAR JEWELRY CATEGORIES (ORIGINAL)
  // ========================================
  chains: {
    title: "Premium Chains Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
        title: "Heavy Cuban Link Chain",
        price: "₹2,800 - ₹8,500",
        description:
          "Premium 22K gold plated Cuban link chain. Heavy weight design perfect for men.",
        badge: "BESTSELLER",
      },
      {
        url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
        title: "Classic Gold Chain",
        price: "₹2,300 - ₹7,200",
        description:
          "Traditional gold chain with mirror finish. Available in multiple lengths.",
        badge: "CLASSIC",
      },
      {
        url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
        title: "Rope Design Chain",
        price: "₹2,100 - ₹6,800",
        description: "Intricate rope pattern chain with diamond-cut finish.",
        badge: "TRENDING",
      },
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
        title: "Box Link Chain",
        price: "₹2,200 - ₹6,900",
        description:
          "Smooth box chain design. Perfect for wearing with pendants.",
        badge: "POPULAR",
      },
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
        title: "Figaro Style Chain",
        price: "₹2,400 - ₹7,500",
        description: "Classic Figaro pattern with alternating link sizes.",
        badge: "LIMITED",
      },
    ],
    sections: [
      {
        title: "Chain Specifications",
        type: "table",
        content: [
          ["Material", "22K Gold Plated / 925 Sterling Silver"],
          ["Length Options", '16", 18", 20", 22", 24", Custom'],
          ["Chain Width", "2mm - 8mm"],
          ["Weight Range", "5g - 50g"],
          ["Clasp Type", "Lobster Clasp / Spring Ring"],
          ["Tarnish Resistance", "Anti-Tarnish Coating"],
          ["Water Resistance", "Splash Resistant"],
          ["Hypoallergenic", "Nickel & Lead Free"],
          ["Warranty", "1 Year Manufacturing Warranty"],
          ["Return Policy", "30-Day Easy Returns"],
        ],
      },
    ],
  },

  rings: {
    title: "Exquisite Ring Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
        title: "Solitaire Diamond Ring",
        price: "₹25,000 - ₹85,000",
        description: "Classic solitaire with premium CZ stone.",
        badge: "PREMIUM",
      },
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
        title: "Wedding Band Set",
        price: "₹3,500 - ₹12,000",
        description: "Matching wedding band set for couples.",
        badge: "COUPLE SET",
      },
      {
        url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
        title: "Fashion Statement Ring",
        price: "₹1,500 - ₹5,500",
        description: "Bold fashion ring with contemporary design.",
        badge: "TRENDY",
      },
    ],
  },

  bracelets: {
    title: "Elegant Bracelet Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
        title: "Diamond Tennis Bracelet",
        price: "₹15,000 - ₹45,000",
        description: "Premium tennis bracelet with CZ stones.",
        badge: "LUXURY",
      },
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
        title: "Gold Link Bracelet",
        price: "₹2,500 - ₹8,500",
        description: "Classic link bracelet in 22K gold plating.",
        badge: "CLASSIC",
      },
    ],
  },

  earrings: {
    title: "Stunning Earring Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=400&fit=crop",
        title: "Diamond Stud Earrings",
        price: "₹1,500 - ₹8,500",
        description: "Classic diamond studs with premium CZ stones.",
        badge: "CLASSIC",
      },
      {
        url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
        title: "Drop Earrings",
        price: "₹2,200 - ₹12,000",
        description: "Elegant drop earrings with cascading design.",
        badge: "ELEGANT",
      },
    ],
  },

  pendants: {
    title: "Designer Pendant Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
        title: "Heart Shape Pendant",
        price: "₹800 - ₹3,500",
        description: "Elegant heart pendant with CZ stones.",
        badge: "ROMANTIC",
      },
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
        title: "Sacred Om Pendant",
        price: "₹600 - ₹2,800",
        description: "Spiritual Om symbol pendant with detailed engravings.",
        badge: "SPIRITUAL",
      },
    ],
  },

  kada: {
    title: "Traditional Kada Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
        title: "Heavy Gold Kada",
        price: "₹5,000 - ₹15,000",
        description: "Traditional heavy gold kada with intricate carvings.",
        badge: "TRADITIONAL",
      },
    ],
  },

  bangles: {
    title: "Beautiful Bangles Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
        title: "Traditional Gold Bangles",
        price: "₹1,200 - ₹5,500",
        description: "Classic gold bangles with traditional patterns.",
        badge: "TRADITIONAL",
      },
    ],
  },

  nosepins: {
    title: "Elegant Nosepins Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
        title: "CZ Stone Nosepin",
        price: "₹200 - ₹1,200",
        description: "Delicate nosepin with sparkling CZ stone.",
        badge: "DELICATE",
      },
    ],
  },

  necklaces: {
    title: "📿 Stunning Necklaces Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop",
        title: "Pearl Necklace Set",
        price: "₹3,500 - ₹15,000",
        description: "Elegant pearl necklace with matching earrings.",
        badge: "ELEGANT",
      },
    ],
  },

  anklets: {
    title: "Graceful Anklets Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1588444837495-c6c01226f005?w=500&h=400&fit=crop",
        title: "Silver Chain Anklet",
        price: "₹800 - ₹2,500",
        description: "Delicate silver anklet with charm details.",
        badge: "GRACEFUL",
      },
    ],
  },

  toerings: {
    title: "Delicate Toe Rings Collection",
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=400&fit=crop",
        title: "Silver Toe Rings",
        price: "₹150 - ₹800",
        description: "Traditional silver toe rings in various designs.",
        badge: "TRADITIONAL",
      },
    ],
  },
};

// Function to limit photos to maximum 10 per category
function limitPhotosToMax10(data) {
  for (let category in data) {
    if (data.hasOwnProperty(category)) {
      if (data[category].images && data[category].images.length > 10) {
        data[category].images = data[category].images.slice(0, 10);
      }
    }
  }
  return data;
}

// Apply the limit
limitPhotosToMax10(jewelryData);

function showJewelryDetails(category) {
  const modal = document.getElementById('jewelryModal');
  const modalTitle = document.getElementById('jewelryModalTitle');
  const modalBody = document.getElementById('jewelryModalBody');

  const data = jewelryData[category];
  if (!data) {
    modalBody.innerHTML = `<p class="coming-soon">Category "${category}" coming soon!</p>`;
    modalTitle.textContent = "Coming Soon";
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    return;
  }

  modalTitle.textContent = data.title;

  let content = '<div class="jewelry-gallery">';

  // Add images (max 10 per category)
  if (data.images) {
    data.images.forEach(image => {
      content += `
                <div class="jewelry-item" onclick="enlargeJewelryImage('${image.url}', '${image.title}')">
                    <img src="${image.url}" alt="${image.title}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDUwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMjAwTDI4MCAyMzBMMjUwIDI2MEwyMjAgMjMwTDI1MCAyMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkpld2VscnkgSXRlbTwvdGV4dD4KPC9zdmc+Cg=='">
                    <div class="jewelry-badge">${image.badge}</div>
                    <div class="jewelry-details">
                        <div class="jewelry-title">${image.title}</div>
                        <div class="jewelry-price">${image.price}</div>
                        <div class="jewelry-description">${image.description}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(event, '${image.title}', '${image.price}', '${image.url}')">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
    });
  }

  content += '</div><div class="jewelry-sections">';

  // Add sections (specifications)
  if (data.sections) {
    data.sections.forEach(section => {
      if (section.type === 'table') {
        content += `
                    <div class="jewelry-info-section">
                        <h3>${section.title}</h3>
                        <table class="jewelry-specs-table">
                            <thead>
                                <tr><th>Specification</th><th>Details</th></tr>
                            </thead>
                            <tbody>
                `;
        section.content.forEach(row => {
          content += `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`;
        });
        content += '</tbody></table></div>';
      } else if (section.type === 'list') {
        content += `
                    <div class="jewelry-info-section">
                        <h3>${section.title}</h3>
                        <ul class="list-unstyled">
                `;
        section.content.forEach(item => {
          content += `<li><i class="bi bi-check-circle text-success me-2"></i>${item}</li>`;
        });
        content += '</ul></div>';
      }
    });
  }

  content += '</div>';
  modalBody.innerHTML = content;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function enlargeJewelryImage(src, title) {
  event.stopPropagation();

  const overlay = document.createElement('div');
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;

  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

  const titleDiv = document.createElement('div');
  titleDiv.textContent = title;
  titleDiv.style.cssText = `
        color: white;
        font-size: 1.8em;
        font-weight: bold;
        margin-top: 20px;
        text-align: center;
    `;

  overlay.appendChild(img);
  overlay.appendChild(titleDiv);
  document.body.appendChild(overlay);

  overlay.onclick = () => document.body.removeChild(overlay);
}

function closeJewelryModal() {
  document.getElementById('jewelryModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function addToCart(event, title, price, imageUrl) {
  event.stopPropagation();

  // Show success message
  showAddToCartMessage(title);
}

function showAddToCartMessage(itemName) {
  const toast = document.createElement('div');
  toast.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${itemName} added to cart!</span>
    `;
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 4000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('jewelryModal');
  if (event.target == modal) {
    closeJewelryModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeJewelryModal();
  }
});

// Cart functionality
document.querySelectorAll('.plus').forEach(btn => {
  btn.addEventListener('click', function () {
    const quantityInput = this.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateCartTotal();
  });
});

document.querySelectorAll('.minus').forEach(btn => {
  btn.addEventListener('click', function () {
    const quantityInput = this.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
      updateCartTotal();
    }
  });
});

function updateCartTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseInt(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').value);
    total += price * quantity;
  });
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
}

// ========================================
// 7. MODAL AND GALLERY FUNCTIONS
// ========================================

// Function to limit photos to maximum 10 per category
function limitPhotosToMax10(data) {
  for (let category in data) {
    if (data.hasOwnProperty(category)) {
      if (data[category].images && data[category].images.length > 10) {
        data[category].images = data[category].images.slice(0, 10);
      }
    }
  }
  return data;
}

// Apply the limit
limitPhotosToMax10(jewelryData);

function showJewelryDetails(category) {
  const modal = document.getElementById('jewelryModal');
  const modalTitle = document.getElementById('jewelryModalTitle');
  const modalBody = document.getElementById('jewelryModalBody');

  const data = jewelryData[category];
  if (!data) {
    modalBody.innerHTML = `<p class="coming-soon">Category "${category}" coming soon!</p>`;
    modalTitle.textContent = "Coming Soon";
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    return;
  }

  modalTitle.textContent = data.title;

  let content = '<div class="jewelry-gallery">';

  // Add images (max 10 per category)
  if (data.images) {
    data.images.forEach(image => {
      content += `
                <div class="jewelry-item" onclick="enlargeJewelryImage('${image.url}', '${image.title}')">
                    <img src="${image.url}" alt="${image.title}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDUwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMjAwTDI4MCAyMzBMMjUwIDI2MEwyMjAgMjMwTDI1MCAyMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkpld2VscnkgSXRlbTwvdGV4dD4KPC9zdmc+Cg=='">
                    <div class="jewelry-badge">${image.badge}</div>
                    <div class="jewelry-details">
                        <div class="jewelry-title">${image.title}</div>
                        <div class="jewelry-price">${image.price}</div>
                        <div class="jewelry-description">${image.description}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(event, '${image.title}', '${image.price}', '${image.url}')">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
    });
  }

  content += '</div><div class="jewelry-sections">';

  // Add sections (specifications)
  if (data.sections) {
    data.sections.forEach(section => {
      if (section.type === 'table') {
        content += `
                    <div class="jewelry-info-section">
                        <h3>${section.title}</h3>
                        <table class="jewelry-specs-table">
                            <thead>
                                <tr><th>Specification</th><th>Details</th></tr>
                            </thead>
                            <tbody>
                `;
        section.content.forEach(row => {
          content += `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`;
        });
        content += '</tbody></table></div>';
      } else if (section.type === 'list') {
        content += `
                    <div class="jewelry-info-section">
                        <h3>${section.title}</h3>
                        <ul class="list-unstyled">
                `;
        section.content.forEach(item => {
          content += `<li><i class="bi bi-check-circle text-success me-2"></i>${item}</li>`;
        });
        content += '</ul></div>';
      }
    });
  }

  content += '</div>';
  modalBody.innerHTML = content;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function enlargeJewelryImage(src, title) {
  event.stopPropagation();

  const overlay = document.createElement('div');
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;

  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

  const titleDiv = document.createElement('div');
  titleDiv.textContent = title;
  titleDiv.style.cssText = `
        color: white;
        font-size: 1.8em;
        font-weight: bold;
        margin-top: 20px;
        text-align: center;
    `;

  overlay.appendChild(img);
  overlay.appendChild(titleDiv);
  document.body.appendChild(overlay);

  overlay.onclick = () => document.body.removeChild(overlay);
}

function closeJewelryModal() {
  document.getElementById('jewelryModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ========================================
// 8. ADD TO CART FUNCTIONALITY
// ========================================

function addToCart(event, title, price, imageUrl) {
  event.stopPropagation();

  // Show success message
  showAddToCartMessage(title);
}

function showAddToCartMessage(itemName) {
  const toast = document.createElement('div');
  toast.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${itemName} added to cart!</span>
    `;
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 4000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
}

// ========================================
// 9. MODAL EVENT HANDLERS
// ========================================

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('jewelryModal');
  if (event.target == modal) {
    closeJewelryModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeJewelryModal();
  }
});

// Fix for updateCartDisplay function (was missing)
function updateCartDisplay() {
  // This function was referenced but not defined - adding it here
  console.log('Cart display updated');
}

// ========================================
// 10. UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format currency
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString();
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ========================================
// 11. INITIALIZATION
// ========================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Update cart display on page load
  updateCartDisplay();

  // Add CSS animations if not already present
  if (!document.querySelector('#jewelry-animations')) {
    const style = document.createElement('style');
    style.id = 'jewelry-animations';
    style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  console.log('SHE\'s Jewelry Store JavaScript initialized successfully!');
});

// ========================================
// 12. ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener('error', function (event) {
  console.error('JavaScript Error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled Promise Rejection:', event.reason);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown-link").forEach((link) => {
    const category = link.getAttribute("data-category");
    if (!category || !jewelryData[category]) return;

    // Create submenu panel
    const submenu = document.createElement("div");
    submenu.className = "submenu-panel";

    jewelryData[category].images.forEach((item) => {
      const div = document.createElement("div");
      div.className = "submenu-item";
      div.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <span>${item.title}</span>
      `;
      submenu.appendChild(div);
    });

    link.insertAdjacentElement("afterend", submenu);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown-link").forEach(link => {
    const category = link.getAttribute("data-category");
    if (!category || !jewelryData[category]) return;

    // Create submenu panel
    const submenu = document.createElement("div");
    submenu.className = "submenu-panel";

    jewelryData[category].images.forEach(item => {
      const div = document.createElement("div");
      div.className = "submenu-item";
      div.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <span>${item.title}</span>
      `;
      submenu.appendChild(div);
    });

    // Attach after link
    link.insertAdjacentElement("afterend", submenu);

    // Show on hover
    link.addEventListener("mouseenter", () => {
      submenu.style.display = "grid";
    });
    link.addEventListener("mouseleave", () => {
      submenu.style.display = "none";
    });
    submenu.addEventListener("mouseenter", () => {
      submenu.style.display = "grid";
    });
    submenu.addEventListener("mouseleave", () => {
      submenu.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown-link").forEach((link) => {
    const category = link.getAttribute("data-category");
    if (!category || !jewelryData[category]) return;

    // Create submenu panel
    const submenu = document.createElement("div");
    submenu.className = "submenu-panel";

    // Populate with images from jewelryData
    jewelryData[category].images.forEach((item) => {
      const div = document.createElement("div");
      div.className = "submenu-item";
      div.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <span>${item.title}</span>
      `;
      submenu.appendChild(div);
    });

    // Insert after the link
    link.insertAdjacentElement("afterend", submenu);

    // Hover behavior
    link.addEventListener("mouseenter", () => {
      submenu.style.display = "grid";
    });
    link.addEventListener("mouseleave", () => {
      // Delay hiding to allow moving into submenu
      setTimeout(() => {
        if (!submenu.matches(":hover")) submenu.style.display = "none";
      }, 200);
    });

    submenu.addEventListener("mouseenter", () => {
      submenu.style.display = "grid";
    });
    submenu.addEventListener("mouseleave", () => {
      submenu.style.display = "none";
    });
  });
});

document.querySelectorAll(".sidebar-link.has-submenu").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // target submenu (next UL)
    const submenu = this.nextElementSibling;
    const icon = this.querySelector(".toggle-icon i");

    if (submenu && submenu.classList.contains("submenu")) {
      submenu.classList.toggle("open");

      // toggle arrow direction
      if (submenu.classList.contains("open")) {
        icon.classList.remove("bi-chevron-compact-down");
        icon.classList.add("bi-chevron-compact-up");
      } else {
        icon.classList.remove("bi-chevron-compact-up");
        icon.classList.add("bi-chevron-compact-down");
      }
    }
  });

  // ALSO handle clicking on the arrow icon
  const toggleIcon = link.querySelector(".toggle-icon");
  if (toggleIcon) {
    toggleIcon.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent duplicate event
      link.click(); // trigger the same toggle
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Accordion mode? true = only one open at a time
  const ACCORDION = false;

  document.querySelectorAll(".sidebar-link.has-submenu").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const submenu = link.nextElementSibling;
      if (!submenu || !submenu.classList.contains("submenu")) return;

      // Accordion logic
      if (ACCORDION) {
        document
          .querySelectorAll(".sidebar-menu .submenu.open")
          .forEach((openMenu) => {
            if (openMenu !== submenu) {
              openMenu.classList.remove("open");
              const ic =
                openMenu.previousElementSibling.querySelector(".toggle-icon i");
              if (ic) {
                ic.classList.remove("bi-chevron-compact-up");
                ic.classList.add("bi-chevron-compact-down");
              }
            }
          });
      }

      // Toggle submenu
      submenu.classList.toggle("open");

      // Toggle arrow icon
      const icon = link.querySelector(".toggle-icon i");
      if (icon) {
        icon.classList.toggle("bi-chevron-compact-down");
        icon.classList.toggle("bi-chevron-compact-up");
      }
    });
  });
});
