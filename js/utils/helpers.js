
export function getOffset() {
  const headerHeight = document.querySelector("header")?.offsetHeight;
  const navHeight = document.querySelector(".nav")?.offsetHeight;
  return headerHeight + navHeight;
}


export function scrollToSection(section, offset) {
  if (!section) return;
  const targetPosition = section.getBoundingClientRect().top;
  const offsetPosition = targetPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export function timeout(msg, s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(msg);
    }, s * 1000);
  });
}

export function loadImages(container, s = 5) {
  return Promise.race([
    new Promise((resolve, reject) => {
      const imgs = container.querySelectorAll("img");
      let loadedImages = 0;

      if (imgs.length === 0) {
        resolve(); // Resolve immediately if no images
      }

      imgs.forEach((img) => {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === imgs.length) resolve();
        } else {
          img.onload = () => {
            loadedImages++;
            if (loadedImages === imgs.length) resolve();
          };
          img.onerror = () =>
            reject(new Error(`Failed to load image: ${img.src}`));
        }
      });
    }),
    timeout("Image loading timed out", s),
  ]);
}

export async function handleLoadingState(
  loadingElement,
  toggleElement,
  asyncFunction
) {
  try {
    loadingElement?.classList.remove("u-hidden");
    toggleElement?.classList.toggle("u-hidden");
    await asyncFunction();
  } catch (e) {
    console.error("Error in handling loading state:", e);
  } finally {
    loadingElement.classList.add("u-hidden");
    toggleElement?.classList.remove("u-hidden");
  }
}
