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
    "click #submitNewIdea": function (e, tmpl){
      var idea = document.getEleementByID('newIdeaText');
      console.log("Adding idea ", idea);
      Meteor.call('createIdea', idea);
    }
  })

  Template.home.rendered = function (){
    $(this.firstNode).animate({opacity:1, top:0}, 1000);
    console.log("render event");
    $('div.addIdeaForm').on('click', function() {
      console.log('addIdeaClicked');
    });
  }

  Template.ideaBlock.helpers({
    ideas: function () {
      return Ideas.find({}, {sort: {votes: -1, createdAt: -1}}).fetch();
    }
  });
}
