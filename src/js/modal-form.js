import config_js from '../config_js.json';
import { renderMarkup } from './main_content_render';
import { sendServerRequest } from './server_request';
import { renderPagination } from './pagination_render';
import spriteSvg from '../images/svg/sprite.svg';

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
  if (e.target.nodeName !== 'LI') return false;

  e.preventDefault();

  refs.bodyNode.addEventListener('keydown', onKeyPress);
  refs.modalNode.classList.toggle('is-hidden');
  refs.bodyNode.classList.toggle('modal-is-open');
  refs.modalAnimation.classList.add('animation-open');
  refs.modalAnimation.classList.remove('animation-close');

  const response = await fetch(
    `${config_js.BASE_URL}events/${e.target.id}.json?apikey=${config_js.API_KEY}`,
  );
  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();

    refs.modalContentNode.innerHTML = '';

    renderModalMarkup(data);

    const textScroll = document.querySelector('.cards__text__info');
    const widthLimit = 100;

    document.documentElement.style.setProperty('--widthLimit', `${widthLimit}px)`);

    if (textScroll.clientHeight > widthLimit) {
      await textScroll.classList.add('limite');
    }

    const loadMore = document.querySelector('.btn-more');

    loadMore.addEventListener('click', onShowMore);

    async function onShowMore() {
      let {
        _embedded: { attractions },
      } = data;
      let artists = attractions?.map(item => item.name).join(',');
      const serverResponse = await sendServerRequest(artists);

      onModalClose();

      const container = document.querySelector('.card');

      container.innerHTML = '';

      renderMarkup(serverResponse);
      renderPagination(serverResponse);
    }
  } else return Promise.reject(console.log('Request error!!!'));
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
            <span class='${
              data._embedded.venues[0].generalInfo?.generalRule ? 'cards__title' : 'visually-hidden'
            }'>INFO</span>
            <div class='wrapper-card'>
            <p class='cards__text__info'>${
              data._embedded.venues[0].generalInfo?.generalRule
                ? data._embedded.venues[0].generalInfo.generalRule
                : ''
            }
            </p>
            </div>
            <span class='cards__title'>WHEN</span>
            <p class='cards__text'>${
              data?.dates?.start?.localDate ? data?.dates?.start?.localDate : ''
            }
              <br />
              ${data?.dates?.start?.localTime ? data?.dates?.start?.localTime : ''} ${
    data?.dates?.timezone ? `&#40;${data?.dates?.timezone},&#41;` : ''
  }
            </p>
            <span class='cards__title'>WHERE</span>
            <p class='cards__text'>${
              data?._embedded?.venues?.[0]?.city?.name
                ? data?._embedded?.venues?.[0]?.city?.name
                : ''
            },
             ${
               data?._embedded?.venues?.[0]?.country?.name
                 ? data?._embedded?.venues?.[0]?.country?.name
                 : ''
             },
             ${
               data?._embedded?.venues?.[0]?.state?.name
                 ? data?._embedded?.venues?.[0]?.state?.name
                 : ''
             },
              <br />
              ${data?._embedded?.venues?.[0]?.name ? data?._embedded?.venues?.[0]?.name : ''}
            </p>
            <span class='cards__title'>WHO</span>
            <p class='cards__text'>${
              data?._embedded?.attractions?.map(participant => participant?.name)
                ? data?._embedded?.attractions?.map(participant => participant?.name)
                : ''
            }
              </p>
            <div class="${data.priceRanges?.[0] ? 'test' : 'visually-hidden'}">
            <span class='cards__title'>PRICES</span>
            <div class="modal-price">
              <svg class="modal__icon-barcode">
                <use href="${spriteSvg}#icon-barcode"></use>
              </svg>
              <p class='cards__text'>${
                data?.priceRanges?.[0]?.type ? data?.priceRanges?.[0]?.type : ''
              } 
              ${data.priceRanges?.[0]?.min ? data.priceRanges?.[0]?.min : ''}-
              ${data?.priceRanges?.[0]?.max ? data?.priceRanges?.[0]?.max : ''} ${
    data?.priceRanges?.[0]?.currency ? data?.priceRanges?.[0]?.currency : ''
  }</p>  
            </div>
            <a class="modal-button" target="_blank" href="${data.url}" rel="noopener noreferrer">BUY TICKETS</a>
            </div>
          </div>
          </div>
          <button class='btn-more' data-name=''>MORE FROM THIS AUTHOR</button>
        
      </div>
  `;
  return refs.modalContentNode.insertAdjacentHTML('beforeend', markupContent);
}
