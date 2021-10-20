// ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА РАЗМЕТКИ ВЫПАДАЮЩЕГО СПИСКА
export const renderListMarkup = function (config) {
  const searchByCountryEl = document.querySelector('#country-search');
  searchByCountryEl.innerHTML = '';

  const array = Object.entries(config);
  const markup = array.map(item => `<option value="${item[1]}">${item[0]}</option>`).join('');

  searchByCountryEl.insertAdjacentHTML('beforeend', markup);
};
