// import Pagination from 'tui-pagination'; //установка (npm i tui-pagination)
// import onLoadPage - загрузки страницы
// ______________________________________примерно так_____________________
//  async function onLoadPage() {
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
// _____________________________________________________конец*__________________________________


// export const container = document.getElementById('tui-pagination-container');

// export const options = {
//     totalItems: 500,
//     itemsPerPage: 10,
//     visiblePages: 5,
//     page: 1,
//     centerAlign: true,
// };

// const state = {
//   page: 0,
//   query: '',
//   classification: 'music',
//   country: '',
//   code: '',
// };

// export const myPagination = new Pagination(container, options);

// myPagination.on('afterMove', (event) => {
//     const currentPage = event.page;

//     if (currentPage === state.page + 1) {
//         incrementPage();
//         // loadNextPage();
//         onTop()
//     }
//     if (currentPage === state.page - 1) {
//         dicrementPage();
//         onLoadPage();
//         // loadPrevPage();
//         onTop();
//     }

//     else {
//         state.page = `${currentPage - 1}`;
//         onLoadPage();
//         onTop();
//     }

// });

// function incrementPage() {
//     state.page++;
// }


// function dicrementPage() {
//     state.page--;
// }


// function onTop() {
//     document.documentElement.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   }
