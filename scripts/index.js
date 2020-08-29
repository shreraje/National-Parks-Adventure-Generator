console.log('Sanity Check');

//Variable definitions




let sunset= $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');
//Event listener for the searchbar
const searchBar = document.getElementById('search');
const formBtn = document.getElementById('btn');
formBtn.addEventListener('click', (e) => {
    console.log(searchBar.value); 
    
});


//https://ridb.recreation.gov/api/v1/Endpoint?parms
//RIDB Ajax request
    //URLs for the navbar
    //General park info
    //Acitivites
    //curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 
    //API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
    //Ex call: https://developer.nps.gov/api/v0/parks?stateCode=DC,MD,VA&fields=images
let stateCode = 'WY';
let queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=5&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
$.ajax({
    url: queryURL1,
    method: 'GET'
}).then(function(response1) {
    console.log(response1);
    //Park description
    console.log(response1.data[0].description);
    //Park activities array
    console.log(response1.data[0].activities);
    //Park directions URL for navbar
    console.log(response1.data[0].directionsURL);
    //National Park Service official site URL
    console.log(response1.data[0].url);
    //Lat long to pass to sunrise/sunset API
    console.log(response1.data[0].latitude);
    console.log(response1.data[0].longitude);
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



