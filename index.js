const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection('mysql://by2g1v148ik5lvd7x45z:pscale_pw_kMuRl5zESQqB2IKmuo9HNQoiuNUlaNUHhOW0pG0vuu7@aws.connect.psdb.cloud/project?ssl={"rejectUnauthorized":true}');
app.get("/", (req, res) => {
 res.send("555555")
});
app.get("/house", (req, res) => {
  db.query("SELECT * FROM house", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/house/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM house WHERE id =?", id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
app.get("/admincheck/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT * FROM admin WHERE email = ?;", email,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
app.post("/create", (req, res) => {
  const owner = req.body.owner;
  const housenumber = req.body.housenumber;
  const email = req.body.email;
  const phone = req.body.phone;
  const status = req.body.status;

  db.query(
    "INSERT INTO house (housenumber,owner,email , phone, status) VALUES (?,?,?,?,?)",
    [housenumber, owner, email, phone, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted")
      }
    }
  );
});
app.post("/createlist", (req, res) => {
  try{
    req.body.forEach(element => {
      const owner = element.owner;
      const housenumber = element.housenumber;
      const email = element.email;
      const phone = element.phone;
      const status = element.status;
  
      db.query(
        "INSERT INTO house (housenumber,owner,email , phone, status) VALUES (?,?,?,?,?)",
        [housenumber, owner, email, phone, status],
        (err, result) => {
          if (err) {
            return res.send(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    }); 
    return res.send("Values Inserted");
  }catch(e){
    res.send(e)
  }   

});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const owner = req.body.owner;
  const housenumber = req.body.housenumber;
  const email = req.body.email;
  const phone = req.body.phone;
  const status = req.body.status;
  db.query(
    "UPDATE `house` SET `housenumber` = ?, `owner` = ?, `email` = ?, `phone` = ?, `status` = ? WHERE `house`.`id` = ?;",
    [housenumber, owner, email, phone, status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM house WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});