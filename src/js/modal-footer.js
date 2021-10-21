const studRefs = {
  showStudents: document.querySelector('.footer-students'),
  modal: document.querySelector('.modal-students'),
  modalClose: document.querySelector('.modal-students modal__closed'),
  modalBackdrop: document.querySelector('.backfrop-footer'),
};

studRefs.showStudents.addEventListener('click', e => {
  e.preventDefault();
  studRefs.modalBackdrop.classList.toggle('visually-hidden');
});
