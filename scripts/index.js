console.log('Sanity Check');
//Variable Definitions
let sunset = $('#sunset');
let sunrise = $('#sunrise');
let dayLength = $('#dayLength');
const card1 = $('#card1');
const card2 = $('#card2');
const card3 = $('#card3');
const card4 = $('#card4');


//Event listener for the searchbar
const searchBar = document.getElementById('search');
const formBtn = document.getElementById('btn');
formBtn.addEventListener('click', (e) => {
    let stateCode = searchBar.value.toUpperCase();
    if(stateCode.length > 3 || stateCode.length < 2 || isNaN(stateCode) === false) {
        $('div.verify').text('Please enter a valid state code! e.g. NY, CA, FL').attr('class', 'error');
    } 
    else {
    getInfo(stateCode);
    $('div.verify').empty();
    };
});
    

//API Key: CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv
//National Park Service Ajax call. Function is attached to searchbar event listener
function getInfo(stateCode) {
    let queryURLNPS = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=5&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
    $.ajax({
        url: queryURLNPS,
        method: 'GET'
    }).then(function(response1) {
        console.log(response1);
        
        //cardID array references items in HTML to append cards to
        cardID = [card1, card2, card3, card4];
        //imageID array creates a unique ID for each image on the cards
        imageID = ['cardimg1', 'cardimg2', 'cardimg3', 'cardimg4'];
        //parkID gives each park name span a unique ID
        parkID = ['parkName1', 'parkName2', 'parkName3', 'parkName4'];
        //infoID gives each information section a unqiue ID
        infoID = ['info1', 'info2', 'info3', 'info4'];
        //fetchData attributes determines where info is pulled from the NPS API object
        fetchData = [response1.data[0], response1.data[1], response1.data[2], response1.data[3]];

        //Empty content so new items can be placed
        card1.empty();
        card2.empty();
        card3.empty();
        card4.empty();

        //Loop to dynamically generate multiple cards
        for (i = 0; i < cardID.length; i++) {
        //Appends to the div class=card Section 1
        let imgDiv = $('<div>').attr('class', 'card-image');
        let newImg = $('<img>').attr('id', imageID[i]).attr('src', fetchData[i].images[0].url).attr('alt', fetchData[i].images[0].altText);
        let newSpan = $('<span>').attr('id', parkID[i]).attr('class', 'card-title').text(fetchData[i].fullName);
        //Section 2
        let cardDiv = $('<div>').attr('class', 'card-content');
        let para = $('<p>').attr('id', infoID[i]).text(fetchData[i].description);
        //Section 3
        let actionDiv = $('<div>').attr('class', 'card-action');
        let infoBtn = $('<button>').attr('class', 'waves-effect waves-light btn teal darken-4 cardBtn').attr('data-parkCode', fetchData[i].parkCode).text('Get more info!');
        //Append contents to div for each section
        let section1 = imgDiv.append(newImg).append(newSpan);
        let section2 = cardDiv.append(para);
        let section3 = actionDiv.append(infoBtn);
        //Append sections to the cards in the HTML
        cardID[i].append(section1).append(section2).append(section3);
        };       
    });
};


//moreInfo will trigger when the user clicks the button on the cards and generate info specifically for the given park
function moreInfo(parkCode) {
    let queryURLpark = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&stateCode=&limit=5&sort=&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
    $.ajax({
        url: queryURLpark,
        method: 'GET'
    }).then(function(response2) {
        console.log(response2);

        // Sunrise/Sunset Ajax call. Takes parameters from NPS API
        let lat = response2.data[0].latitude;
        let lng = response2.data[0].longitude;
        let date = moment().format('YYYY-MM-DD');
        let queryURLSunrise = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=' + date;
        $.ajax({
            url: queryURLSunrise,
            method: 'GET'
        }).then(function (response4) {
            console.log(response4);
        });
    });
};

//Event listener for card buttons to generate further information
$('.card').on('click', ".cardBtn", function(event) {
    console.log(event.currentTarget.dataset.parkcode);
    let parkCode = event.currentTarget.dataset.parkcode;
    moreInfo(parkCode);
});


// Footer and leaving comments

let commentBox = document.getElementById('comments');
$('#buttonTwo').on("click",function(event){
    console.log(commentBox.value)
    localStorage.setItem("comment box", commentBox.value)
});


// Air quality & Weather Information
$("button").on("click", function(event) {
    event.preventDefault();
    var APIkey = "8ee94bd2-5afc-4e57-825a-4e87cde01a7e";
    var city = $("#city").val();
    var state = $("#state").val();
    console.log(city);
    var queryURLAir = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=USA&key=" + APIkey;

    $.ajax({
        url: queryURLAir,
        method: 'GET'
    }).then(function(response3) {
        console.log(response3);
        console.log(response3.data.current.pollution.aqius);

        // Transferring content to HTML for current day 
        $(".city").text(response3.data.city );
        $(".date").html("Date:   " + response3.data.current.pollution.ts);
        $(".air-pollution").html("Air Quality Index (US EPA standard):   " + response3.data.current.pollution.aqius);
        $(".temp").html("Temperature (°C):   " + response3.data.current.weather.tp);
        $(".atm-pressure").html("Atmospheric Pressure (hPa):   " + response3.data.current.weather.pr);
        $(".humidity").html("Humidity (%):   " + response3.data.current.weather.hu);
        $(".wind").html("Wind Speed (m/s):   " + response3.data.current.weather.ws);
        $(".wind-direction").html("Wind Direction (as an angle of 360° (N=0, E=90, S=180, W=270):   " + response3.data.current.weather.wd);

    });
});

