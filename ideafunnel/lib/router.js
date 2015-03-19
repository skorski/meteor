Router.map( function () {

	this.route('home', {path: '/'});

	this.route('ideasList', {path: '/ideas'});

	this.route('/ideas/:_id', {
		name: 'ideaDetail',
		data: function() {
			return Ideas.findOne(this.params._id);
		}
	});
	
})

