import debounce from 'lodash.debounce';
import * as config from './config.json';

// costum selector Adrian
const searchByCountryBtn = document.querySelector('.form__button button');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItems = document.querySelectorAll('.dropdown__list-item');
const dropdownInput = document.querySelector('.dropdown__input');
//
const searchFieldEl = document.querySelector('#search');
const searchByCountryEl = document.querySelector('#country-search');
const DEBOUNCE_DELAY = 300;

// console.log(searchByCountryBtn);

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';

// ФУНКЦИЯ ПОИСКА ПО ЗАПРОСУ
const search = async function () {
  // БЕРЁМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  const userQuery = searchFieldEl.value;
  console.log(userQuery);
  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР (ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ПАРАМЕТРЕ)
  sendServerRequest(userQuery);
  const reply = await sendServerRequest(userQuery);
  //   ВЫЗЫВАЕМ ФУНКЦИЮ ОТРИСОВКИ РАЗМЕТКИ
  renderMarkup(reply);
};

// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
const sendServerRequest = async function (userQuery) {
  let url = `${BASE_URL}events.json?keyword=${userQuery}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const events = await response.json();
  return events;
};

const renderMarkup = function (events) {
  console.log(events);
  // ФУНКЦИЯ  ДЛЯ РЕНДЕРИНГА РАЗМЕТКИ (АНЯ)
};

const showCountries = function () {
  renderListMarkup(config);
};

// ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА РАЗМЕТКИ ВЫПАДАЮЩЕГО СПИСКА

// const renderListMarkup = function (config) {
//   searchByCountryEl.innerHTML = '';
//   const array = Object.entries(config);
//   const markup = array.map(item => `<option value="${item[0]}">${item[1]}</option>`).join('');
//   searchByCountryEl.insertAdjacentHTML('beforeend', markup);
// };
// searchFieldEl.addEventListener('input', debounce(search, DEBOUNCE_DELAY));
// searchByCountryEl.addEventListener('click', debounce(showCountries, DEBOUNCE_DELAY));

// costum selector

// const listOfCountries = function () {
//   randerDropdownItems(config);
// };
// console.log(config);
// const randerDropdownItems = function (config) {
//   // searchByCountryEl.innerHTML = '';
//   const array = Object.entries(config);
//   const markup = array
//     .map(item => `<li class="dropdown__list-item" data-value="${item[0]}">${item[1]}</li>`)
//     .join('');
//   dropdownList.insertAdjacentHTML('beforeend', markup);
//   // console.log(array);
//   // console.log(markup);
// };
// console.log(dropdownList);

// searchByCountryBtn.addEventListener('click', debounce(listOfCountries, DEBOUNCE_DELAY));

document.querySelectorAll('.dropdown').forEach(dropDown => {
  const searchByCountryBtn = document.querySelector('.form__button button');
  const dropdownList = document.querySelector('.dropdown__list');
  const dropdownListItems = document.querySelectorAll('.dropdown__list-item');
  const dropdownListItem = document.querySelector('.dropdown__list-item');
  const dropdownInput = document.querySelector('.dropdown__input');

  searchByCountryBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    dropdownList.classList.toggle('visually-hidden');
    // console.log(dropdownListItems);
  });
  dropdownListItems.forEach(elem =>
    elem.addEventListener('click', e => {
      e.stopPropagation();
      console.log(elem.innerText);
      searchByCountryBtn.innerText = elem.innerText;
      dropdownList.classList.toggle('visually-hidden');
    }),
  );
  document.addEventListener('click', () => {
    dropdownList.classList.add('visually-hidden');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') dropdownList.classList.add('visually-hidden');
  });
  // --------------------rander Countries --------------
  const listOfCountries = function () {
    randerDropdownItems(config);
  };
  const randerDropdownItems = function (config) {
    const array = Object.entries(config);
    const markup = array
      .map(item => `<li class="dropdown__list-item" data-value="${item[0]}">${item[1]}</li>`)
      .join('');
    dropdownList.insertAdjacentHTML('beforeend', markup);
  };

  searchByCountryBtn.addEventListener('click', debounce(listOfCountries, DEBOUNCE_DELAY));

  dropdownList.addEventListener('click', e => {
    console.log(e.target.dataset.value);
    searchByCountryBtn.textContent = e.target.innerText;
  });
});

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
