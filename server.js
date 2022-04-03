// server.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("build"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
});

// your first API endpoint...
app.get("/api/timestamp", function (req, res) {
    res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date", (req, res) => {
    let dateString = req.params.date;
    if (/\d{6}/.test(dateString)) {
        let dateInt = parseInt(dateString);
        console.log(dateInt);
        let unix = dateInt;
        console.log(unix);
        let utc = new Date(dateInt).toUTCString();
        console.log(utc);
        console.log({ unix: unix, utc: utc });
        res.json({ unix: unix, utc: utc });
    }
    let dateObject = new Date(dateString);
    if (dateObject.toString() === "Invalid Date") {
        console.log({ error: "Invalid Date" });
        res.json({ error: "Invalid Date" });
    } else {
        res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
    }
});

// listen for requests :)
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);
