import debounce from 'lodash.debounce';
import config from '../config.json';
import { renderMarkup } from './main_content_render';
import { sendServerRequest } from './server_request';
import { renderListMarkup } from './country_list_render';

const searchFieldEl = document.querySelector('#search');
export const searchByCountryEl = document.querySelector('#country-search');
const DEBOUNCE_DELAY = 300;

// ФУНКЦИЯ ПОИСКА ПО ЗАПРОСУ
let country;

const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  const userQuery = searchFieldEl.value || '';
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  // sendServerRequest(userQuery, country);
  const reply = await sendServerRequest(userQuery, country);
  //   ВЫЗЫВАЕМ ФУНКЦИЮ ОТРИСОВКИ РАЗМЕТКИ
  renderMarkup(reply);
};

searchFieldEl.addEventListener('input', debounce(search, DEBOUNCE_DELAY));
// searchByCountryEl.addEventListener('click', debounce(showCountries, DEBOUNCE_DELAY));
renderListMarkup(config);

searchByCountryEl.addEventListener('change', e => {
  country = e.target.value;
  search();
});

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
});

search();