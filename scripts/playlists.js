const callServer = () => {
    let doc;
    const xhr = new XMLHttpRequest();
    // console.log("xhr", xhr);
    xhr.onload = function() {
        doc = JSON.parse(this.responseText);
        window.location.replace(doc.url)
    }
    xhr.open("GET", "http://localhost:8000/spotifyLogin");
    xhr.send();

    // fetch("http://localhost:8000/spotifyLogin")
    // .then(response => {
    //     response.json();
    // })
    // .then(data => {
    //     console.log(data);
    // })
}
