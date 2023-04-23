const cors = require("cors");
const express = require("express");

const app = express();

const db = require("./models");

const path = require("path");

//this will re-set the database everytime you start the server
db.sequelize.sync({ force: true }).then(() => {
  console.log("#droped the database and and re-synced.");
});


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../Frontend/build");

app.use(express.static(buildPath));

app.get("/*", function(req, res) {
  res.sendFile(
  path.join(__dirname, "../Frontend/build/index.html"),
     function (err) {
        if (err) {
                res.status(500).send(err);
        }
     }
  );
  //res.json({ message: "Welcome to Student App - Backend!!!" });
});

require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
