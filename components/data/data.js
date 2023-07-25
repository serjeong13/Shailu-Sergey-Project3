import { createCharacterCard } from "../card/card.js";
export async function fetchCharacters(pageIndex, searchQuery) {
  let url = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;
  if (searchQuery) {
    url += `&name=${searchQuery}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function createCharacterCards(characters, cardContainer) {
  const characterCards = characters.map(createCharacterCard);
  characterCards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}
