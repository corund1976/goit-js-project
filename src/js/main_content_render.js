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
            <div class="border-card"></div>
            <img src="${searchedEvents._embedded.events[i].images.map(img => img.url)[0]}" 
                alt="img with singer"
                class="card__item__img card__item__elements">
            <h2 class="card__item__name-of-group card__item__elements"><span class="marquee"> ${
              searchedEvents._embedded.events[i].name
            }</span></h2>
            <p class="card__item__date-to-begin card__item__elements">${
              searchedEvents._embedded.events[i].dates.start.localDate
            }</p>
            <p class="card__item__location card__item__elements">
            <span class="marquee-location">&#128205;${searchedEvents._embedded.events[i]._embedded.venues
              .map(item => (item.name ? item.name : item.address?.line1))}</span></p>
    </li>`;
  }

  document.querySelector('.card').innerHTML = render;
};

            // <img class="card__item__location-img" src="../images/card/location.png" alt="location"> ${searchedEvents._embedded.events[
