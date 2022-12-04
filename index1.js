const e = require("express");
const express = require("express");
const math=require("mathjs");
const app = express();
const port = 3000;

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./serviceAccountkey.json");
initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();
app.set("view engine","ejs");

app.get("/",(req,res)=>{
	res.render("homepage");
});


app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.get("/HOME", (req, res) => {
  res.render("homepage");
});


app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/loginsubmit", (req, res) => {
  const email = req.query.email;
  const pwd = req.query.pwd;

  db.collection("Full_stack")
      .where("email", "==", email)
      .where("pwd", "==", pwd)
      .get()
      .then((docs) => {
          if (docs.size > 0) {
              res.render("homepage");
          }else {
              res.render("loginfail");
          }
      });
});

app.get("/signupsubmit", (req, res) => {
    
  const name = req.query.full_name;
  const email = req.query.email;
  const pwd = req.query.pwd;
  const rpwd = req.query.rpwd;

//Adding new data to collection
  db.collection("Full_stack")
      .add({
          name: name,
          email: email,
          pwd: pwd,
          rpwd: rpwd,
      })
      .then(()=>{
          res.render("homepage");
      });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});


app.get("/ordersubmit", (req, res) => {
  const email = req.query.Email;
  db.collection("Full_stack")
    .get()
    .then(function (docs) {
      var flag = 0;
      docs.forEach((doc) => {
        if (email == doc.data().email) {
          flag = 1;
        }
      });
      if (flag == 1) {
        //res.send("Order placed successfully");
        res.render("homepage");
      } else {
        //res.alert("Incorrect credentials details...");
        res.render("login");
      }
    });
});


app.listen(3000, function () {  
  console.log('Example app listening on port 3000!');
});
