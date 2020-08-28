console.log('Sanity Check');

//Variable definitions




let sunset= $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');
//Event listener for the searchbar

//https://ridb.recreation.gov/api/v1/Endpoint?parms
//RIDB Ajax request
    //URLs for the navbar
    //General park info
    //Acitivites



//Sunset/sunrise Ajax request
    //Sunrise and sunset times
    //Length of daylight hours
    
//User must input lat and lng and date formatted YYYY-MM-DD
// let queryURL = 'https://api.sunrise-sunset.org/json?lat=' + lat + 'lng=' + lng + 'date=' + date;
let queryURL = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2020-08-28';
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    console.log(response);
    console.log(response.results.sunrise);
    console.log(response.results.sunset);
    console.log(response.results.day_length);
});



