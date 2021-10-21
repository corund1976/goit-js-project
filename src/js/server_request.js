// ФУНКЦИЯ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
export const sendServerRequest = async function (userQuery = '', country = '', page = 0) {
  let url;

  if (userQuery === '' && country !== '') {
    url = `${BASE_URL}events.json?countryCode=${country}&apikey=${API_KEY}&page=${page}`;
  } else if (country === '') {
    url = `${BASE_URL}events.json?&apikey=${API_KEY}&keyword=${userQuery}&page=${page}`;
  } else if (country !== '' && userQuery !== '') {
    url = `${BASE_URL}events.json?countryCode=${country}&keyword=${userQuery}&apikey=${API_KEY}&page=${page}`;
  }
  console.log(url);
  const response = await fetch(url);
  if (response.status >= 200 && response.status < 300) {
    const events = await response.json();
    return events;
  } else return Promise.reject(console.log('Requst error'));
};
