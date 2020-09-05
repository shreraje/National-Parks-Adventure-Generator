//Pull parkCode from local storage to run moreInfo function
let parkCode = localStorage.getItem('code');

//moreInfo will generate info specifically for the given park
function moreInfo() {
    let queryURLpark = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&stateCode=&limit=5&sort=&api_key=CIOegTmdfiM4Yf3b17p4OpcSRxRf0G6lZ4pgTuOv';
    $.ajax({
        url: queryURLpark,
        method: 'GET'
    }).then(function(response2) {
        console.log(response2);

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

            console.log("Sunrise:  " + response4.results.sunrise);
            console.log("Sunset:  " + response4.results.sunset);
            console.log("Day Length:  " + response4.results.day_length);
        });

        //Generate info for park contacts card
        $('#phone').text('Phone:' + ' ' + response2.data[0].contacts.phoneNumbers[0].phoneNumber + ' ' + 'Ext.' + ' ' + response2.data[0].contacts.phoneNumbers[0].extension);
        $('#email').text('Email:' + ' ' + response2.data[0].contacts.emailAddresses[0].emailAddress);
        $('#directions').attr('href', response2.data[0].directionsUrl);

        //Generate info for park general info card
        let advisory = $('<p>').text(response2.data[0].operatingHours[0].description);
        $('#advisory').append(advisory);
        $('#park-site').attr('href', response2.data[0].url);

        //List all activities within the proper collection
        for (i = 0; i < response2.data[0].activities.length; i++) {
            let item = $('<li>').attr('class', 'collection-item').text(response2.data[0].activities[i].name);
            $('#activity-header').append(item);
        };

        //List all entrance fees within the proper collection 
        for (i = 0; i < response2.data[0].entranceFees.length; i++) {
            let newItem = $('<li>').attr('class', 'collection-item').text('$' + response2.data[0].entranceFees[i].cost + ' ' + response2.data[0].entranceFees[i].description);
            $('#fees-header').append(newItem);
        };
    });
};

moreInfo();