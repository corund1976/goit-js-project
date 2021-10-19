const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'kGyK62KCJILapDAPE9fz0caemViSYQAs';
//'Q9savgjBFnHGJj2EK0EB2bfGv110AECA';

const sendServerRequest = async function (userQuery) {
  let url = `${BASE_URL}events.json?keyword=${userQuery}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const events = await response.json();
  return events;
};

const search = async function (e) {
  const userQuery = 'Eurovision';
  // sendServerRequest(userQuery);
  // keyWord = searchFieldEl.value
  // keyWord = 'eurov';
  const reply = await sendServerRequest(userQuery);
  //   console.log(reply);
  renderMarkup(reply);
};

const renderMarkup = function (searchedEvents) {
  console.log(searchedEvents);
  let render = '';
  for (let i = 0; i < searchedEvents.page.totalElements; i++) {
    render += `<div><ul>
          <li><img src="${searchedEvents._embedded.events[i].images.map(img => img.url)[0]}"></li>
          <li>Event name: ${searchedEvents._embedded.events[i].name}</li>
          <li>Event date: ${searchedEvents._embedded.events[i].dates.start.localDate}</li>
          <li>Event location: ${searchedEvents._embedded.events[i]._embedded.venues.map(item =>
            item.name ? item.name : item.address?.line1,
          )}</li>
          </ul>
          </div>`;
    console.log(searchedEvents._embedded.events.map(item => item.name));
    console.log(searchedEvents._embedded.events.map(item => item.dates.start.localDate));
    // console.log(
    //   searchedEvents._embedded.events.map(item =>
    //     item._embedded.venues.map(item => (item.name === [] ? item.name : item.address.line1)),
    //   ),
    // );
    console.log(searchedEvents._embedded.events[i].images.map(img => img.url)[0]);
  }
  document.querySelector('body').insertAdjacentHTML('beforeend', render);
};
search();
// const sendServerRequestForCountry = async function (userQuery = 'US') {
//   let url = `${BASE_URL}events.json?countryCode=${userQuery}&apikey=${API_KEY}`;
//   const response = await fetch(url);
//   const events = await response.json();
//   console.log(events);
//   return events;
// };
// sendServerRequestForCountry();
