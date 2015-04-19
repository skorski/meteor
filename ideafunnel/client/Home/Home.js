  Template.home.rendered = function (){
   
  }

    Template.Home.events({
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

  Template.Home.helpers({
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