console.log('Sanity Check');

//Variable definitions
let sunset = $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');
const card1 = $('#card1');
const card2 = $('#card2');
const card3 = $('#card3');
const card4 = $('#card4');

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

        //Loop to dynamically generate multiple cards
        //cardID array references items in HTML to append cards to
        cardID = [card1, card2, card3, card4];
        //imageID array creates a unique ID for each image on the cards
        imageID = ['cardimg1', 'cardimg2', 'cardimg3', 'cardimg4'];
        //parkID gives each park name span a unique ID
        parkID = ['parkName1', 'parkName2', 'parkName3', 'parkName4'];
        //infoID gives each information section a unqiue ID
        infoID = ['info1', 'info2', 'info3', 'info4'];
        //data[i] attributes determines where info is pulled from the NPS API
        fetchData = [response1.data[0], response1.data[1], response1.data[2], response1.data[3]];

        for (i = 0; i < cardID.length; i++) {
        //Appends to the div class=card Section 1
        let imgDiv = $('<div>').attr('class', 'card-image');
        let newImg = $('<img>').attr('id', imageID[i]).attr('src', fetchData[i].images[0].url);
        let newSpan = $('<span>').attr('id', parkID[i]).attr('class', 'card-title').text(fetchData[i].fullName);
        //Section 2
        let cardDiv = $('<div>').attr('class', 'card-content');
        let para = $('<p>').attr('id', infoID[i]).text(fetchData[i].description);
        //Section 3
        let actionDiv = $('<div>').attr('class', 'card-action');
        let infoBtn = $('<button>').text('Get more info!');
        //Append contents to div for each section
        let section1 = imgDiv.append(newImg).append(newSpan);
        let section2 = cardDiv.append(para);
        let section3 = actionDiv.append(infoBtn);
        //Append sections to the cards in the HTML
        cardID[i].append(section1).append(section2).append(section3);
        }
    });
};
getInfo();

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