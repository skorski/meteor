if (Meteor.isClient) {

  Template.IdeaDetail.helpers({
    id: function () {
      return this._id;
    },
    idea: function() {
      return Ideas.find({_id: this._id}).fetch();
    },
    comments: function() {
        return Comments.find({ideaId: this._id}).fetch();
    },
    ideaDescriptionEdit: function(){
      return Session.equals(ideaDescriptionEdit, true);
    },
    expandComments: function(arg){
      console.log('arg ', arg);
      return false;
    },
    showMainComment: function() {
      return Session.equals('showAddIdea', true);
    }
  });

  Template.IdeaDetail.events({
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



  Template.IdeaDescription.helpers({
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

  Template.IdeaDescription.events({
    'click #description-text': function(){
      Session.set('ideaDescriptionInput', true);
    },
    'click #edit-description': function() {
      Session.set('ideaDescriptionInput', true);
    },
    'submit .change-description': function(e) {
      description = document.getElementsByName('idea-description-input')[0].value;
      Meteor.call('updateDescription', this._id, description);
      Session.set('ideaDescriptionInput', false);
      return false;
     }
  });

}