document.querySelector("#playlist-name").innerHTML = localStorage.getItem("name");
document.querySelector("#banner").src = localStorage.getItem("img");

/**
 * Main function that makes a call to the generate-image endpoint.
 */
const generateCover = () => {
    console.log("get tracks called")
    // Getting the song that the user requested. 
    let href = localStorage.getItem("song");
    const xhr = new XMLHttpRequest();
    /* 
        Need loadingAnimation to be out of scope of the function so that 
        it can be accessed later.
    */
    let loadingAnimation;
    // Creating the loading bar. 
    progress(loadingAnimation);
    // Making a call to the server. 
    xhr.onload = function () {
        // doc = JSON.parse(this.responseText);
        let doc = JSON.parse(this.responseText);
        let image = doc[0][0];

        //setting the main image to the first image in the images array from the server. 
        document.getElementById("banner").src = image;

        let covers = document.querySelectorAll(".images");
        for (let i = 0; i < doc[0].length; i++) {
            covers[i].src = doc[0][i]
        }

        let songs = document.getElementById("song-names");
        document.getElementById("loading-message").textContent = "Loading your image now."

        // telling the user what song titles were used to create the images.
        songs.textContent = "The song titles that we used are: " + doc[1];
        let imagesContainer = document.querySelectorAll(".images")

        // console.log(imagesContainer);
        // Setting the event listener to make the image that the 
        // user clicks on the one that is the main image. 
        for (ele of imagesContainer) {
            let src = ele.src;
            ele.addEventListener("click", () => {
                let main = document.querySelector("#banner");
                main.src = src;
            })
        }
        
        // Removing the loading feedback.
        document.querySelector("#loading-message").style.display = "none";
        document.getElementById("progress-wrapper").style.display = "none"
        clearInterval(loadingAnimation)
    }

    // xhr.open("GET", "http://localhost:8000/tester" + "?href="+href);
    xhr.open("GET", "http://localhost:8000/generate-image" + "?href=" + href);
    xhr.send();
}

/**
 * Creating the loading bar effect.
 * 
 */
const progress = (loadingAnimation) => {
    let i = 5;
    if (i == 5) {
        i = 6;
        let wrap = document.getElementById("progress-wrapper");
        wrap.style.display = "inline";
        let percentage = document.getElementById("percentage");
        let progress;
        let elem = document.getElementById("myBar");
        let width = 5;
        loadingAnimation = setInterval(frame, 300);
        function frame() {
            width++;
            percentage.textContent = width + "%"
            elem.style.width = width + "%";

        }
    }
}