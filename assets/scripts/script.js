var searchFormEl = document.querySelector('#search-form');
var searchBtnEl = document.querySelector('#searchBtn')
var searchInput = ''
var client_id = 'b8a40684aaf24623a0845d2de7d55422';
var client_secret = '059928fa94f647a3ad310fbb22d30473';
// var resultCards = document.getElementById('result-cards');
// var cardDisplayEl = document.querySelector('#card-display');
var artistName = "The Weeknd";  // this will store the artist name from the TicketMaster search query then pass it to the Spotify query

// $('#searchBtn').on("click",function(event) {
//   event.preventDefault();

// // cannot remove is-hidden class   currently remove all class attributes, then re-add back using set attribute
// // cardDisplayEl.removeAttribute("class")
// // cardDisplayEl.setAttribute("class", "columns is-size-5 is-justify-content-space-evenly");


//       // working fetch statements for obtaining token/ making first query
//       fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
//       }).then(function (response) {
//         return response.json();
//       })
//         .then(function (data) {

//           //reminder to remove console logs
//           console.log(data);
//           console.log(data.access_token)
//           var spotifyBearerToken = data.access_token;
//           console.log(spotifyBearerToken);
          
      
//           //need to nest this fetch statement so that the bearer token is valid/recognized due to scoping
//           // calling the api query outside of this fetch will create an unrecognized bearer token
//           fetch('https://api.spotify.com/v1/search?query=' + artistName + '&type=artist&market=us&limit=10&offset=0', {
//             headers: { 'Authorization': `Bearer ${spotifyBearerToken}` }
//           }).then(function (response) {
//             return response.json();
//           })
//             .then(function (data) {
//               //reminder to remove console logs
//               console.log(data);
//               console.log(data.artists.items[0].external_urls);
//               var hrefLink = data.artists.items[0].external_urls;
             
//               console.log(hrefLink.spotify);

//               //functional example code for displaying results cards
//               //using template literal to add event cards
//               for(i = 0; i <= 3; i++){

//                 var cardDisplay =`
//               <div class="card ">
//                 <ul>
//                     <li id="event1">`+ "Insert Event Here" + `</li>
//                     <li id="artist1">`+ "Insert Artist name here" + `</li>
//                     <li id="date1">`+ "Insert Date here" + `</li>
//                     <li id="time1">`+ "Insert Time here" + `</li>
//                     <li id="location1">`+ "Insert location here" + `</li>
//                     <li id="link1"> <a href=" `+ hrefLink.spotify + `" target="_blank">` + artistName + " Spotify Playlist" + ` </a> </li>
//                 </ul>
//               </div>
//               `;

//               $("#card-display").append(cardDisplay);

//               }
              
//             });
      
//         });


// })





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


      // working fetch statements for obtaining token/ making first query
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
  }).then(function (response) {
    return response.json();
  })
    .then(function (data) {
      console.log(data);
      console.log(data.access_token)
      var spotifyBearerToken = data.access_token;
      console.log(spotifyBearerToken);
      
  
      //need to nest this fetch statement so that the bearer token is valid/recognized due to scoping
      // calling the api query outside of this fetch will create an unrecognized bearer token
      fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
        headers: { 'Authorization': `Bearer ${spotifyBearerToken}` }
      }).then(function (response) {
        return response.json();
      })
        .then(function (data) {
          console.log(data);
        });
  
    });