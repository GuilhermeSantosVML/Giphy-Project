import { elements } from "../utils/dom.js";
import { getOffset, scrollToSection } from "../utils/helpers.js";


function updateActiveNavItem(navItems, activeItem) {
  // Remove active states from all items
  navItems.forEach((item) => {
    item.classList.remove("nav__link--active");
    item.removeAttribute("aria-current");
  });

  // Set active state for current item
  activeItem.classList.add("nav__link--active");
  activeItem.setAttribute("aria-current", "page");
}


export function initNavigation() {
  // Calculate total offset for scroll positioning
  const totalOffset = getOffset();

  // Create intersection observer to detect when sections enter viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When a section becomes visible
        if (entry.isIntersecting) {
          // Find corresponding navigation item
          const navItem = document.querySelector(
            `.nav__link[href="#${entry.target.id}"]`
          );
          // Update active state in navigatio
          updateActiveNavItem(elements.navItems, navItem);
        }
      });
    },
    // Configure observer with offset and thresh
    {
      rootMargin: `-${totalOffset}px 0px 0px 0px`,
      threshold: 0.5,
    }
  );

  // Start observing all sections
  elements.sections.forEach((section) => observer.observe(section));

  // Add click handlers to navigation items
  elements.navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      // Get target section from href attribute
      const targetSection = document.getElementById(
        item.getAttribute("href").slice(1)
      );
      // Scroll to target section with offset
      scrollToSection(targetSection, totalOffset);
    });
  });
}
