import config_js from '../config_js.json';

// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
export const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';

export const sendServerRequest = async function (userQuery = '', country = '', page = 0) {
  let url;
  if (userQuery === '' && country !== '') {
    url = `${config_js.BASE_URL}events.json?countryCode=${country}&apikey=${config_js.API_KEY}&page=${page}`;
  } else if (country === '') {
    url = `${config_js.BASE_URL}events.json?&apikey=${config_js.API_KEY}&keyword=${userQuery}&page=${page}`;
  } else if (country !== '' && userQuery !== '') {
    url = `${config_js.BASE_URL}events.json?countryCode=${country}&keyword=${userQuery}&apikey=${config_js.API_KEY}&page=${page}`;
  }
  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};
