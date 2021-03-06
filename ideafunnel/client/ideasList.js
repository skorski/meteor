if (Meteor.isClient) {

  Template.ideaDetail.helpers({
    id: function () {
      return this._id;
    },
    idea: function() {
      return Ideas.find({_id: this._id}).fetch();
    },
    comments: function(parentComment) {
      if(parentComment) {
        return Comments.find({ideaId: parentComment}).fetch();       
      }
    },
    expandComments: function(arg){
      console.log('arg ', arg);
      return false;
    },
    showMainComment: function() {
      return Session.equals('showAddIdea', true);
    }
  });

  Template.ideaDetail.events({
     'submit .new-comment': function (event) {
      var text = event.target.comment.value;
      Meteor.call('addComment', text, this._id);
      event.target.comment.value = "";
      Session.set('showAddIdea', false);
      return false;
    },
    'click #add-comment-show': function(event, tmpl) {
      if(Session.get('showAddIdea')){
        Session.set('showAddIdea', false);
      } else {
        Session.set('showAddIdea', true);        
      }
    },
    'mouseenter #idea-description-main': function() {
      Session.set('ideaDescriptionEdit', true);
    },
    'mouseleave #idea-description-main': function() {
      Session.set('ideaDescriptionEdit', false);
    }
  });


  Template.ideaDescription.helpers({
    ideaDescriptionEdit: function() {
      return Session.equals('ideaDescriptionEdit', true);
    },
    description: function(){
      return Ideas.findOne({_id: this._id}).description;
    },
    ideaDescriptionInput: function(){
      return Session.equals('ideaDescriptionInput', true);
    }

  });

  Template.ideaDescription.events({
    'click #description-text': function(){
      Session.set('ideaDescriptionInput', true);
    },
    'click #edit-description': function() {
      Session.set('ideaDescriptionInput', true);
    },
    'click #cancel-description': function() {
      Session.set('ideaDescriptionInput', false);
    },
    'submit .change-description': function(e) {
      description = document.getElementsByName('idea-description-input')[0].value;
      Meteor.call('updateDescription', this._id, description);
      Session.set('ideaDescriptionInput', false);
      return false;
     }
  });
}
