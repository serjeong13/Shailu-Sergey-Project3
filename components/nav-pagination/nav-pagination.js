export function updatePagination(page, maxPage, paginationElement) {
  paginationElement.textContent = `${page} of ${maxPage}`;
}
