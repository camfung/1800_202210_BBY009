document.querySelector("#playlist-name").innerHTML = localStorage.getItem("name");
document.querySelector("#banner").src = localStorage.getItem("img");

const get_tracks = () => {
    console.log("get tracks called")
    let href = localStorage.getItem("song");
    const xhr = new XMLHttpRequest();
    progress();
    xhr.onload = function() {
        // doc = JSON.parse(this.responseText);
        let doc = this.responseText;
        let image = "./images/aiImages/" + doc + ".png";
    
        let banner = document.getElementById("banner").src = doc;
    }
    
    xhr.open("GET", "http://localhost:8000/playlist-tracks" + "?href="+href);
    xhr.send();   
}

const progress = () => {
    let i = 5;
if (i == 5) {
    i = 6;
    let percentage = document.getElementById("percentage");
    let progress;
    let elem = document.getElementById("myBar");
    let width = 5;
    let id = setInterval(frame, 1000);
    function frame() {
        width++;
        percentage.textContent = width + "%"
        elem.style.width = width + "%";
    }
  }
}