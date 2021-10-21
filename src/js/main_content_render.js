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
    if (searchedEvents._embedded?.events?.[i]?.id) {
      render += ` <li class="card__item" id="${searchedEvents._embedded?.events?.[i].id}">
            <div class="border-card card__item__elements"></div>
            <img src="${searchedEvents._embedded?.events?.[i].images.map(img => img.url)[0]}" 
                alt="img with singer"
                class="card__item__img card__item__elements">
            <h2 class="card__item__name-of-group card__item__elements card__item__animation  ${
              searchedEvents._embedded?.events?.[i].name.length > 20 ? 'j-content' : ''
              }"><span class=${
              searchedEvents._embedded?.events?.[i].name.length > 20 ? 'marquee' : ''
              }> 
              ${searchedEvents._embedded?.events?.[i].name}</span></h2>
            <p class="card__item__date-to-begin card__item__elements">${
              searchedEvents._embedded?.events?.[i].dates.start.localDate
            }</p>
            <a href="https://maps.google.com/?ll=${searchedEvents._embedded.events[i]._embedded?.venues.map(
              item => item.location?.latitude,
            )},${searchedEvents._embedded.events[i]._embedded?.venues.map(
        item => item.location?.longitude,
      )}" target="_blank" rel="noopener noreferrer" class="card__item__location card__item__elements card__item__animation center-location ${
        searchedEvents._embedded.events[i]._embedded?.venues.map(item =>
          item.name ? item.name.length : item.address?.line1.length,
        ) >= 20
          ? 'j-content'
          : ''
      }">
              <span class="icon__location-bg">
            <svg class="icon__location">
                <use href="${spriteSvg}#icon-location"></use>
              </svg>
              </span>
             <span id="animation" ${
               searchedEvents._embedded.events[i]._embedded?.venues.map(item =>
                 item.name ? item.name.length : item.address?.line1.length,
               ) > 20
                 ? "class='marquee-location'"
                 : ''
             }>
              ${searchedEvents._embedded?.events?.[i]._embedded?.venues.map(item =>
                item.name ? item.name : item.address?.line1,
              )}</span></a>
    </li>`;
    }
  }
  
  document.querySelector('.card').innerHTML = render;
};
