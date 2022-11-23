const redirect = (location) => {
    console.log("this")
    window.location.replace(location);
}

const callServer = () => {
    let doc;
    const xhr = new XMLHttpRequest();
    // console.log("xhr", xhr);
    xhr.onload = function() {
        doc = JSON.parse(this.responseText);
        localStorage.login = "true";
        window.location.replace(doc.url)
    }
    xhr.open("GET", "http://localhost:8000/spotifyLogin");
    xhr.send();
}
