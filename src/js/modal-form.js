const refs = {
  eventsCardsList: document.querySelector('.events-section .card'),
  modalBtnCloseNode: document.querySelector('.backdrop .modal__closed'),
  modalNode: document.querySelector('.backdrop'),
};

refs.eventsCardsList.addEventListener('click', onEventClick);
document.querySelector('body').addEventListener('keydown', onKeyPress);
refs.modalBtnCloseNode.addEventListener('click', onModalClose);
refs.modalNode.addEventListener('click', onBackdropClick);

function onEventClick(e) {
  refs.modalNode.classList.toggle('is-hidden');
}
function onModalClose(e) {
  refs.modalNode.classList.toggle('is-hidden');
}
function onBackdropClick(e) {
  if (e.target === refs.modalNode) {
    refs.modalNode.classList.toggle('is-hidden');
  }
}
function onKeyPress(e) {
  if (e.code === 'Escape') {
    refs.modalNode.classList.toggle('is-hidden');
  }
}
