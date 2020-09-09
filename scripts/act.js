//Pull parkCode from local storage to run moreInfo function
let parkCode = localStorage.getItem('code');

//Creates general info for the cards, full activity list, and entrance fees collection
let queryURLpark = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&stateCode=&limit=5&sort=&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
$.ajax({
    url: queryURLpark,
    method: 'GET'
}).then(function (response2) {

    // Transferring content to HTML for current day surise, sunset & day-length
    $(".weather-snippet").text(response2.data[0].weatherInfo);

    // Sunrise/Sunset Ajax call. Takes parameters from NPS API
    let lat = response2.data[0].latitude;
    let lng = response2.data[0].longitude;
    let date = moment().format('YYYY-MM-DD');
    let queryURLSunrise = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=' + date;
    $.ajax({
        url: queryURLSunrise,
        method: 'GET'
    }).then(function (response4) {

        // Transferring content to HTML for current day surise, sunset & day-length
        $(".sunrise").text("Sunrise:  " + response4.results.sunrise);
        $(".sunset").text("Sunset:  " + response4.results.sunset);
        $(".day-length").text("Day Length:  " + response4.results.day_length);
    });

    //Generate info for park contacts card
    $('#phone').text('Phone:' + ' ' + response2.data[0].contacts.phoneNumbers[0].phoneNumber + ' ' + 'Ext.' + ' ' + response2.data[0].contacts.phoneNumbers[0].extension);
    $('#email').text('Email:' + ' ' + response2.data[0].contacts.emailAddresses[0].emailAddress);
    $('#address1').text(
        'Mailing address: ' + response2.data[0].addresses[0].line1 + ' ' +
        response2.data[0].addresses[0].city + ' ' +
        response2.data[0].addresses[0].stateCode
    );
    $('#address2').text(
        'Physical address: ' + response2.data[0].addresses[1].line1 + ' ' +
        response2.data[0].addresses[1].city + ' ' +
        response2.data[0].addresses[1].stateCode
    );

    //Generate info for park general info card
    let advisory = $('<p>').text(response2.data[0].operatingHours[0].description);
    $('#advisory').append(advisory);
    $('#park-site').attr('href', response2.data[0].url);

    //Generate info for directions card
    $('#directions').text(response2.data[0].directionsInfo);
    $('#directionsurl').attr('href', response2.data[0].directionsUrl);

    //List all activities within the proper collection
    for (i = 0; i < response2.data[0].activities.length; i++) {
        let item = $('<li>').attr('class', 'collection-item').addClass('activity').text(response2.data[0].activities[i].name);
        $('#activity-header').append(item);
    };

    //List all entrance fees within the proper collection 
    for (i = 0; i < response2.data[0].entranceFees.length; i++) {
        let newItem = $('<li>').attr('class', 'collection-item').text('$' + response2.data[0].entranceFees[i].cost + ' ' + response2.data[0].entranceFees[i].description);
        $('#fees-header').append(newItem);
    };
});

//This ajax call will create activity suggestions for the user alongside the full activity list
let queryActive = 'https://developer.nps.gov/api/v1/thingstodo?parkCode=' + parkCode + '&limit=3&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
$.ajax({
    url: queryActive,
    method: 'GET'
}).then(function (response5) {

    let dataSelect = [response5.data[0], response5.data[1], response5.data[2]];
    for (i = 0; i < dataSelect.length; i++) {
        $('<h3>').text(dataSelect[i].title).css('text-decoration', 'underline').appendTo($('.recommended'));
        $('.recommended').append(dataSelect[i].shortDescription);
        $('<p>').text('Duration: ' + dataSelect[i].duration).appendTo($('.recommended'));
    };
});