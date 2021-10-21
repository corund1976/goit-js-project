import modalMarkupTpl from '../templates/modal-markup.hbs';
import { BASE_URL, API_KEY } from './server_request';

console.log('modalMarkupTpl', modalMarkupTpl);

const refs = {
  eventsCardsList: document.querySelector('.events .card'),
  modalBtnCloseNode: document.querySelector('.backdrop .modal__closed'),
  modalNode: document.querySelector('.backdrop'),
  bodyNode: document.querySelector('body'),
  cardNode: document.querySelector('.card .card__item'),
  modalContentNode: document.querySelector('.backdrop .modal-content'),
  modalAnimation: document.querySelector('.modal'),
};

refs.eventsCardsList.addEventListener('click', onEventClick);
refs.modalBtnCloseNode.addEventListener('click', onModalClose);
refs.modalNode.addEventListener('click', onBackdropClick);

async function onEventClick(e) {
  // if (e.target.nodeName !== 'LI') return false;
  if (e.target.nodeName !== 'LI') return false;
  e.preventDefault();

  refs.bodyNode.addEventListener('keydown', onKeyPress);
  refs.modalNode.classList.toggle('is-hidden');
  refs.bodyNode.classList.toggle('modal-is-open');
  refs.modalAnimation.classList.add('animation-open');
  refs.modalAnimation.classList.remove('animation-close');
  console.log('onEventClick ~ e', e.target.id);
  const response = await fetch(`${BASE_URL}events/${e.target.id}.json?apikey=${API_KEY}`);
  console.log('onEventClick ~ response', response);
  const data = await response.json();
  console.log('onEventClick ~ data', data);

  refs.modalContentNode.innerHTML = '';
  renderModalMarkup(data);
}

function onModalClose(e) {
  refs.bodyNode.classList.toggle('modal-is-open');
  refs.modalAnimation.classList.remove('animation-open');
  refs.modalAnimation.classList.add('animation-close');
  refs.bodyNode.removeEventListener('keydown', onKeyPress);
  refs.modalNode.classList.toggle('is-hidden');
}
function onBackdropClick(e) {
  
  if (e.target === refs.modalNode) {
    
    onModalClose();
  }
}
function onKeyPress(e) {
  if (e.code === 'Escape') {
    onModalClose();
  }
}
function renderModalMarkup(data) {
  const markupContent = `
        
      <div class="modal__form">
        <img class='logo' src='${data.images.map(img => img.url)[2]}' alt='logo-event' />
        <div class='cards'>
          <div class='info-img'>
            <img class='demo' src='${data.images.map(img => img.url)[0]}' alt='event' />
          </div>
          <div class='cards__info'>
            <span class='cards__title'>INFO</span>
            <p class='cards__text'>${data._embedded.venues[0].generalInfo.generalRule}
            </p>
            <span class='cards__title'>WHEN</span>
            <p class='cards__text'>${data.dates.start.localDate}
              <br />
              ${data.dates.start.localTime} (${data.dates.timezone})
            </p>
            <span class='cards__title'>WHERE</span>
            <p class='cards__text'>${data._embedded.venues[0].city.name},
             ${data._embedded.venues[0].country.name},
             ${data._embedded.venues[0].state.name},
              <br />
              ${data._embedded.venues[0].name}
            </p>
            <span class='cards__title'>WHO</span>
            <p class='cards__text'>${data._embedded.attractions.map(
              participant => participant.name,
            )}</p>
            <span class='cards__title'>PRICES</span>
            <div class="modal-price">
              <svg class="modal__icon-barcode">
                <use href="./images/svg/sprite.svg#icon-barcode"></use>
              </svg>
              <p class='cards__text'>${data.priceRanges[0].type} 
              ${data.priceRanges[0].min}-
              ${data.priceRanges[0].max} ${data.priceRanges[0].currency}</p>  
            </div>
            <a class="modal-button" target="_blank" href="#">BUY TICKETS</a>
            <div class="modal-price">
                <svg class="modal__icon-barcode">
                  <use href="./images/svg/sprite.svg#icon-barcode"></use>
                </svg>
                <p class='cards__text'>VIP 1000-1500 UAH</p>
              </div>
              <a class="modal-button" target="_blank" href="#">BUY TICKETS</a>
          </div>
        </div>
        <button class='btn-more' data-name=''>MORE FROM THIS AUTHOR</button>
        
      </div>
  `;
  return refs.modalContentNode.insertAdjacentHTML('beforeend', markupContent);
}
