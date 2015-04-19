  Template.HeaderBar.events({
      "click #Login": function (e, tmpl){
      if(Session.get('showLogin')){
        Session.set('showLogin', false);
      } else {
        Session.set('showLogin', true);
      }
    },
    "click #add-new-idea": function (e){
      var idea = document.getElementById('headerNewIdeaText').value;
      Meteor.call('createIdea', idea);
      document.getElementById('headerNewIdeaText').value = ""
      return false;
    }
  });

  Template.HeaderBar.helpers({
    showAddIdea: function() {
      return Session.equals('showAddIdea', true);
    }
  });