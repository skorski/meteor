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

	b) 




	- Now we create something to add an idea
		- need to create a few helper functions
