if (Meteor.isClient) {

  Template.IdeaFunnel.events({
    "click #AddIdea": function (e, tmpl){
      if(Session.get('showAddIdea')){
        Session.set('showAddIdea', false);
      } else {
        Session.set('showAddIdea', true);
      }
    },
      "click #Login": function (e, tmpl){
      if(Session.get('showLogin')){
        Session.set('showLogin', false);
      } else {
        Session.set('showLogin', true);
      }
    }
  });

  Template.IdeaFunnel.helpers({
    showAddIdea: function() {
      return Session.equals('showAddIdea', true);
    },
    addFormClass: function() {
      return "test";
    },
    showLogin: function() {
      return Session.equals('showLogin', true);
    }

  });

  Template.addIdeaForm.events({
    "click #submitNewIdea": function (e){
      var idea = document.getElementById('newIdeaText').value;
      Meteor.call('createIdea', idea);
      document.getElementById('newIdeaText').value = ""
      return false;
    }
  });



}
