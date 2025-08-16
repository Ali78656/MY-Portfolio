// Mobile menu toggle
document
  .querySelector(".mobile-menu-btn")
  ?.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

// Close menu on outside click
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if (
    !navLinks.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".nav-links")?.classList.remove("active");
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Change navbar style on scroll (debounced)
let scrollTimeout;
window.addEventListener("scroll", function () {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.style.backgroundColor = "rgba(30, 35, 35, 0.98)";
      nav.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
    } else {
      nav.style.backgroundColor = "rgb(30, 35, 35)";
      nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  }, 10);
});

// Animated counter for stats (only on home page)
if (
  document.getElementById("experience-years") &&
  document.getElementById("projects-completed") &&
  document.getElementById("technologies-mastered")
) {
  function animateCounters() {
    const experienceYears = document.getElementById("experience-years");
    const projectsCompleted = document.getElementById("projects-completed");
    const technologiesMastered = document.getElementById(
      "technologies-mastered"
    );

    const targetValues = {
      experience: parseInt(experienceYears.dataset.target || 1.5, 10),
      projects: parseInt(projectsCompleted.dataset.target || 8, 10),
      tech: parseInt(technologiesMastered.dataset.target || 10, 10),
    };

    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    const easeOutQuad = (t) => t * (2 - t);

    const animate = (element, target) => {
      let frame = 0;
      const countTo = parseInt(target, 10);
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);

        if (parseInt(element.innerHTML, 10) !== currentCount) {
          element.innerHTML = currentCount;
        }

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };

    animate(experienceYears, targetValues.experience);
    animate(projectsCompleted, targetValues.projects);
    animate(technologiesMastered, targetValues.tech);
  }

  window.addEventListener("load", animateCounters);
}

// Form submission handling
const contactForm = document.querySelector(".form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields");
      return;
    }

    alert(
      `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`
    );
    contactForm.reset();
  });
}
