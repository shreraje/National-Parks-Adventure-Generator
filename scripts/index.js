console.log('Sanity Check');

//Variable definitions


//Event listener for the searchbar

//https://ridb.recreation.gov/api/v1/Endpoint?parms
//RIDB Ajax request
    //URLs for the navbar
    //General park info
    //Acitivites
    //curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 
    //API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
    //Ex call: https://developer.nps.gov/api/v0/parks?stateCode=DC,MD,VA&fields=images
let activity = 'hiking';
let queryURL1 = 'https://developer.nps.gov/api/v1/activities?q=' + activity + '&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
$.ajax({
    url: queryURL1,
    method: 'GET'
}).then(function(response1) {
    console.log(response1)
});


//Sunset/sunrise Ajax request
    //Sunrise and sunset times
    //Length of daylight hours
    
    //User must input lat and lng and date formatted YYYY-MM-DD
    // let queryURL = 'https://api.sunrise-sunset.org/json?lat=' + lat + 'lng=' + lng + 'date=' + date;
// $.ajax({
//     url: queryURL,
//     method: 'GET'
// }).then(function(response) {
//     console.log(response);

// });


