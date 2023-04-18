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

var client_id = 'b8a40684aaf24623a0845d2de7d55422';
var client_secret = '059928fa94f647a3ad310fbb22d30473';
fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials&client_id=b8a40684aaf24623a0845d2de7d55422&client_secret=059928fa94f647a3ad310fbb22d30473'
}).then(function (response) {
  return response.json();
})
  .then(function (data) {
    console.log(data);
  });
fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
  headers: {
    'Authorization': 'Bearer  BQDOf9b-w-3xsZeKnJDaicmrEiTVuR5GjL50LiejefW8YIDf0xu5KW1EbKL17sgIqzcj9Skt-zTjg52avGUx6KNy_Z2-lYtQld89yfuRoyKHPhxtp9PX'
  }
}).then(function (response) {
  return response.json();
})
  .then(function (data) {
    console.log(data);
  });
 



        // Function to show suggested genre names on searched box when at least three characteres are entered
        function autoGenres() {
          var availableGenres = ["Rock", "Pop Music", "Jazz", "Dubstep"];
          $('#').autocomplete({
              source: availableGenres,
              minLength: 3 
          })
      }
      
      // Function to call Ticketmaster API with genre as query parameter
      function getEventByGenres() {
          // Variable to house Ticketmaster API key
          const apiKey = 'qxKGGKTQOTy8d78ZxhPZOnTRwN2N2pFH'
          // Variable to house Ticketmaster API URL
          const eventsUrl = 'https://app.ticketmaster.com/discovery/v2/classifications/genres=' + genre + '&apikey=' + apiKey
          fetch(eventsUrl)
        .then(function (response) {
          return response.json();
        })
          .then(function (genreData) {
            console.log(genreData);
          });
              
      }