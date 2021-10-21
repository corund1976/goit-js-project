import spriteSvg from '../images/svg/sprite.svg';
export const renderMarkup = function (searchedEvents) {
  let render = '';
  let totalEl;

  if (searchedEvents.page.totalElements > searchedEvents.page.size) {
    totalEl = searchedEvents.page.size;
  } else {
    totalEl = searchedEvents.page.totalElements;
  }

  for (let i = 0; i < totalEl; i++) {
    render += ` <li class="card__item" id="${searchedEvents._embedded.events[i].id}">
            <div class="border-card card__item__elements"></div>
            <img src="${searchedEvents._embedded.events[i].images.map(img => img.url)[0]}" 
                alt="img with singer"
                class="card__item__img card__item__elements">
            <h2 class="card__item__name-of-group card__item__elements card__item__animation"><span class="marquee"> ${
              searchedEvents._embedded.events[i].name
            }</span></h2>
            <p class="card__item__date-to-begin card__item__elements">${
              searchedEvents._embedded.events[i].dates.start.localDate
            }</p>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" class="card__item__location card__item__elements card__item__animation">
            <span class="marquee-location">
              <svg class="icon__location">
                <use href="${spriteSvg}#icon-location"></use>
              </svg>

              ${searchedEvents._embedded.events[i]._embedded.venues.map(item =>
                item.name ? item.name : item.address?.line1,
            )}</span></a>
    </li>`;
  }

  document.querySelector('.card').innerHTML = render;
};

// <img class="card__item__location-img" src="../images/card/location.png" alt="location"> ${searchedEvents._embedded.events[
