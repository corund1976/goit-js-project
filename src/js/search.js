import debounce from 'lodash.debounce';
import config from '../config.json';
import config_js from '../config_js.json';
import { renderMarkup } from './main_content_render';
import { sendServerRequest } from './server_request';
import { renderListMarkup } from './country_list_render';
import { renderPagination } from './pagination_render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFieldEl = document.querySelector('#search');
const searchByCountryEl = document.querySelector('#country-search-input');

const containerEl = document.querySelector(".card")
const clearFilterBtn = document.querySelector('.header__logo');
const DEBOUNCE_DELAY = 300;

export let country;
export let userQuery;
export const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  userQuery = searchFieldEl.value || '';
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  try {
    const reply = await sendServerRequest(userQuery, country);
    renderPagination(reply);
    renderMarkup(reply);
    if (reply.page.totalElements === 0) {
      document.querySelector('#tui-pagination-container').classList.add('visually-hidden');
      Notify.warning('No result found');
      const img = document.createElement('img');
      img.src = 'https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png';
      document.querySelector('.card').appendChild(img);
    } else {
      Notify.success(`${reply.page.totalElements} events found in database`);
      document.querySelector('#tui-pagination-container').classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error);
    Notify.failure('No results found');
  }
};

searchFieldEl.addEventListener('input', debounce(search, config_js.DEBOUNCE_DELAY));

renderListMarkup(config);

searchByCountryEl.addEventListener('change', e => {
  country = document.querySelector(`#country-search option[value="${e.target.value}"]`).textContent;

  search();
});

searchByCountryEl.addEventListener('click', e => {
  searchByCountryEl.value = '';
});

search();

async function clearFilter() {
  const serverResponse = await sendServerRequest()
  searchFieldEl.value = "";
  searchByCountryEl.value = "";
  containerEl.innerHTML = '';

  renderMarkup(serverResponse)
  renderPagination(serverResponse)
}

clearFilterBtn.addEventListener('click', clearFilter)