document.querySelector("#playlist-name").innerHTML = localStorage.getItem("name");
document.querySelector("#banner").src = localStorage.getItem("img");

const get_tracks = () => {
    console.log("get tracks called")
    let href = localStorage.getItem("song");
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        // doc = JSON.parse(this.responseText);
        let doc = this.responseText;
        let image = "./images/aiImages/" + doc + ".png";
    
        let banner = document.getElementById("banner").src = doc;
    }
    
    xhr.open("GET", "http://localhost:8000/playlist-tracks" + "?href="+href);
    xhr.send();   
}