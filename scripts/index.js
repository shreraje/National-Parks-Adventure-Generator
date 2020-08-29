console.log('Sanity Check');
//Variable definitions
let sunset = $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');

//Event listener for the searchbar
const searchBar = document.getElementById('search');
const formBtn = document.getElementById('btn');
formBtn.addEventListener('click', (e) => {
    console.log(searchBar.value); 
    
});




//API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
let stateCode = 'WY';
let queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=5&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
$.ajax({
    url: queryURL1,
    method: 'GET'
}).then(function (response1) {
    console.log(response1);
    //Park name
    console.log(response1.data[0].fullName);
    //Park description
    console.log(response1.data[0].description);
    //Park activities array
    console.log(response1.data[0].activities);
    //Park directions URL for navbar
    console.log(response1.data[0].directionsURL);
    //National Park Service official site URL
    console.log(response1.data[0].url);
    //Lat long to pass to sunrise/sunset API
    //These parameters will be passed to the sunrise sunset API to retrieve that data set
    console.log(response1.data[0].latitude);
    console.log(response1.data[0].longitude);
    //Contact information for park
    console.log(response1.data[0].phoneNumbers);
    console.log(response1.data[0].emailAddresses);
    //Park weather overview
    console.log(response1.data[0].weatherInfo);

    //Sunset/sunrise Ajax request  
    //User must input lat and lng and date formatted YYYY-MM-DD
    //Must be placed within the NPS API in order to retrieve the latitude and longitude parameters
    let lat = response1.data[0].latitude;
    let lng = response1.data[0].longitude;
    let date = moment().format('YYYY-MM-DD');
    let queryURL2 = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=' + date;
    console.log(queryURL2);
    $.ajax({
        url: queryURL2,
        method: 'GET'
    }).then(function (response2) {
        console.log(response2);
    });
    
    //Loop or function to append information to cards on the HTML
    //Links or buttons on the cards that will display full park information to the user?
});




