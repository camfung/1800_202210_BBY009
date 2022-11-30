## My Web Application (Add your Title here)

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application to ...
* Hi my name is Cameron i am excited to make a dope project
* Hi my name is Daniel. I'm excited about this project because meeting and working with new people is always a good time.
* Hi my name is Kavin. I'm excited about this project and want to make this project great.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* node js
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── package.json             # holds the information about the node project. 
└── README.md


It has the following subfolders and files:
├── html folder              # holds all the html files used in the project.
index.html                   # landing page of the site.
login.html                   # login to the firebase backend.
main.html                    # where the user views their playlists.
playlist.html                # user generates image here.
├── images \ aiImages        # holds the images generated for the user.
├── scripts                  # holds the client side js scripts
authentication.js            # communicates with the firebase backend and logs the user in.
firebaseAPI_Team09.js        # client info for firebase
main.js                      # communicates with the node server and 
playlist.js                  # makes a call to the node server asking it to make a call to the dalle api.
redirect.js                  # helper functions to redirect to other pages.


Firebase hosting files: 
├── .firebaserc...


Server Files:
index.js                     # is the server side code that communicates with the spotify api and the dalle 2 api.

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation