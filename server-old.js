var express = require("express");
var app = express();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://TheOne:afxB81Uxlml1KMwv@palmhighschooltest.dee9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var quotesCollection;

MongoClient.connect(
  connectionString,
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    const db = client.db("palm-high-school-test-db");
    quotesCollection = db.collection("quotes");
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
// This responds with "Hello World" on the homepage
app.get("/", (req, res) => {
  quotesCollection
    .find()
    .toArray()
    .then((results) => {
      res.render(__dirname + "/" + "index.ejs", { quotes: results })
    })
    .catch((error) => console.error(error));
  // ...
});

app.post("/quotes", (req, res) => {
  quotesCollection
    .insertOne(req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

//app.get("/process_get", function (req, res) {
//   // Prepare output in JSON format
//   response = {
//     name: req.query.name,
//     quote: req.query.quote,
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// });

// app.post("/process_post", function (req, res) {
//   // Prepare output in JSON format
//   response = {
//     name: req.query.name,
//     quote: req.query.quote,
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// });

// // This responds a POST request for the homepage
// app.post("/", function (req, res) {
//   console.log("Got a POST request for the homepage");
//   res.send("Hello POST");
// });

// // This responds a DELETE request for the /del_user page.
// app.delete("/del_user", function (req, res) {
//   console.log("Got a DELETE request for /del_user");
//   res.send("Hello DELETE");
// });

// // This responds a GET request for the /list_user page.
// app.get("/list_user", function (req, res) {
//   console.log("Got a GET request for /list_user");
//   res.send("Page Listing");
// });

// // This responds a GET request for abcd, abxcd, ab123cd, and so on
// app.get("/ab*cd", function (req, res) {
//   console.log("Got a GET request for /ab*cd");
//   res.send("Page Pattern Match");
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const MongoClient = require("mongodb").MongoClient;
// const connectionString =
//   "mongodb+srv://TheOne:afxB81Uxlml1KMwv@palmhighschooltest.dee9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const studentsCollection;

// MongoClient.connect(
//   connectionString,
//   {
//     useUnifiedTopology: true,
//   },
//   (err, client) => {
//     if (err) return console.error(err);
//     const db = client.db("palm-high-school-test-db");
//     this.studentsCollection = db.collection("student");
//   }
// );
// // Make sure you place body-parser before your CRUD handlers!
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(3000, function () {
//   console.log("listening on 3000");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//   // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// });

// app.post("/quotes", (req, res) => {
//   this.studentsCollection
//     .insertOne(req.body)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => console.error(error));
// });
