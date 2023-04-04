const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hproot@5120",
  database: "droman",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("Successfully Connected to DB");
  }
});

//Establish the port

app.listen(9002, function check(error) {
  if (error) {
    console.log("Error....ddd!!!");
  } else {
    console.log("Started....!!!! 9002");
  }
});

//create the Records
app.post("/api/customer/add", (req, res) => {
  let details = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  let sql = "INSERT INTO customer SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "customer created Failed" });
    } else {
      res.send({ status: true, message: "customer created successfully" });
    }
  });
});

//create the Records Booking

app.post("/api/booking/add", (req, res) => {
  let details = {
    location: req.body.location,
    shot: req.body.shot,
    time: req.body.time,
  };
  let sql = "INSERT INTO booking SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "customer created Failed" });
    } else {
      res.send({ status: true, message: "customer created successfully" });
    }
  });
});

//view the Records

app.get("/api/customer", (req, res) => {
  var sql = "SELECT * FROM customer";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//view the Records Booking

app.get("/api/booking", (req, res) => {
  var sql = "select * from booking";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

app.get("/api/customer/:id", (req, res) => {
  var customerid = req.params.id;
  var sql = "SELECT * FROM customer WHERE id=" + customerid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records of booking
app.get("/api/booking/:id", (req, res) => {
  var bookingid = req.params.id;
  var sql = "SELECT * FROM booking WHERE id=" + bookingid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records

app.put("/api/customer/update/:id", (req, res) => {
  let sql =
    "UPDATE customer SET name='" +
    req.body.name +
    "', email='" +
    req.body.email +
    "',phone='" +
    req.body.phone +
    "',address='" +
    req.body.address +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "customer Updated Failed" });
    } else {
      res.send({ status: true, message: "customer Updated successfully" });
    }
  });
});



//Update the Records Booking

app.put("/api/booking/update/:id", (req, res) => {
  let sql =
    "UPDATE booking SET location='" +
    req.body.location +
    "', shot='" +
    req.body.shot +
    "', time='" +
    req.body.time +
    "' WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "booking Updated Failed" });
    } else {
      res.send({ status: true, message: "booking Updated successfully" });
    }
  });
});

//Delete the Records

app.delete("/api/customer/delete/:id", (req, res) => {
  let sql = "DELETE FROM customer WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "customer Deleted Failed" });
    } else {
      res.send({ status: true, message: "customer Deleted successfully" });
    }
  });
});


//Delete the Records

app.delete("/api/booking/delete/:id", (req, res) => {
    let sql = "DELETE FROM booking WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "booking Deleted Failed" });
      } else {
        res.send({ status: true, message: "booking Deleted successfully" });
      }
    });
  });

module.exports = app;
