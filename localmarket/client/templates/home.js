var FEATURED_COUNT = 4;

Template.home.helpers({
  // selects FEATURED_COUNT number of recipes at random
  featuredRecipes: function() {
    var recipes = _.values(RecipesData);
    var selection = [];
    
    for (var i = 0;i < FEATURED_COUNT;i++)
      selection.push(recipes.splice(_.random(recipes.length - 1), 1)[0]);

    return selection;
  },
  
  activities: function() {
    return Activities.latest();
  },
  
  latestNews: function() {
    return News.latest();
  },

  nextTask: function() {
    return Tasks.mostWanted();
  }
});

Template.home.events({
  'submit .new-task': function(event) {
    var text = event.target.text.value;
    Meteor.call('addTask', text);
    event.target.text.value = "";

    // this is where the return false needs to be otherwise the page will reload
    return false;
  },
  'submit .new-beverage': function(event) {
    var text = event.target.text.value;
    event.target.text.value = "";
    return false;
  }
});
