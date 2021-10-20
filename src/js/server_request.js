// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
export const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';

export const sendServerRequest = async function (userQuery, country = '') {
  let url;

  if (userQuery === '') {
    url = `${BASE_URL}events.json?countryCode=${country}&apikey=${API_KEY}`;
  } else {
    url = `${BASE_URL}events.json?countryCode=${country}&keyword=${userQuery}&apikey=${API_KEY}`;
  }

  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};
