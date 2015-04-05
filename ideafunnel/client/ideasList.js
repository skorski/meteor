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
      console.log(this._id);
      // refactored function because of nesting. Item runs twice with nest and will hide the comment on the second pass.
      Session.set('selectedComment', this._id);
      // if(Session.equals('selectedComment', this._id)) {
      //   // here we set it to a different value to hide the text box
      //   console.log("Same button selected. Setting id =1");
      //   Session.set('selectedComment','1');
      // } else {
      //   console.log("different box selected, setting to: ", this._id);
      //   Session.set('selectedComment', this._id);
      // }
    },
    'click #removeComment': function(event) {
     // if(confirm("Are you sure you want to delete this comment"))
      {
        Meteor.call('removeComment', this._id);
      } 
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
