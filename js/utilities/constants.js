import { API_KEY } from "./config.js";

export const URL_SEARCH = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;
export const URL_RANDOM = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
export const URL_TRENDING = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;

export const ITEMS_PER_PAGE = 12;
export const MAX_API_LIMIT = 50;

