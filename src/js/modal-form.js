import modalMarkupTpl from '../templates/modal-markup.hbs';
import { BASE_URL, API_KEY } from './server_request';

console.log('modalMarkupTpl', modalMarkupTpl);

const refs = {
  eventsCardsList: document.querySelector('.events .card'),
  modalBtnCloseNode: document.querySelector('.backdrop .modal__closed'),
  modalNode: document.querySelector('.backdrop'),
  bodyNode: document.querySelector('body'),
  cardNode: document.querySelector('.card .card__item'),
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

  console.log('onEventClick ~ e', e.target.id);
  const response = await fetch(`${BASE_URL}events/${e.target.id}.json?apikey=${API_KEY}`);
  console.log('onEventClick ~ response', response);
  const data = await response.json();
}
// const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
// const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';
function onModalClose(e) {
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
