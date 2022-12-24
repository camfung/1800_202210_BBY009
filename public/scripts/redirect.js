/**
 * Helper function for html to redirect the browser
 * to a different on the website. 
 * @param location 
 */
const redirect = (location) => {
    console.log("this")
    window.location.replace(location);
}

/**
 * Helper function to make an ajax call to the server. 
 */
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


