import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

async function fetchCharacters(pageIndex) {
  let url = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;
  if (searchQuery) {
    url += `&name=${searchQuery}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createCharacterCards(characters) {
  const characterCards = characters.map(createCharacterCard);
  characterCards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}

async function main() {
  // Fetch character data from API
  const data = await fetchCharacters(page);
  // Create and append character cards
  createCharacterCards(data.results);
}

main();

pagination.textContent = `${page} of ${maxPage}`;
nextButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page < maxPage) {
    page++;
    pagination.textContent = `${page} of ${maxPage}`;
    const data = await fetchCharacters(page);
    cardContainer.innerHTML = ""; // Clear previous cards
    createCharacterCards(data.results);
  }
});

prevButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page > 1) {
    page--;
    pagination.textContent = `${page} of ${maxPage}`;
    const data = await fetchCharacters(page);
    cardContainer.innerHTML = ""; // Clear previous cards
    createCharacterCards(data.results);
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  const data = await fetchCharacters(page);
  maxPage = data.info.pages; // Updating maxPage based on the search results
  cardContainer.innerHTML = ""; // Clear previous cards
  createCharacterCards(data.results);
  pagination.textContent = `${page} of ${maxPage}`;
});
