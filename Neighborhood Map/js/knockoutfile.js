
var viewModel = function() {
    var self = this;
    self.userInput = ko.observable('');
    self.locations = ko.observableArray([]);
    for(i = 0; i < restaurants.length; i++) {
      self.locations.push(restaurants[i])
    }

    	this.filteredItems = ko.computed(function() {
    		var filter = self.userInput().toLowerCase();
    		if (!filter) {
    			self.locations().forEach(function(item){
    				item.visible(true);
    			});
    			return self.locations();
    		} else {
    			return ko.utils.arrayFilter(self.locations(), function(item) {
    				var string = item.name.toLowerCase();
    				var result = (string.search(filter) >= 0);
    				item.visible(result);
    				return result;
    			});
    		}
    	}, self);
    }
ko.applyBindings(viewModel());
