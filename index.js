// requires
const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const qs = require("querystring");
const { send } = require("process");

let access_token = null;
const authorize = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token"
CLIENT_ID = "8185081e41dd43d98ce0316fb6b109b1";
CLIENT_SECRET = "00fd5784702d444cbe115553c19bb005";
REDIRECT_URI = "http://localhost:8000/callback";
const stateKey = 'spotify_auth_state';


axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
axios.defaults.headers['Content-Type'] = 'application/json';

app.use("/scripts", express.static("./scripts"));
app.use("/styles", express.static("./styles"));
app.use("/images", express.static("./images"));

app.get("/", (req, res) => {
    sendHtml("index", res);
})

app.get("/login", (req, res) => {
    sendHtml("login", res)
})

app.get("/main" , (req, res) => {
    sendHtml("main", res);
})

app.get("/playlists", (req, res) => {
    sendHtml("playlists", res);
  })

/**
 * End point that gets code from spoftify in 
 * preparation for requesting the auth token.
 */
app.get("/spotifyLogin", (req, res) => {
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative"
    res.cookie(stateKey, state);
    const queryParams = qs.stringify({
        client_id : CLIENT_ID, 
        response_type: "code", 
        redirect_uri: REDIRECT_URI, 
        state: state,
        scope: scope,
    });

    // redirects to spotify to get the code.
    let data = {
        url: authorize + "?" + queryParams
    }
    res.send(data);
})

/** 
 * Redirect uri that was given to spotify.
 * Exchanges the code for the access token. 
 * Saves the access token into access_token.
 */
app.get("/callback", (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            access_token = response.data.access_token;

            // res.send(access_token)
            res.redirect("/get_playlists")
            // res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
          } else {
            res.send(response);
          }
        })
        .catch(error => {
          res.send(error);
        });
    });

app.get("/get_playlists", (req, res) => {

    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists?limit=20&offset=0',
        headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        }
    })
    .then(response => {
        // let data = [];
        // console.log(response.data.items)
        // for (let i = 0 ; i < Object.keys(response.data.items).length; i++){
        //     data.push({
        //       name: response.data.items[i].name,
        //       imageLink: response.data.items[i].images[0].url,
        //       trackUrl: response.data.items[i].tracks.href,
        //     });
        //   }    
        //   let json = JSON.stringify(data);
        fs.writeFileSync("./data/playlistsNames.json", JSON.stringify(response.data.items));

        let doc = fs.readFileSync("html/playlistsLanding.html", "utf-8")
        res.send(doc);
        // res.redirect(`/get_playlist_tracks?href=${response.data.items[0].href}`)
    })
    .catch(error => {
        res.send(error)
    })
    });
      
app.get("/get_playlists_json", (req, res) => {
  let playlists_json = fs.readFileSync("data/playlistsNames.json");
  let playlists_json_parsed = JSON.parse(playlists_json);
  res.send(playlists_json_parsed);
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


app.get("/get_playlist_tracks", (req, res) => {
  let href = req.query.href
  console.log(href)
  axios({
    method: 'get',
    url: href + "/tracks?fields=items(track(name))",
    headers: {
      "Accept" : "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    }
  })
  .then(response => {
    data = [];
    for (let i =0 ; i < 50; i++){
      data.push(response.data.items[i].track.name)
    }
    res.send(data);
  })
  .catch(error => {
    res.send(error)
  })
})

let sendHtml = (url, res) => {
    let doc = fs.readFileSync("html/" + url + ".html", "utf-8");
    res.send(doc);
}



let port = 8000;
app.listen(port, () => {
    console.log("server running on http://localhost:" + port)
})

