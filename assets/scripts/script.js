var searchFormEl = document.querySelector('#search-form');
var searchBtnEl = document.querySelector('#searchBtn')
var searchInput = ''
// var resultCards = document.getElementById('result-cards');


searchBtnEl.addEventListener('click', function(event) {
  event.preventDefault();
  searchApiTM();
});

function searchApiTM() {
  var apiKey = 'aSqzhWcc1ZxQnMoClqxGxcTRL8GrgFyA';
  var userInput = document.getElementById('search-input').value;
  var tmQueryUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + apiKey + '&keyword=' + userInput;

  fetch(tmQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var events = data._embedded.events;
      var cards = document.querySelectorAll('.card');
      for (var i = 0; i < cards.length; i++) {
        var event = events[i];
        var card = cards[i];
        card.querySelector('#event' + (i+1)).innerHTML = event.name;
        card.querySelector('#artist' + (i+1)).innerHTML = event._embedded.attractions[0].name;
        card.querySelector('#date' + (i+1)).innerHTML = event.dates.start.localDate;
        card.querySelector('#time' + (i+1)).innerHTML = event.dates.start.localTime;
        card.querySelector('#location' + (i+1)).innerHTML = event._embedded.venues[0].name + ', ' + event._embedded.venues[0].city.name;
        card.querySelector('#link' + (i+1)).innerHTML = '<a href="' + event.url + '">Buy Tickets</a>';
      }
    })
  }

// var client_id = 'b8a40684aaf24623a0845d2de7d55422';
// var client_secret = '059928fa94f647a3ad310fbb22d30473';
// fetch('https://accounts.spotify.com/api/token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: 'grant_type=client_credentials&client_id=b8a40684aaf24623a0845d2de7d55422&client_secret=059928fa94f647a3ad310fbb22d30473'
// }).then(function (response) {
//   return response.json();
// })
//   .then(function (data) {
//     console.log(data);
//   });
// fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
//   headers: {
//     'Authorization': 'Bearer  BQDOf9b-w-3xsZeKnJDaicmrEiTVuR5GjL50LiejefW8YIDf0xu5KW1EbKL17sgIqzcj9Skt-zTjg52avGUx6KNy_Z2-lYtQld89yfuRoyKHPhxtp9PX'
//   }
// }).then(function (response) {
//   return response.json();
// })
//   .then(function (data) {
//     console.log(data);
//   });




// // Function to show suggested genre names on searched box when at least three characteres are entered
// function autoGenres() {
//   var availableGenres = ["Rock", "Pop Music", "Jazz", "Dubstep"];
//   $('#').autocomplete({
//     source: availableGenres,
//     minLength: 3
//   })
// }

// // Function to call Ticketmaster API with genre as query parameter
// function getEventByGenres() {
//   // Variable to house Ticketmaster API key
//   const apiKey = 'qxKGGKTQOTy8d78ZxhPZOnTRwN2N2pFH'
//   // Variable to house Ticketmaster API URL
//   const eventsUrl = 'https://app.ticketmaster.com/discovery/v2/classifications/genres=' + genre + '&apikey=' + apiKey
//   fetch(eventsUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (genreData) {
//       console.log(genreData);
//     });

// }


// // working fetch statements for obtaining token/ making first query
// fetch('https://accounts.spotify.com/api/token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
// }).then(function (response) {
//   return response.json();
// })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.access_token)
//     var spotifyBearerToken = data.access_token;
//     console.log(spotifyBearerToken);


//     //need to nest this fetch statement so that the bearer token is valid/recognized due to scoping
//     // calling the api query outside of this fetch will create an unrecognized bearer token
//     fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
//       headers: { 'Authorization': `Bearer ${spotifyBearerToken}` }
//     }).then(function (response) {
//       return response.json();
//     })
//       .then(function (data) {
//         console.log(data);
//       });

//   });