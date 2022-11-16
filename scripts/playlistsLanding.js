// const xhr = new XMLHttpRequest();
// // console.log("xhr", xhr);
// xhr.onload = function() {
//     let doc = JSON.parse(this.responseText)
//     const template = document.querySelector("#playlist-template");
//     console.log(doc.length)
//     for (let i = 0 ; i < doc.length; i++){
//       let url = doc[i].images[0].url;
//       let name = doc[i].name;
//       console.log(name)
//       let newEle = template.content.cloneNode(true);
//       newEle.querySelector(".name").textContent = name;
//       newEle.querySelector(".image").src = url;

// const { json, response } = require("express");

//       document.querySelector("#playlists").appendChild(newEle);
      
//     }
// }
// xhr.open("GET", "http://localhost:8000/get_playlists_json");
// xhr.send();
// test = {
//     the : "case", 
//     there : " the"
// }

// console.log(Object.keys(test).length)

fetch("http://localhost:8000/get_playlists_json")
.then(response => response.json())
.then(doc => {

    const template = document.querySelector("#playlist-template");
    for (let i = 0 ; i < doc.length; i++){
      let url = doc[i].images[0].url;
      let name = doc[i].name;
      let href = doc[i].href;
      let newEle = template.content.cloneNode(true);
      newEle.querySelector(".name").textContent = name;
      newEle.querySelector(".image").src = url;
      newEle.querySelector(".id").textContent = href;
      document.querySelector("#playlists").appendChild(newEle);
    }

    let playlists = document.querySelectorAll(".playlist");
    for (ele of playlists){
      ele.addEventListener("click", (e) => {
        let url = e.target.nextSibling.nextSibling.innerHtml;
        console.log(url)
        // fetch("http://localhost:8000/get_playlist_tracks?href="+url)
        // .then(response => response.json())
        // .then(data => {
        //   console.log(data);
        // })
      })
    }
})

