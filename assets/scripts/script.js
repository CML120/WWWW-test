var searchFormEl = document.querySelector('#search-form');
var searchBtnEl = document.querySelector('#searchBtn')
var searchInput = ''


function searchApiTM(){
    var tmQueryUrl ='https://app.ticketmaster.com/discovery/v2/events?apikey=aSqzhWcc1ZxQnMoClqxGxcTRL8GrgFyA'

    fetch(tmQueryUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });

}



var tmQueryUrl ='https://app.ticketmaster.com/discovery/v2/events?apikey=aSqzhWcc1ZxQnMoClqxGxcTRL8GrgFyA'
fetch(tmQueryUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });