import debounce from 'lodash.debounce';
import * as config from '../config.json';

const searchFieldEl = document.querySelector('#search');
const searchByCountryEl = document.querySelector('#country-search');
const DEBOUNCE_DELAY = 300;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';
let userQuery;
let country;
// ФУНКЦИЯ ПОИСКА ПО ЗАПРОСУ
const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  const userQuery = searchFieldEl.value;
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  sendServerRequest(userQuery, country);
  const reply = await sendServerRequest(userQuery, country);
  //   ВЫЗЫВАЕМ ФУНКЦИЮ ОТРИСОВКИ РАЗМЕТКИ
  renderMarkup(reply);
};

// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
const sendServerRequest = async function (userQuery, country = '') {
  let url;
  if (userQuery === '') {
    url = `${BASE_URL}events.json?apikey=${API_KEY}`;
  } else {
    url = `${BASE_URL}events.json?keyword=${userQuery}&countryCode=${country}&apikey=${API_KEY}`;
  }

  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};

const renderMarkup = function (searchedEvents) {
  let render = '';
  for (let i = 0; i < searchedEvents.page.totalElements; i++) {
    render += ` <li class="card__item">
        <a href="" class="card__item__link link">
            <div class="border-card"></div>
            <img src="${searchedEvents._embedded.events[i].images.map(img => img.url)[0]}" 
                alt="img with singer"
                class="card__item__img card__item__elements">
            <h3 class="card__item__name-of-group card__item__elements"> ${
              searchedEvents._embedded.events[i].name
            }</h3>
            <p class="card__item__date-to-begin card__item__elements">${
              searchedEvents._embedded.events[i].dates.start.localDate
            }</p>
            <p class="card__item__location card__item__elements"> ${searchedEvents._embedded.events[
              i
            ]._embedded.venues.map(item => (item.name ? item.name : item.address?.line1))}</p>
        </a>
    </li>`;
  }
  document.querySelector('.card').innerHTML = render;
};

const showCountries = function () {
  country = searchByCountryEl.value;
  console.log(country);

  renderListMarkup(config);
};
// ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА РАЗМЕТКИ ВЫПАДАЮЩЕГО СПИСКА

const renderListMarkup = function (config) {
  searchByCountryEl.innerHTML = '';
  const array = Object.entries(config);
  const markup = array.map(item => `<option value="${item[0]}">${item[1]}</option>`).join('');
  searchByCountryEl.insertAdjacentHTML('beforeend', markup);
};
searchFieldEl.addEventListener('input', debounce(search, DEBOUNCE_DELAY));
searchByCountryEl.addEventListener('change', debounce(showCountries, DEBOUNCE_DELAY));
