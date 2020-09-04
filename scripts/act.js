console.log('act.js working');

let parkCode = localStorage.getItem('code');
console.log(parkCode);

//moreInfo will generate info specifically for the given park
function moreInfo() {
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

        //Generate activities in the list on second HTML page
        for (i = 0; i < response2.data[0].activities.length; i++) {
            let item = $('<li>').attr('class', 'collection-item').text(response2.data[0].activities[i].name);
            $('#list-header').append(item);
        };
    });
};

moreInfo();