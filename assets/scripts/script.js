$(document).ready(function () {
  // Hiding div with attractions card because there are no events to show
  $(attractions).hide();
  getSearchedKeyword();
  autoKeywords();
  // Function to when the search button is clicked
  $("#searchBtn").click(function (e) {
    e.preventDefault();
    deleteAppends();

    if ($("#user-input").val() == "") {
      $(attractions).hide();
      getSearchedKeyword();
    } else {
      var userinput = $("#user-input").val();
      artistName = userinput;
      getEventByKeyword(userinput);
      getSearchedKeyword();
    }
  });
  // Function to when any li (previous searched keywords) is clicked
  $(document).on("click", "li", function (e) {
    e.preventDefault();
    deleteAppends();
    // Saving clicked keyword into variable to be passed into function that gets events info for keyword searched and shows previous searched keyword if any
    var userinput = $(this).text();
    artistName = userinput;
    getEventByKeyword(userinput);
    getSearchedKeyword();
  });
});

// Function to show suggested keyword names on searched box when at least three characteres are entered
function autoKeywords() {
  var availableKeyword = [
    "Jazz",
    "Pop Music",
    "Rock",
    "Country",
    "Reggae",
    "Hip Hop",
    "Pop Rock",
    "Blues",
  ];
  $("#user-input").autocomplete({
    source: availableKeyword,
    minLength: 3,
  });
}

// Function to call Ticketmaster API with keyword as query parameter
function getEventByKeyword(userinput) {
  // Variable to house Ticketmaster API key
  var apiKey = "aSqzhWcc1ZxQnMoClqxGxcTRL8GrgFyA";
  // Variable to house Ticketmaster API URL
  var eventsUrl =
    "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
    apiKey +
    "&keyword=" +
    userinput;
  // var eventsUrl ="https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + userinput +"&apikey=" +apiKey;
  fetch(eventsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // If the keyword entered on search box has ticketmaster events available, events' info will be added to page
      if (data.page.totalElements != "0") {
        $(attractions).show();
        for (let i = 0; i < 3; i++) {
          appendEvents(i, i);
          // Saving name of the keyword in local storage according to name available in API (corrected name)
          localStorage.setItem(
            "KeywordCorrectName",
            JSON.stringify(artistName)
          );
          saveSearchedKeyword();
        }
      }
      // If the keyword entered on search box does not have ticketmaster events available, attractions div will keep hidden
      else {
        $(attractions).hide();
      }
      // Function to append on page title, image, date, time, location and link to buy tickets for the event. Class "is-size" is adding size font; class "has-text-warning" is adding font color with Bulma
      function appendEvents(num, index) {
        var cardDisplay =
          `
          <h2 class= "is-size-4 has-text-warning " >` +
          data._embedded.events[index].name +
          `</h2>
          <img src="` +
          data._embedded.events[index].images[0].url +
          `"></img>
          <p class= "is-size-5 "> Date: ` +
          dayjs(data._embedded.events[index].dates.start.dateTime).format(
            "MMM-DD-YYYY"
          ) +
          `</p>
          <p class= "is-size-5"> Time: ` +
          dayjs(data._embedded.events[index].dates.start.dateTime).format(
            "h:mm A"
          ) +
          `</p>
          <p class= "is-size-5">` +
          "Location: " +
          data._embedded.events[index]._embedded.venues[0].name +
          ` </p>
          <a target="_blank" href="` +
          data._embedded.events[index].url +
          `"class= "has-text-weight-bold has-text-danger-dark is-size-4">Purchase Tickets Here</a>
          `;
        $("#attraction-" + num).append(cardDisplay);
        apiSpotifyURL(num);
      }
    });
}

// Function to save in local storage searched keywords
function saveSearchedKeyword() {
  // Get correct keyword name from local storage to add to new array in variable Keywords
  var KeywordCorrectName = JSON.parse(
    localStorage.getItem("KeywordCorrectName")
  );
  if (KeywordCorrectName) {
    var keys = JSON.parse(localStorage.getItem("keys")) || [];
    // Limits number of saved keywords in local storage to 4 by removing the last keyword if more are added
    if (keys.length >= 5) {
      keys.pop();
    }
    // Only saves the keyword name in local storage once (if it is removed from the array per if statemnt above, it can be added to array again); adds it to the beggining of the array
    if (!keys.includes(KeywordCorrectName)) {
      keys.unshift(KeywordCorrectName);
    }
    localStorage.setItem("keys", JSON.stringify(keys));
  }
}

// Function to append searched keywords to keywords  div
function getSearchedKeyword() {
  var keys = JSON.parse(localStorage.getItem("keys")) || [];
  for (let i = 0; i < keys.length; i++) {
    $("#searchedKeywords").append("<li>" + keys[i] + "</li>");
  }
}

// Delete created elements to ensure there are no duplicate appends when elements need to be appended again
function deleteAppends() {
  for (let num = 0; num < 3; num++) {
    $("#attraction-" + num).empty();
  }
  $("#searchedKeywords").empty();
}

// api Query for Spotify to pull URL link
function apiSpotifyURL(num) {
  var client_id = "b8a40684aaf24623a0845d2de7d55422";
  var client_secret = "059928fa94f647a3ad310fbb22d30473";
  //Gets the token for Spotify Oauth
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var spotifyBearerToken = data.access_token;
      //nested fetch to make Spotify api query, using the bearer token previously obtained
      //bearer token will be out of scope and undefined if not not nested here
      fetch(
        "https://api.spotify.com/v1/search?query=" +
          artistName +
          "&type=artist&market=us&limit=10&offset=0",
        {
          headers: { Authorization: `Bearer ${spotifyBearerToken}` },
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //gets artist URL link
          var hrefLink = data.artists.items[0].external_urls;
          //appends spotify link
          $("#attraction-" + num).append(
            '<p><a target="_blank" href="' +
              hrefLink.spotify +
              '" class= "has-text-weight-bold has-text-danger-dark is-size-4">Listen @ Spotify</a></p>'
          );
        });
    });
}
