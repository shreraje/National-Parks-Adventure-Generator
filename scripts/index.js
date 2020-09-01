console.log('Sanity Check');

//Variable definitions




// let sunset= $('#sunset');
// let sunrise = $('#sunrise');
// let dayLength = $('#dayLength');
// //Event listener for the searchbar

// //https://ridb.recreation.gov/api/v1/Endpoint?parms
// //RIDB Ajax request
//     //URLs for the navbar
//     //General park info
//     //Acitivites
//     //curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 
//     //API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
//     //Ex call: https://developer.nps.gov/api/v0/parks?stateCode=DC,MD,VA&fields=images
// let stateCode = 'WY';
// let queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=5&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
// $.ajax({
//     url: queryURL1,
//     method: 'GET'
// }).then(function(response1) {
//     console.log(response1);
//     //Park description
//     console.log(response1.data[0].description);
//     //Park activities array
//     console.log(response1.data[0].activities);
//     //Park directions URL for navbar
//     console.log(response1.data[0].directionsURL);
//     //National Park Service official site URL
//     console.log(response1.data[0].url);
//     //Lat long to pass to sunrise/sunset API
//     console.log(response1.data[0].latitude);
//     console.log(response1.data[0].longitude);
// });


// // Sunset/sunrise Ajax request
// //     Sunrise and sunset times
// //     Length of daylight hours
    
// //     User must input lat and lng and date formatted YYYY-MM-DD
//     let queryURL = 'https://api.sunrise-sunset.org/json?lat=' + lat + 'lng=' + lng + 'date=' + date;
// // $.ajax({
// //     url: queryURL,
// //     method: 'GET'
// // }).then(function(response) {
// //     console.log(response);
    
// // });


// // Air quality
console.log("Hello World");
$("button").on("click", function(event) {
    event.preventDefault();
    console.log("Hello World");

    var APIkey = "8ee94bd2-5afc-4e57-825a-4e87cde01a7e";
    // let lat = 35.9;
    // let lon = 140;
    var city = $("#city").val();
    var state = $("#state").val();
    console.log(city);
    // country = 'USA'
    var queryURL2 = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=USA&key=" + APIkey;
    // var queryURL3 = "https://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lon + "&key=" + APIkey
    // http://api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}
    
    $.ajax({
        url: queryURL2,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        console.log(response.data.current.pollution.aqius);

        // Transferring content to HTML for current day 
        $(".city").text(response.data.city );
        $(".date").html("Date:   " + response.data.current.pollution.ts);
        $(".air-pollution").html("Air Quality Index:   " + response.data.current.pollution.aqius);

        
    });
});




// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=11I6mpmjYcNATrYObpRJDakmAIijHCsWb475e60h