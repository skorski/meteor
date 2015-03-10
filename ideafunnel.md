Meteor Presentation MD

# The ideafunnel
This is a simple concept where users can log in to post ideas.  We will create an app that will allow a registered user to post an idea, add 

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

	- start by creating the collection to store ideas
	Ideas = New Mongo.Collection('ideas')

	Ideas.allow({

		insert(true)

		update(true)

		delete(true)

		})

	- Now we create something to add an idea
		- need to create a few helper functions
