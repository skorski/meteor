Template.CommentBox.events({
   'submit #add-new-comment': function (event) {
      var text = event.target.comment.value;
      Meteor.call('addComment', text, this._id);
      event.target.comment.value = "";
      Session.set('showAddIdea', false);
      return false;
    },
    'click #save-new-comment': function(event){
    	console.log('new detail comment');
      var text = document.getElementById('comment-box-input').value;
      console.log(event.target.value);
      Meteor.call('addComment', text, event.target.value);
      document.getElementById('comment-box-input').value = "";
      Session.set('selectedComment', '1');
      return false;
    }
});    

Template.CommentBox.helpers({
    showNestedComment: function() {
      return Session.equals('selectedComment', this._id);
    },
    comments: function(parentComment){
      if(parentComment) {
        return Comments.find({ideaId: parentComment}).fetch();
      } else
        return Comments.find({ideaId: this._id});
    }
  });


Template.CommentRender.helpers({
    showNestedComment: function() {
      return Session.equals('selectedComment', this._id);
    },
    comments: function(parentComment){
      if(parentComment) {
        return Comments.find({ideaId: parentComment}).fetch();
      } else
        return Comments.find({ideaId: this._id});
    }
  });

Template.CommentRender.events({
    'click #add-nested-comment': function(event, tmpl) {
      console.log(this._id);
      Session.set('selectedComment', this._id);
    },
    'click #removeComment': function(event) {
      {
        Meteor.call('removeComment', this._id);
      } 
    }
})


Template.registerHelper('log', function(a){
	console.log(a);
})
