if (localStorage.login === "true") {
    console.log("logged in")

    
    let doc;
    const xhr = new XMLHttpRequest();
    // console.log("xhr", xhr);
    xhr.onload = function() {
        doc = JSON.parse(this.responseText);
        const template = document.querySelector("#playlist-template");
        console.table(doc)
        // console.log(doc[0].images[0].imageUrl)

        for (let i = 0 ; i < 3; i++){
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
                songs : []
            }
            writePlaylists(name, data);
            newEle.querySelector(".playlist").onclick = () => getSongs(name); 
            document.querySelector("#playlists-holder").appendChild(newEle);
        }
    }

    xhr.open("GET", "http://localhost:8000/getPlaylists");
    xhr.send();
}

const getSongs = (name) =>{
    // const xhr = new XMLHttpRequest();
    // // console.log("xhr", xhr);
    // xhr.onload = function() {
    //     doc = JSON.parse(this.responseText);

    // }

    // xhr.open("GET", "http://localhost:8000/getTracks");
    // xhr.send();

    console.log(name)
}

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