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
            var match = item.name.toLowerCase().indexOf(filter) >= 0
                  item.setVisible(match);
                  return match;
        })
      }}, self);
    }
