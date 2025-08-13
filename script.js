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
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu");
  const closeIcon = document.getElementById("close");
  const navList = document.querySelector(".nav-links ul");
  const backdrop = document.querySelector(".menu-backdrop");

  const closeMobileMenu = () => {
    navList.classList.remove("show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    if (document.body.classList) {
      document.body.classList.remove("menu-open");
    }
    if (backdrop && backdrop.classList) {
      backdrop.classList.remove("active");
    }
  };

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navList.classList.add("show");
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
      if (document.body.classList) {
        document.body.classList.add("menu-open");
      }
      if (backdrop && backdrop.classList) {
        backdrop.classList.add("active");
      }
    });
  }

  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  // Improved anchor link handling for Android compatibility
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const id = href.slice(1);
      const target = document.getElementById(id);

      // Only prevent default if target exists
      if (!target) {
        return;
      }

      const wasMenuOpen = navList && navList.classList.contains("show");

      // Close menu first if open
      if (wasMenuOpen) {
        e.preventDefault();
        closeMobileMenu();

        // Use shorter delay for better Android compatibility
        setTimeout(() => {
          // Try native smooth scroll first, fallback to instant
          try {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } catch (error) {
            // Fallback for older Android browsers
            target.scrollIntoView(true);
          }
        }, 200);
      } else {
        // Let browser handle naturally when menu is closed
        try {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } catch (error) {
          // If smooth scroll fails, allow default behavior
          e.stopImmediatePropagation();
          return true;
        }
      }
    });
  });
});

// Simplified scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Animation observer
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

  if (!marquee || !track) {
    return;
  }

  const ensureLoopWidth = () => {
    const containerWidth = marquee.clientWidth;
    let trackWidth = track.scrollWidth;
    const items = Array.from(track.children);
    let safety = 20;

    while (trackWidth < containerWidth * 2 && safety > 0) {
      items.forEach((el) => {
        track.appendChild(el.cloneNode(true));
      });
      trackWidth = track.scrollWidth;
      safety = safety - 1;
    }
  };

  ensureLoopWidth();

  marquee.addEventListener("mouseenter", () => {
    marquee.classList.add("paused");
  });

  marquee.addEventListener("mouseleave", () => {
    marquee.classList.remove("paused");
  });
})();
