const refs = {
  eventsCardsList: document.querySelector('.events-section .card'),
  modalBtnCloseNode: document.querySelector('.backdrop .modal__closed'),
  modalNode: document.querySelector('.backdrop'),
};

// console.log('modalBtnCloseNode', refs.modalBtnCloseNode);
refs.eventsCardsList.addEventListener('click', onEventClick);
refs.modalBtnCloseNode.addEventListener('click', onModalClose);
function onEventClick(e) {
  e.preventDefault();

  refs.modalNode.classList.toggle('is-hidden');
}
function onModalClose(e) {
  refs.modalNode.classList.toggle('is-hidden');
}
