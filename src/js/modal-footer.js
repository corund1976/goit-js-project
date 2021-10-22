const studRefs = {
  showStudents: document.querySelector('.footer-students'),
  modal: document.querySelector('.modal-students'),
  modalClose: document.querySelector('.modal-students .modal__closed'),
  modalBackdrop: document.querySelector('.backdrop-footer'),
  modalInput: document.querySelector('.modal-students__content input'),
  //   eachMember: document.querySelector('.swiper-slide-active'),
};
console.log(studRefs.modalInput);
console.log(studRefs.eachMember);

// studRefs.modalInput.value = studRefs.eachMember.textContent;
studRefs.showStudents.addEventListener('click', e => {
  e.preventDefault();
  studRefs.modalBackdrop.classList.toggle('is-hidden');
});

studRefs.modalClose.addEventListener('click', e => {
  studRefs.modalBackdrop.classList.toggle('is-hidden');
});
studRefs.modalBackdrop.addEventListener('click', e => {
  console.log(e.target);
  if (e.target === studRefs.modalBackdrop) studRefs.modalBackdrop.classList.toggle('is-hidden');
});

const eachMember = document.querySelector('.swiper-slide-active');
var swiper = new Swiper('.mySwiper', {
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  effect: 'cards',
  grabCursor: true,
});
