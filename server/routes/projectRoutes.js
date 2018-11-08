const server = require("../server");
const db = require("../config/dbConfig");

server.get("/projects", (req, res) => {
  console.log(db("projects"));
  db("projects")
    .get()
    .then(projects => res.send(projects))
    .catch(err => res.send(err));
});
