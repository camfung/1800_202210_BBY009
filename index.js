// requires
const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const qs = require("querystring");

const { Configuration, OpenAIApi } = require("openai");

const openai = require("openai");
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

app.get("/index", (req, res) => {
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
    // const state = generateRandomString(16);
    const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative"
    // res.cookie(stateKey, state);
    const queryParams = qs.stringify({
        client_id : CLIENT_ID, 
        response_type: "code", 
        redirect_uri: REDIRECT_URI, 
        // state: state,
        scope: scope,
    });

    // redirects to spotify to get the code.
    let data = {
        url: authorize + "?" + queryParams
    }
    console.log("/spotify login")
    res.send(data);
})

/** 
 * Redirect uri that was given to spotify.
 * Exchanges the code for the access token. 
 * Saves the access token into access_token.
 */
 app.get("/callback", (req, res) => {
    const code = req.query.code || null;
    console.log("code " + code)
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
            console.log("access token " + response.data.access_token)
            sendHtml("main", res)

            

        } else {

            res.send(response);
          }
        })
        .catch(error => {
          res.send(error);
        });
    });

app.get("/access_token", (req, res) => {
  res.send(access_token)
})

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

app.get("/playlist-view", (req, res) => {
  sendHtml("playlist", res);
})

app.get("/tester", (req, res) => {
  let doc = [
    [
      './images/aiImages/image_1669764001811_0.png',
      './images/aiImages/image_1669764001811_1.png',
      './images/aiImages/image_1669764001811_2.png',
      './images/aiImages/image_1669764001811_3.png'
    ],
    'Playground Lose Someone Westcoast Collective Figure It Out Lose Someone album cover'
  ]
  res.send(doc)
})

app.get("/playlist-tracks", (req, res) => {
  // sendHtml("playlist", res)
  let href = req.query.href
  axios({
    method: 'get',
    url: href + "?fields=items(track(name))",
    headers: {
      "Accept" : "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    }
  })
  .then( async response => {
    data = [];
    let numSongs = response.data.items.length;
    for (let i = 0 ; i < numSongs; i++){
      data.push(response.data.items[i].track.name)
    }
    let prompt = ""
    var songs = []
    for (let i = 0; i < 5; i++) {
      let r = getRandomInt(numSongs);
      prompt += data[r] + " "
      songs.push(data[r]);
    }
    console.log(prompt)
    prompt += "album cover"

    let key = "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";
    const configuration = new Configuration({
      apiKey: key
  });
  const openai = new OpenAIApi(configuration);

  predict(prompt, openai)
    .then(
        response => {
            const now = Date.now();
            let images = [];
            let filenames = [];
            for (let i = 0; i < response.data.length; i++)
            {
                const b64 = response.data[i]['b64_json'];
                const buffer = Buffer.from(b64, "base64");
                filenames[i] = `./images/aiImages/image_${now}_${i}.png`;
                fs.writeFileSync(filenames[i], buffer);
            }

            let songsAndFile = [filenames, prompt]
            console.log(songsAndFile)

            res.send(songsAndFile);
        }
    )
  })
  .catch(error => {
    console.log('this is an error')
    console.log(error) 
    res.send("there was a problem")
  })

})


const predict = async function (prompt, openai) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 4,
    size: "1024x1024",
    // size: "1024x1024",
    response_format: 'b64_json',
  });
  
  return response.data;
}

let sendHtml = (url, res) => {
    let doc = fs.readFileSync("html/" + url + ".html", "utf-8");
    res.send(doc);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
