const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//getting the page
app.get("/users", (req, res) => {
  res
    .status(200, "Welcome to the page.")
    .sendFile(path.join(__dirname, "/index.html"));
});

//posting some data
app.post("/users", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({ message: "Name and email are required" });
  }

  let lines = 0;

  fs.readFile("./users.csv", "utf8", (err, data) => {
    //checking if file exists/is empty

    lines = data.split("\n").length;

    req.body.id = lines;

    //appending the data
    fs.appendFileSync(
      path.join(__dirname, "/users.csv"),
      `\n${req.body.id},${req.body.name},${req.body.email}`,
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    res.status(201).send(req.body);
  });
});

//listenig
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
