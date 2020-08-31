console.log('Sanity Check');

//Variable definitions
let sunset = $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');

//Event listener for the searchbar
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
// });


//API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
//National Park Service Ajax call
function getInfo(stateCode) {
    stateCode = 'WY';
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

        //Sunrise/Sunset Ajax call. Takes parameters from NPS API
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
        let parkname = $('#park-name');
        let info = $('#park-info');
        let cardImage = $('#card-image');
        parkname.text(response1.data[0].fullName);
        info.text(response1.data[0].description);
        cardImage.attr('src', response1.data[0].images[0].url);
        //Links or buttons on the cards that will display full park information to the user?
    });
};

// Air quality
var APIkey = "8ee94bd2-5afc-4e57-825a-4e87cde01a7e";
var state = 'Washington'
// country = 'USA'
var queryURL2 = "https://api.airvisual.com/v2/cities?state=" + state + "&country=USA" + "&key=" + APIkey;



$.ajax({
    url: queryURL2,
    method: 'GET'
}).then(function(response) {
    console.log(response);
    console.log(response.data[70].city);
    console.log(response.data[110].city);

});
// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=11I6mpmjYcNATrYObpRJDakmAIijHCsWb475e60h