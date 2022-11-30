document.querySelector("#playlist-name").innerHTML = localStorage.getItem("name");
document.querySelector("#banner").src = localStorage.getItem("img");

const get_tracks = () => {
    console.log("get tracks called")
    let href = localStorage.getItem("song");
    const xhr = new XMLHttpRequest();
    let id;
    progress(id);
    xhr.onload = function() {
        // doc = JSON.parse(this.responseText);
        let doc = JSON.parse(this.responseText);
        let image = doc[0][0];
        
        document.getElementById("banner").src = image;
        
        let covers = document.querySelectorAll(".images");
        for (let i = 0; i < doc[0].length; i++) {
            covers[i].src = doc[0][i]
        }
        
        let songs = document.getElementById("song-names");
        document.getElementById("loading-message").textContent = "Loading your image now."
        songs.textContent = "The songs that we used are: \n" + doc[1];
        let s = document.querySelectorAll(".images") 
        console.log(s);
        for (ele of s) {
            let src = ele.src;
            ele.addEventListener("click", () => {
                let main = document.querySelector("#banner");
                main.src = src;
            })
        }
        
        document.getElementById("progress-wrapper").style.display = "none"
        clearInterval(id)
    }
    
    // xhr.open("GET", "http://localhost:8000/tester" + "?href="+href);
    xhr.open("GET", "http://localhost:8000/playlist-tracks" + "?href="+href);
    xhr.send();   
}

const progress = (id) => {
    let i = 5;
if (i == 5) {
    i = 6;
    let wrap = document.getElementById("progress-wrapper");
    wrap.style.display = "inline";
    let percentage = document.getElementById("percentage");
    let progress;
    let elem = document.getElementById("myBar");    
    let width = 5;
    id = setInterval(frame, 1000);
    function frame() {
        width++;
        percentage.textContent = width + "%"
        elem.style.width = width + "%";

    }
  }
}