console.log('Sanity Check');

//Variable definitions


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
    let queryURL = 'https://api.sunrise-sunset.org/json?lat=' + lat + 'lng=' + lng + 'date=' + date;
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    console.log(response);

});


