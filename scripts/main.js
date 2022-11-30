if (localStorage.login === "true") {
    console.log("logged in")

    
    let doc;
    const xhr = new XMLHttpRequest();
    // console.log("xhr", xhr);
    xhr.onload = function() {
        doc = JSON.parse(this.responseText);
        const template = document.querySelector("#playlist-template");
        console.log(doc)
        // console.log(doc[0].images[0].imageUrl)
        document.querySelector("#playlists-holder").innerHTML = "";
        for (let i = 0 ; i < doc.length; i++){
            let imageUrl = doc[i].imageUrl;
            let name = doc[i].name;
            let trackUrl = doc[i].trackUrl;
            localStorage.setItem(name, trackUrl);

            let newEle = template.content.cloneNode(true);
            newEle.querySelector(".playlist-name").textContent = name;
            newEle.querySelector(".playlist-image").src = imageUrl;
            let data = {
                name : name,
                image: imageUrl,
                songs : [],
                trackUrl : trackUrl
            }
            // writePlaylists(name, data);
            newEle.querySelector(".playlist").onclick = () => getSongs(trackUrl, imageUrl, name); 
            document.querySelector("#playlists-holder").appendChild(newEle);
        }
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            // doc = JSON.parse(this.responseText);
            let doc = this.responseText;
            localStorage.access_token = doc;
        }
        
        xhr.open("GET", "http://localhost:8000/access_token");
        xhr.send();   

    }

    xhr.open("GET", "http://localhost:8000/getPlaylists");
    xhr.send();
}

const getSongs = (url, img, name) =>{
    localStorage.setItem("name", name)
    localStorage.setItem("song", url)
    localStorage.setItem("img", img)
    window.location.replace("http://localhost:8000/playlist-view")
}

ready(() => {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.collection("playlists")
            .get()
            .then(allPlaylists => {
                allPlaylists.forEach(element => {
                    const template = document.querySelector("#playlist-template");
    
                    let name = element.data().name;
                    let imageUrl = element.data().image;
                    let trackUrl = element.data().trackUrl;  
    
                    localStorage.setItem(name, trackUrl);
    
                    let newEle = template.content.cloneNode(true);
                    newEle.querySelector(".playlist-name").textContent = name;
                    newEle.querySelector(".playlist-image").src = imageUrl;

                    newEle.querySelector(".playlist").onclick = () => getSongs(trackUrl, imageUrl, name); 
                    document.querySelector("#playlists-holder").appendChild(newEle);
                });
            })

            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;

                let nameSpan = document.getElementById("name-here").innerHTML = userName + "'s Playlists"
            })

        } else {
    
        }
    });
});

/**
 * writing the playlist info to the db
 */
const writePlaylists = (name, data) => {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.collection("playlists").doc(name).set(data)
        } else {

        }
    });
}

// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}
