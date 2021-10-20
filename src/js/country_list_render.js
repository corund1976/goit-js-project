import { searchByCountryEl } from './search';

// ФУНКЦИЯ ДЛЯ РЕНДЕРИНГА РАЗМЕТКИ ВЫПАДАЮЩЕГО СПИСКА
export const renderListMarkup = function (config) {
  searchByCountryEl.innerHTML = '';
    
  const array = Object.entries(config);
  const markup = array.map(item => `<option value="${item[0]}">${item[1]}</option>`).join('');
  
  searchByCountryEl.insertAdjacentHTML('beforeend', markup);
};