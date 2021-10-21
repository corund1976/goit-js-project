import Pagination from 'tui-pagination'; /* ES6 */
import { renderMarkup } from './main_content_render';
import { sendServerRequest } from './server_request';
import { search } from './search';
import { userQuery, country } from './search';

const container = document.querySelector('#tui-pagination-container');
const options = {
  visiblePages: 5,
  centerAlign: false,
};
const myPagination = new Pagination(container, options);

export const renderPagination = async function (responce) {
  console.log(responce);
  let totalPages = responce.page.totalPages;
  console.log();
  let pageSize = responce.page.size;
  let totalItems = responce.page.totalElements;
  if (totalPages > 50) {
    totalItems = 980;
  }
  myPagination.setItemsPerPage(pageSize);
  myPagination.setTotalItems(totalItems);
  myPagination.reset(totalItems);
  //   const state = {
  //     page: 0,
  //     query: '',
  //     classification: 'music',
  //     country: '',
  //     code: '',
  //   };
};
const onLoadPage = async function (page) {
  console.log(page);
  //   const res = await search();
  //   console.log(res);
  const reply = await sendServerRequest(userQuery, country, page);
  renderMarkup(reply);
  // sendServerRequest(userQuery, country, page);
};
// await search(responce);
myPagination.on('afterMove', event => {
  console.log(event);

  const currentPage = event.page;

  onLoadPage(currentPage);
  //   console.log(currentPage);
  //   if (currentPage === state.page + 1) {
  //     incrementPage();
  //     // loadNextPage();
  //     onTop();
  //   }
  //   if (currentPage === state.page - 1) {
  //     dicrementPage();
  //     // onLoadPage();
  //     // loadPrevPage();
  //     onTop();
  //   } else {
  //     state.page = `${currentPage - 1}`;
  //     // onLoadPage();
  //     onTop();
  //   }
});
// function incrementPage() {
//   state.page++;
// }

// function dicrementPage() {
//   state.page--;
// }

// function onTop() {
//   document.documentElement.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// }
// console.log(search());

// async function onLoadPage() {
//   const data = await fetchEvents(state.query, state.page, state.classification, state.country);
//   clearGalleryMarkup();
//   createGalleryMarkup(data);
//   renderModal(data);
//   const pageSize = data.page.size;
//   const totalEl = data.page.totalElements;
//   if (totalEl > 1000) {
//     myPagination._options.totalItems = 1000 - pageSize;
//   } else {
//     myPagination._options.totalItems = totalEl;
//   }
//   myPagination._options.itemsPerPage = pageSize;
// }

// const state = {
//   page: 0,
//   query: '',
//   classification: 'music',
//   country: '',
//   code: '',
// };
