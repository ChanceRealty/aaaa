// Ավելացրեք resource hint-եր
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"></link>
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
});

// Smooth Scrolling for Anchor Links


// Ավելացնել app.js-ում
    // Ավելացնել այս կոդը ձեր app.js-ում կամ այս ֆայլի վերջում
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const message = document.getElementById('contactMessage').value;
      
      const subject = `Նոր հաղորդագրություն ${name}-ից`;
      const body = `Հարգելի՛ թիմ,\n\n${message}\n\nՄանրամասներ:\nԱնուն: ${name}\nԷլ. փոստ: ${email}\nՀեռախոս: ${phone}`;
      
      window.location.href = `mailto:myasnik.ghukasyan.ait@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Կարող եք ավելացնել հաղորդագրություն ուղարկված է
      alert('Ձեր հաղորդագրությունը պատրաստ է ուղարկվել։ Խնդրում ենք հաստատել ձեր էլ. փոստի հաճախորդի ծրագրում։');
      
      // Ձևը մաքրել
      this.reset();
    });

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

// Ավելացնել app.js-ում
// Լեզվի փոխարկիչ
const translations = {
  hy: {
    "home": "Գլխավոր",
    "about": "Մեր մասին",
    "products": "Ապրանքներ",
    "contact": "Կապ",
    "search": "Որոնել..."
  },
  en: {
    "home": "Home",
    "about": "About Us",
    "products": "Products",
    "contact": "Contact",
    "search": "Search..."
  },
  ru: {
    "home": "Главная",
    "about": "О нас",
    "products": "Продукты",
    "contact": "Контакты",
    "search": "Поиск..."
  }
};

function changeLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key] || el.textContent;
  });
  
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  
  localStorage.setItem("preferredLanguage", lang);
}

// Լեզուն ընտրելու event listener
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    changeLanguage(btn.dataset.lang);
  });
});

// Սկզբնական լեզուն
document.addEventListener("DOMContentLoaded", () => {
  const preferredLang = localStorage.getItem("preferredLanguage") || "hy";
  changeLanguage(preferredLang);
  
  // Թաքցնել loader-ը
  setTimeout(() => {
    document.querySelector(".loader").classList.add("fade-out");
  }, 500);
});

// Header navigation-ի աշխատանքի համար
document.addEventListener('DOMContentLoaded', function() {
  // Սահմանել nav հղումները
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Կանխել հղման ստանդարտ վարքը
      e.preventDefault();
      
      // Ստանալ հղման hash-ը (օրինակ #products)
      const targetId = this.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        // Գտնել target էլեմենտը
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Հարթ սքրոլ դեպի target էլեմենտ
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // URL-ը թարմացնել առանց էջի վերաբեռնման
          history.pushState(null, null, targetId);
        }
      } else {
        // Սովորական հղումների համար
        window.location.href = targetId;
      }
    });
  });
});

// Mobile menu functionality
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // Այստեղ կարող եք ավելացնել լեզվի փոփոխման լոգիկա
  });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Այստեղ կարող եք ավելացնել ձևի ուղարկման լոգիկա
  alert('Ձեր հաղորդագրությունը ուղարկված է։ Շնորհակալություն։');
  this.reset();
});