import debounce from 'lodash.debounce';
import * as config from './config.json';

const searchFieldEl = document.querySelector('#search');
const searchByCountryEl = document.querySelector('#country-search');
const DEBOUNCE_DELAY = 300;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'Q9savgjBFnHGJj2EK0EB2bfGv110AECA';
//  'kGyK62KCJILapDAPE9fz0caemViSYQAs';
//https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Q9savgjBFnHGJj2EK0EB2bfGv110AECA
// ФУНКЦИЯ ПОИСКА ПО ЗАПРОСУ
const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  const userQuery = searchFieldEl.value || '';
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  sendServerRequest(userQuery);
  const reply = await sendServerRequest(userQuery);
  //   ВЫЗЫВАЕМ ФУНКЦИЮ ОТРИСОВКИ РАЗМЕТКИ
  renderMarkup(reply);
};

// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
const sendServerRequest = async function (userQuery) {
  let url;
  if (userQuery === '') {
    url = `${BASE_URL}events.json?apikey=${API_KEY}`;
  } else {
    url = `${BASE_URL}events.json?keyword=${userQuery}&apikey=${API_KEY}`;
  }
  const response = await fetch(url);
  console.log(response.status);
  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};

const renderMarkup = function (searchedEvents) {
  let render = '';
  let totalEl;
  if (searchedEvents.page.totalElements > searchedEvents.page.size) {
    totalEl = searchedEvents.page.size;
  } else {
    totalEl = searchedEvents.page.totalElements;
  }
  for (let i = 0; i < totalEl; i++) {
    console.log(searchedEvents._embedded.events[i]);
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
searchByCountryEl.addEventListener('click', debounce(showCountries, DEBOUNCE_DELAY));
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
});
search();
// СТАРАЯ ВЕРСИЯ - ФУНКЦИЯ ЗАПРОСА НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ СПИСКА СТРАН

// const searchCountry = async function () {
//     let url2 = `${BASE_URL}venues.json?&apikey=${API_KEY}`;
//     const venues1 = await fetch(url2)
//     const { _embedded } = await venues1.json()
//     console.log(_embedded)
//     const countryNames= _embedded.venues
//     // const { _embedded: { venues } } = venuesList
//     renderListMarkup(countryNames)
//     // return countryNames
// }

// searchByCountryEl.addEventListener('click', debounce(searchCountry, DEBOUNCE_DELAY))

// ВАРИАНТ ЗАПРОСА НА СЕРВЕР ЧЕРЕЗ ПРОМИСЫ

//https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}

// const sendServerRequest = function (userQuery) {

//     let url = `${BASE_URL}events.json?keyword=${userQuery}&apikey=${API_KEY}`;

//     fetch(url).then(response=> response.json()).then(response=> console.log(response))
//     // const events = await response.json()
//     // .then(console.log(events))
//     // renderMarkup(response)
// }
