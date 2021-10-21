import Pagination from 'tui-pagination';
import { renderMarkup } from './main_content_render';
import { sendServerRequest } from './server_request';
import { userQuery, country } from './search';

const container = document.querySelector('#tui-pagination-container');
const options = {
  visiblePages: 5,
  centerAlign: false,
};
const myPagination = new Pagination(container, options);

export const renderPagination = async function (responce) {
  let totalPages = responce.page.totalPages;
  let pageSize = responce.page.size;
  let totalItems = responce.page.totalElements;

  if (totalPages > 50) {
    totalItems = 980;
  }

  myPagination.reset(totalItems);
  myPagination.setItemsPerPage(pageSize);
  myPagination.setTotalItems(totalItems);
  myPagination.reset(totalItems);
};
const onLoadPage = async function (page) {
  const reply = await sendServerRequest(userQuery, country, page);
  
  renderMarkup(reply);
};
myPagination.on('afterMove', event => {
  onLoadPage(event.page);
});
