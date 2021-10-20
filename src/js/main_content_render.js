export const renderMarkup = function (searchedEvents) {
  let render = '';
  let totalEl;
  
  if (searchedEvents.page.totalElements > searchedEvents.page.size) {
    totalEl = searchedEvents.page.size;
  } else {
    totalEl = searchedEvents.page.totalElements;
  }

  for (let i = 0; i < totalEl; i++) {
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