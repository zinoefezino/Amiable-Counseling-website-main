// (function () {
//   const marquee = document.getElementById("reviews-marquee");
//   const track = document.getElementById("reviews-track");
//   if (!marquee || !track) return;

//   const ensureLoopWidth = () => {
//     const containerWidth = marquee.clientWidth;
//     let trackWidth = track.scrollWidth;
//     const items = Array.from(track.children);
//     let safety = 20;
//     while (trackWidth < containerWidth * 2 && safety-- > 0) {
//       items.forEach((el) => track.appendChild(el.cloneNode(true)));
//       trackWidth = track.scrollWidth;
//     }
//   };

//   ensureLoopWidth();
//   window.addEventListener("resize", () => {});

//   marquee.addEventListener("mouseenter", () => marquee.classList.add("paused"));
//   marquee.addEventListener("mouseleave", () =>
//     marquee.classList.remove("paused")
//   );
// })();

// document.addEventListener("DOMContentLoaded", () => {
//   const menuIcon = document.getElementById("menu");
//   const closeIcon = document.getElementById("close");
//   const navList = document.querySelector(".nav-links ul");
//   const backdrop = document.querySelector(".menu-backdrop");

//   const closeMobileMenu = () => {
//     navList.classList.remove("show");
//     closeIcon.style.display = "none";
//     menuIcon.style.display = "block";
//     document.body.classList.remove("menu-open");
//     backdrop.classList.remove("active");
//   };

//   menuIcon.addEventListener("click", () => {
//     navList.classList.add("show");
//     menuIcon.style.display = "none";
//     closeIcon.style.display = "block";
//     document.body.classList.add("menu-open");
//     backdrop.classList.add("active");
//   });

//   closeIcon.addEventListener("click", () => {
//     closeMobileMenu();
//   });

//   const navLinks = document.querySelectorAll('a[href^="#"]');
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const id = link.getAttribute("href").slice(1);
//       const target = document.getElementById(id);
//       if (!target) return;

//       const wasMenuOpen = navList.classList.contains("show");
//       if (wasMenuOpen) {
//         closeMobileMenu();
//       }

//       setTimeout(
//         () => {
//           target.scrollIntoView({ behavior: "smooth", block: "start" });
//         },
//         wasMenuOpen ? 350 : 0
//       );
//       history.replaceState(
//         null,
//         "",
//         window.location.pathname + window.location.search
//       );
//     });
//   });
// });

// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }

// window.addEventListener("pageshow", (event) => {
//   if (event.persisted) {

//     window.location.reload();
//   } else if (location.hash) {
//     window.scrollTo(0, 0);
//     history.replaceState(
//       null,
//       "",
//       window.location.pathname + window.location.search
//     );
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("animate");
//         observer.unobserve(entry.target);
//       }
//     });
//   });

//   document
//     .querySelectorAll(".scroll-element")
//     .forEach((el) => observer.observe(el));
// });

// Mobile menu functionality

// Mobile menu functionality + improved anchor link scroll

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu");
  const closeIcon = document.getElementById("close");
  const navList = document.querySelector(".nav-links ul");
  const backdrop = document.querySelector(".menu-backdrop");

  // Close mobile menu
  const closeMobileMenu = () => {
    if (navList) navList.classList.remove("show");
    if (closeIcon) closeIcon.style.display = "none";
    if (menuIcon) menuIcon.style.display = "block";
    if (document.body.classList) {
      document.body.classList.remove("menu-open");
    }
    if (backdrop && backdrop.classList) {
      backdrop.classList.remove("active");
    }
  };

  // Open mobile menu
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      if (navList) navList.classList.add("show");
      menuIcon.style.display = "none";
      if (closeIcon) closeIcon.style.display = "block";
      if (document.body.classList) {
        document.body.classList.add("menu-open");
      }
      if (backdrop && backdrop.classList) {
        backdrop.classList.add("active");
      }
    });
  }

  // Close button click
  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  // Smooth scroll with header offset (iOS + Android friendly)
  const scrollToTarget = (target) => {
    const headerOffset = 80; // adjust this to match sticky header height
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      const wasMenuOpen = navList && navList.classList.contains("show");
      e.preventDefault();

      if (wasMenuOpen) {
        closeMobileMenu();
        // Delay to wait for CSS transition to finish
        setTimeout(() => {
          scrollToTarget(target);
        }, 350); // match your CSS transition duration
      } else {
        scrollToTarget(target);
      }
    });
  });
});

// Simplified scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Intersection Observer animations
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".scroll-element").forEach((el) => {
    observer.observe(el);
  });
});

// Marquee functionality
(function () {
  const marquee = document.getElementById("reviews-marquee");
  const track = document.getElementById("reviews-track");

  if (!marquee || !track) return;

  const ensureLoopWidth = () => {
    const containerWidth = marquee.clientWidth;
    let trackWidth = track.scrollWidth;
    const items = Array.from(track.children);
    let safety = 20; // prevent infinite loop

    while (trackWidth < containerWidth * 2 && safety > 0) {
      items.forEach((el) => {
        track.appendChild(el.cloneNode(true));
      });
      trackWidth = track.scrollWidth;
      safety--;
    }
  };

  ensureLoopWidth();

  // Handle resize (for rotation / screen change)
  window.addEventListener("resize", ensureLoopWidth);

  marquee.addEventListener("mouseenter", () => {
    marquee.classList.add("paused");
  });

  marquee.addEventListener("mouseleave", () => {
    marquee.classList.remove("paused");
  });
})();
