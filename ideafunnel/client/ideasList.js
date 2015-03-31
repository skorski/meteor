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
    }
  });



  Template.commentRender.helpers({
    showNestedComment: function() {
      return Session.equals('selectedComment', this._id);
    },
    nestedCommentID: function() {
      return this._id;
    },
    comments: function(parentComment){
      if(parentComment) {
        return Comments.find({ideaId: parentComment}).fetch();
      } else
        return Comments.find({ideaId: this._id});
    },
    id: function(){
      return this._id;
    }
  });

  Template.commentRender.events({
    'click #add-nested-comment': function(event, tmpl) {
      Session.set('selectedComment', this._id);
    },
    'submit .new-detail-comment': function (event) {
      var text = event.target.detailedcomment.value;

      Meteor.call('addComment', text, this._id);
      event.target.detailedcomment.value = "";
      Session.set('selectedComment', '1');
      return false;
    }
  });

}
