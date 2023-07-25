import { createCharacterCard } from "./components/card/card.js";
import { updatePagination } from "./components/nav-pagination/nav-pagination.js";
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
  const data = await fetchCharacters(page);

  createCharacterCards(data.results);
}

main();

updatePagination(page, maxPage, pagination);

updatePagination(page, maxPage, pagination);
nextButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page < maxPage) {
    page++;
    updatePagination(page, maxPage, pagination);
    const data = await fetchCharacters(page);
    cardContainer.innerHTML = "";
    createCharacterCards(data.results);
  }
});

prevButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (page > 1) {
    page--;
    updatePagination(page, maxPage, pagination);
    const data = await fetchCharacters(page);
    cardContainer.innerHTML = "";
    createCharacterCards(data.results);
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  const data = await fetchCharacters(1);
  maxPage = data.info.pages;
  cardContainer.innerHTML = "";
  createCharacterCards(data.results);
  updatePagination(page, maxPage, pagination);
});
