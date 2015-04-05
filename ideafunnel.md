Meteor Presentation MD

# The ideafunnel
This is a simple concept where users can log in to post ideas.  We will create an app that will allow a registered user to post an idea, add a description, post comments, and upvote an idea.

0) why meteor?
	- All real time and reactive
	- Uses 100% javascript
	

1) Create the meteor package
meteor create ideafunnel

This will start the download for the basic meteor app.

2) Create some folders so we stay organized
./client <- client code / top level js+html
./client/view/ <- templates and js for specific pages
./public <- static files to be served
./server <- files taht should only run on the server
./lib <- common code for client and server

3) Create a collection
	We know that we are going to be capturing ideas...
	
	Do this in the ideas.js file in ./lib

	- start by creating the collection to store ideas
	Ideas = New Mongo.Collection('ideas')

	Ideas.allow({

		insert(true)

		update(true)

		remove(true)

		})

	While in this file we need to define a few methods so we can add information to the DB

	createIdea, deleteIdea, upvoteIdea

	At this point we will save the file.  It will be ready for us to use on our first page.


4) Create a basic page
	a) Start simple, lets render a page
			move all default files into the client folder.  This means the code will only run client side.
			- clean up the code because this now won't run server side code.
			- add a new h1 tag for awesome ideas
	
		deploy to our test space
				meteor deploy ideafunnel.meteor.com
			- notice meteor is handeling everything for us at this point.  It even minifies all of the code.


5) Create a form so people can submit ideas.
	a) again, we are going to start simple.  Let's do what meteor does best, reuse code.
			autoform is a popular package that will help us generate forms
			meteor add aldeed:autoform
			https://atmospherejs.com/aldeed/autoform
		show where the package shows up (.meteor/packages)
			for this to work we will also need to give it some information on the data
					meteor add aldeed:collection2
				go back to the .js file to define a basic schema
					Ideas.attachSchema

		Now two other things:
				- create something to render the ideas
						- this has to be a template with each
				- add a helper to render all of the current ideas

6) At this point we have a very basic setup
	- lets add some routes so things can make a bit more sense

	- install iron router
		- http://www.manuel-schoebel.com/blog/iron-router-tutorial
		- meteor.add iron:router
	- add the router.js file into /lib
	- router fields to show details of each idea
	- Now we have routes and a detail page for each of the ideas.

7) styling
	- Meteor was built for rapid prototyping.  We can also do amazing things for styling
	- Implementing bootstrap
	- add the packages
		- add less
			- 'meteor add less'
		- add bootstrap
			- 'meteor add nemo64:bootstrap'
		- grab a stylesheet boiler page
			- 'cd ideafunnel/client'
			- 'git clone https://github.com/DerMambo/stylesheets.git'
		- we to edit the custom.bootstrap.json file

	- Make things beautiful
		-start on the homepage 
		-add font awesome icons

8) 

Things to cover
- Styling
	- http://blog.differential.com/the-easy-way-to-add-material-design-to-your-meteor-app/
	- meteor add natestrauser:font-awesome
- User accounts
- adding descriptions
- add a person to the team
- allow comments for each of the ideas
- adding images for the projects with the catAPI
		- http://thecatapi.com/api/images/get?format=html&results_per_page=1

	- Now we create something to add an idea
		- need to create a few helper functions
