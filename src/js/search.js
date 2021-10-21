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
<<<<<<< HEAD
const DEBOUNCE_DELAY = 300;

// ФУНКЦИЯ ПОИСКА ПО ЗАПРОСУ
=======

>>>>>>> test
export let country;
export let userQuery;
export const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  userQuery = searchFieldEl.value || '';
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  // sendServerRequest(userQuery, country);
  try {
    const reply = await sendServerRequest(userQuery, country);
    renderMarkup(reply);
    renderPagination(reply);
  } catch (error) {
    console.log(error);
    Notify.failure('Bad request');
  }
  //   ВЫЗЫВАЕМ ФУНКЦИЮ ОТРИСОВКИ РАЗМЕТКИ

  // return reply;
};
<<<<<<< HEAD

searchFieldEl.addEventListener('input', debounce(search, DEBOUNCE_DELAY));
// searchByCountryEl.addEventListener('click', debounce(showCountries, DEBOUNCE_DELAY));
=======
searchFieldEl.addEventListener('input', debounce(search, config_js.DEBOUNCE_DELAY));
>>>>>>> test
renderListMarkup(config);

searchByCountryEl.addEventListener('change', e => {
  country = document.querySelector(`#country-search option[value="${e.target.value}"]`).textContent;
  search();
});

searchByCountryEl.addEventListener('click', e => {
  searchByCountryEl.value = '';
});

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
});

search();


