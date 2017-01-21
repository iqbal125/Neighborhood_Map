var infowindow, map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.623245,
            lng: -122.411272
        },
        zoom: 16
    });
    var currentMarker = null
    infowindow = new google.maps.InfoWindow()

    for (i = 0; i < restaurants.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(restaurants[i].coordinates),
            animation: google.maps.Animation.DROP,
            map: map,
            id: restaurants[i].fourSquareVenueID,
            name: restaurants[i].name
        });
        markers.push(marker);
        marker.addListener('click', (function(marker) {
            return function() {
                fsrequest(marker);
                if (currentMarker) currentMarker.setAnimation(null);
                currentMarker = marker;
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        })(marker))
    }

    ko.applyBindings(viewModel());
}
