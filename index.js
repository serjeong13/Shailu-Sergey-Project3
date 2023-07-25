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
const maxPage = 42;
let page = 1;
const searchQuery = "";

async function fetchCharacters(pageIndex) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageIndex}`
  );
  const data = await response.json();
  return data.results;
}
function createCharacterCards(characters) {
  const characterCards = characters.map(createCharacterCard);
  characterCards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}
async function main() {
  // Fetch character data from API
  const characters = await fetchCharacters(page);
  // Create and append character cards
  createCharacterCards(characters);
}
main();
pagination.textContent = `${page} of ${maxPage}`;
nextButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page < maxPage) {
    page++;
    pagination.textContent = `${page} of ${maxPage}`;
    const characters = await fetchCharacters(page);
    cardContainer.innerHTML = ""; // Clear previous cards
    createCharacterCards(characters);
  }
});
prevButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page > 1) {
    page--;
    pagination.textContent = `${page} of ${maxPage}`;
    const characters = await fetchCharacters(page);
    cardContainer.innerHTML = ""; // Clear previous cards
    createCharacterCards(characters);
  }
});
