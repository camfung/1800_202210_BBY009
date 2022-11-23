// requires
const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const qs = require("querystring");

const { JSDOM } = require("jsdom");

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
            // getPlaylists(res);
            
            sendHtml("main", res)
            

        } else {
            res.send(response);
          }
        })
        .catch(error => {
          res.send(error);
        });
    });

app.get("/getPlaylists", (req, res) => {
    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists?limit=20&offset=0',
        headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        }
    })
    .then(response => {
        let data = [];
        let numItems = Object.keys(response.data.items).length
        
        for (let i = 0 ; i < numItems; i++){
            data.push({
                name: response.data.items[i].name,
                imageUrl: response.data.items[i].images[0].url,
                trackUrl: response.data.items[i].tracks.href,
            });
        }    
        res.send(data);
    })
    .catch(error => {
        res.send(error)
    })
})

app.get("/tracks", (req, res) => {
  console.log(req.query.name);
  res.send("")
})

let sendHtml = (url, res) => {
    let doc = fs.readFileSync("html/" + url + ".html", "utf-8");
    res.send(doc);
}

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


let port = 8000;
app.listen(port, () => {
    console.log("server running on http://localhost:" + port)
})

// this is a commet