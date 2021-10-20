import modalMarkupTpl from '../templates/modal-markup.hbs';
import { search, result } from './search-field';
// console.log('modalMarkupTpl', modalMarkupTpl);

const refs = {
  eventsCardsList: document.querySelector('.events-section .card'),
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
  if (
    e.target.nodeName !== 'IMG' &&
    e.target.nodeName !== 'DIV' &&
    e.target.nodeName !== 'H3' &&
    e.target.nodeName !== 'P'
  )
    return false;
  e.preventDefault();
  refs.bodyNode.addEventListener('keydown', onKeyPress);
  refs.modalNode.classList.toggle('is-hidden');

  console.log('onEventClick ~ e', e);
}

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
