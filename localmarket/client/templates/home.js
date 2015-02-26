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

  openTasks: function() {
    console.log('Tried to render openTasks');
    return Tasks.find({}, {sort: {createdAt: -1}});
  }
});


Template.home.events({
  'submit .new-task': function(event) {
    var text = event.target.text.value;
    console.log('trying to add ' + text);
    Meteor.call('addTask', text);
    event.target.text.value = "";
    return true;
  }
});