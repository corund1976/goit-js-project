// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';

export const sendServerRequest = async function (userQuery = '', country = '', page = 0) {
  let url;

  if (userQuery === '' && country !== '') {
    url = `${BASE_URL}events.json?&apikey=${API_KEY}countryCode=${country}&page=${page}`;
  } else if (country === '') {
    url = `${BASE_URL}events.json?&apikey=${API_KEY}&keyword=${userQuery}&page=${page}`;
  } else if (country !== '' && userQuery !== '') {
    url = `${BASE_URL}events.json?&apikey=${API_KEY}countryCode=${country}&keyword=${userQuery}&page=${page}`;
  }
  console.log(url);
  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};
