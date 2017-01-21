var infowindow, map;

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
    var markers = [];
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
    var viewModel = function() {
        var self = this;
        self.userInput = ko.observable('');
        self.locations = ko.observableArray();
        for(i = 0; i < markers.length; i++) {
          self.locations.push(markers[i])
        }

        	this.filteredItems = ko.computed(function() {
        		var filter = self.userInput().toLowerCase();
        		if (!filter) {
        			self.locations().forEach(function(item){
        				item.setVisible(true);
        			});
        			return self.locations();
        		} else {
        			return ko.utils.arrayFilter(self.locations(), function(item) {
                if (item.name.toLowerCase().indexOf(filter) >= 0) {
                      return item.setVisible(true);
        			};
        		})
        	}}, self);
        }
    ko.applyBindings(viewModel());
}
