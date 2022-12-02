## My Web Application CoverAI

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Problems](#problems)

## General Info
This server based application named CoverAI.
* Hi my name is Cameron i am excited to make a dope project
* Hi my name is Daniel. I'm excited about this project because meeting and working with new people is always a good time.
* Hi my name is Kavin. I'm excited about this project and want to make this project great.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* node js
* expess js 
* Spotify API 
* OpenAI api-Dalle Image Generation.
* Axios
	
## Content
Content of the project folder:

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


Server Files:
index.js                     # is the server side code that communicates with the spotify api and the dalle 2 api.

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

## Problems

#### Problem 1
Since I used a express js I have not been able to figure out how to deploy this project.

I tried to deploy and my app was not functional. 
##### Solution
Find a way to integrat the firebase backend with my backend. I think that the solution to this is using App Engine by google. This will alow me to add my own backend logic and still deploy using firebase.  

#### Problem 2
Another problem that I have not been able to solve is that the app is not able to be ran on any other machine than my own. 
I'm not sure what the issue is but I know that it has something to do with the way I am implementing the spotify api. When I try to request an access token on another machine withe idential code i recieve a 400 client error.
This leads me to believe that there is a configuration that I missed on the spotify api that is machine dependant.

#### Problem 3
More problems that I know this app has is the way that I have implemented the user authenitcation. The problem is that I have one variable on the server side that holds the accss token for the user that is logged in. 
This is a scallablity problem because if there are multiple clients communicating with my server at once each client will have a unique access token. 
##### Solution
A solution that I know will fix this problem is implementing sessions. This solution will involve saving the access token into session storage on the client and sending it to the server each time the user wants to make a request. This makes it so that the server has recieves a unique access token for eacher user connected to the server. 

#### Problem 4
The way that I am generating the images is by saving them locally in a folder. The client then fetches the image. This would not work on a hosted website because there would be no way for the client to access the images. 
 
##### Solution
I would solve this problem by setting up cloud storage in firebase. This would let the client to make requests to the database to get the images. This was not implemented due to time restraints. 

## Conclusion
I successfully got this app to run on localhost but was unable to deploy it. This is very disopointing because I really want to be able to let people use it so that they can understand how powerful ai image generation has become. 

I will continue development on this project and maybe soon it will be deployed and able to be used. 
For now it is a proof of concept that this sort of thing can be done and is a cool way for the spotify users to further customize their experience. I learned so much about communicating with apis and am very happy that I took on such a challenging project.

Something that I wish that I could change is that I was unaware that we would be using the firebase service. If i had known this I would have been able to take this into account when designing the architecture of my app. I think that I would've been able to find a way to create a prototype that is able to be deployed for others to use. 
Overall this was a great experience to understand the software planning, design and implmentation process. 