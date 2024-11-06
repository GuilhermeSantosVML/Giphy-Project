import { fetchFromAPI } from "../api/giphy.js";
import { URL_SEARCH, ITEMS_PER_PAGE, RATING } from "../utils/constants.js";
import { elements } from "../utils/dom.js";
import { updatePaginationControls } from "../components/pagination.js";
import { loadImages } from "../utils/helpers.js";


export async function handleSearch(e, offset = 0) {
  // Prevent form submission if event exists
  e?.preventDefault();

  // Get search query from form data
  const formData = new FormData(elements.searchForm);
  const query = formData.get("search").trim();

  // Return if query is empty string
  if (!query) return;

  try {
    // Fetch data from API with pagination parameters
    const { data, pagination } = await fetchFromAPI(
      `${URL_SEARCH}&q=${query}&limit=${ITEMS_PER_PAGE}&offset=${offset}&rating=${RATING}`
    );

    // Reset image container
    elements.finderImageContainer.innerHTML = "";

    // Process and render each GIF result
    data.forEach((img) => {
      // Extract media URLs (for different viewport sizes) and metadato
      const mediaUrlOriginal = img.images?.original?.url;
      const mediaUrlSmall = img.images?.downsized?.url;
      const mediaUrlMedium = img.images?.downsized_medium?.url;
      const mediaType = img.type;
      const alt = img.title;

      // Insert responsive picture element with different image sources
      elements.finderImageContainer.insertAdjacentHTML(
        "beforeend",
        `            
        <picture class="section-finder__picture">
          <source srcset="${mediaUrlMedium}" media="(min-width: 768px)">
          <source srcset="${mediaUrlSmall}" media="(max-width: 599px)">
          <img class="img-container__img" src="${mediaUrlOriginal}" type="${mediaType}" alt="${alt}">
        </picture>`
      );
    });

    // Ensure all images are loaed
    //await loadImages(elements.finderImageContainer);

    // Update pagination
    updatePaginationControls(pagination, "finder");
  } catch (e) {
    // Handle and display errors
    console.error("Failed search: ", e);
    elements.finderImageContainer.innerHTML = `
      <div class="error-message fa-solid fa-triangle-exclamation" role="alert">
        Error fetching GIFs from API
      </div>`;
    // Rethrow error
    throw e;
  }
}
