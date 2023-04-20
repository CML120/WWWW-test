$(document).ready(function () {
  // Hiding div with attractions card because there are no events to show
  $(attractions).hide();
  getSearchedKeyword();

  // Function to when the search button is clicked
  $("#searchBtn").click(function (e) {
    e.preventDefault();
    deleteAppends();

    if ($("#cities").val() == "") {
      $(attractions).hide();
      getSearchedKeyword();
    } else {
      var userinput = $("#cities").val();
      getEventByKeyword(userinput);
      getSearchedKeyword();
    }
  });
  // Function to when any li (previous searched cities) is clicked
  $(document).on("click", "li", function (e) {
    e.preventDefault();
    deleteAppends();
    // Saving clicked city into variable to be passed into function that gets events info for city searched and shows previous searched cities if any
    var userinput = $(this).text();
    getEventByKeyword(userinput);
    getSearchedKeyword();
  });
});

// Function to show suggested city names on searched box when at least three characteres are entered
function autoKeywords() {
  var availableKeyword = ["saint paul", "minneapolis"];
  $("#cities").autocomplete({
    source: availableKeyword,
    minLength: 3,
  });
}

// Function to call Ticketmaster API with city as query parameter
function getEventByKeyword(keyword) {
  // Variable to house Ticketmaster API key
  var apiKey = "aSqzhWcc1ZxQnMoClqxGxcTRL8GrgFyA";
  // Variable to house Ticketmaster API URL
  // var eventsUrl ="https://app.ticketmaster.com/discovery/v2/events?city=" +city +"&apikey=" +apiKey;
  var eventsUrl =
    "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
    apiKey +
    "&keyword=" +
    keyword;

  fetch(eventsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // If the city entered on search box has ticketmaster events available, events' info will be added to page
      if (data.page.totalElements != "0") {
        $(attractions).show();
        for (let i = 0; i < 3; i++) {
          appendEvents(i, i);
          // Saving name of the city in local storage according to name available in API (corrected name)
          localStorage.setItem(
            "CityCorrectName",
            JSON.stringify(
              data._embedded.events[0]._embedded.venues[0].city.name
            )
          );
          saveSearchedKeyword();
        }
      }
      // If the city entered on search box does not have ticketmaster events available, attractions div will keep hidden
      else {
        $(attractions).hide();
      }
      // Function to append on page title, image, date, time, location and link to buy tickets for the event. Class "is-size" is adding size font; class "has-text-warning" is adding font color with Bulma
      function appendEvents(num, index) {
        $("#attraction-" + num).append(
          '<h2 class= "is-size-4 has-text-warning " >' +
            data._embedded.events[index].name +
            "</h2>"
        );
        $("#attraction-" + num).append(
          "<img src='" +
            data._embedded.events[index].images[0].url +
            "' ></img>"
        );
        $("#attraction-" + num).append(
          '<p class= "is-size-5 ">' +
            "When? " +
            dayjs(data._embedded.events[index].dates.start.dateTime).format(
              "MMM-DD-YYYY"
            ) +
            "</p>"
        );
        $("#attraction-" + num).append(
          '<p class= "is-size-5">' +
            "What time? " +
            dayjs(data._embedded.events[index].dates.start.dateTime).format(
              "h:mm A"
            ) +
            "</p>"
        );
        $("#attraction-" + num).append(
          '<p class= "is-size-5">' +
            "Where? " +
            data._embedded.events[index]._embedded.venues[0].name +
            "</p>"
        );
        $("#attraction-" + num).append(
          '<a target="_blank" href="' +
            data._embedded.events[index].url +
            '" class= "has-text-weight-bold has-text-danger-dark is-size-4">Spotify</a>'
        );
      }
    });
}

// Function to save in local storage searched cities
function saveSearchedKeyword() {
  // Get correct city name from local storage to add to new array in variable cities
  var CityCorrectName = JSON.parse(localStorage.getItem("CityCorrectName"));
  if (CityCorrectName) {
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    // Limits number of saved cities in local storage to 4 by removing the last city if more are added
    if (cities.length >= 5) {
      cities.pop();
    }
    // Only saves the city name in local storage once (if it is removed from the array per if statemnt above, it can be added to array again); adds it to the beggining of the array
    if (!cities.includes(CityCorrectName)) {
      cities.unshift(CityCorrectName);
    }
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

// Function to append searched cities to searchedCities div
function getSearchedKeyword() {
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  for (let i = 0; i < cities.length; i++) {
    $("#searchedCities").append("<li>" + cities[i] + "</li>");
  }
}

// Delete created elements to ensure there are no duplicate appends when elements need to be appended again
function deleteAppends() {
  for (let num = 0; num < 3; num++) {
    $("#attraction-" + num).empty();
  }
  $("#searchedCities").empty();
}
