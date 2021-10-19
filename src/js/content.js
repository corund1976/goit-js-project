const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';

const sendServerRequest = async function (userQuery) {
  let url = `${BASE_URL}events.json?keyword=${userQuery}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const events = await response.json();
  return events;
};

const search = async function (e) {
  const userQuery = 'Euro';
  const reply = await sendServerRequest(userQuery);
  renderMarkup(reply);
};

const renderMarkup = function (searchedEvents) {
  console.log(searchedEvents);
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
    console.log(searchedEvents._embedded.events.map(item => item.name));
    console.log(searchedEvents._embedded.events.map(item => item.dates.start.localDate));
    console.log(searchedEvents._embedded.events[i].images.map(img => img.url)[0]);
  }
  document.querySelector('.card').insertAdjacentHTML('beforeend', render);
};
search();
