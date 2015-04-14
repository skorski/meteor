if (Meteor.isClient) {

  Template.home.events({
    "click #AddIdea": function (e, tmpl){
      if(Session.get('showAddIdea')){
        Session.set('showAddIdea', false);
      } else {
        Session.set('showAddIdea', true);
      }
    }
  });

  Template.home.helpers({
    showAddIdea: function() {
      return Session.equals('showAddIdea', true);
    },
    addFormClass: function() {
      return "test";
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

  Template.home.rendered = function (){
   
  }

  Template.ideaBlock.helpers({
    ideas: function () {
      return Ideas.find({}, {sort: {votes: -1, createdAt: -1}}).fetch();
    }
  });


  Template.idea.helpers({
    notVoted: function () {
      return true;
    }
  });

  Template.idea.events({
    "click #upvote": function(e){
      console.log(this._id);
      upvoteIdea(this._id);
    }
  })
}
