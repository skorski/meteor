Router.map( function () {
	// this.route('/ideas', {
	// 	data: function() {
	// 	templateData = {ideas: Ideas.find({})};
	// 	return templateData;
	// 	}
	// });

	this.route('home', {path: '/'});

	this.route('ideasList', {path: '/ideas'});

	this.route('/ideas/:_id', {
		name: 'ideaDetail',
		data: function() {
			return Ideas.findOne(this.params._id);
		}
	});
	
})
