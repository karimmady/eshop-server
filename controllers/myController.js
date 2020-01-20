var express = require('express');
var mongoose = require('mongoose');
require('../Models/brands')
require('../Models/size')
const size = mongoose.model('size')
const brands = mongoose.model('brands')
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Sample Post request
router.get('/register', function (req, res) {
  console.log("got register post request");
  var name = req.query.name;
  var password = req.query.password;
  var email = req.query.email;
  var sql = "insert into users (name, password, email) values ('"+name+"','"+password+"','"+email+"');"
  db.mycon.query(sql, function (err, result) {
    console.log(email, name,password, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    } else {
      res.sendStatus(200) 
    }
      });
});
router.get('/login', function (req, res) {
  console.log("login"); 
  var email = req.query.email;
  var password = req.query.password;
  let sql = "select * from users where email = '"+email+"' and password = '"+password+"';"
  db.mycon.query(sql, function (err, result) {
    console.log(result)
    if(err){
      res.sendStatus(400);
    } else {
      if(result[0]!=undefined){
        res.sendStatus(200);
      }
      else
        res.sendStatus(403);
    }
  });
});

router.get('/getUser', function (req, res) {
  console.log("getUser"); 
  var email = req.query.email;
  let sql = "select * from users where email = '"+email+"';"
  db.mycon.query(sql, function (err, result) {
    console.log(result)
    if(err){
      res.sendStatus(400);
    } else {
      if(result[0]!=undefined){
        res.status(200).send(result[0]);
      }
      else
        res.sendStatus(403);
    }
  });
});

router.get('/getBrands', async function (req, res) {
  console.log("got getbrands");
  try{
    const brand = await brands.find()
    console.log(brand)
    res.status(200).send({'data': brand})
  }catch(e){
    res.status(500).send({ 'error': err })
  }
});

router.get('/changePassword', async function (req, res) {
  console.log("change password");
  var password = req.query.newPassword;
  var email = req.query.email;
  console.log(password,"  dsad  ", email)
  var sql = "update users set password = '"+password+"' where email = '"+email+"';"
  console.log(sql)
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    } else {
      res.sendStatus(200) 
    }
      });
});

router.post('/putBrand',async function(req, res)  {
  console.log(req.body)
  const brand = new brands(req.body);
  await brand.save(function(err){
    if (err) {
      console.log(`Error occured when adding brand: ${err}`)
      res.status(500).send({ 'error': err })
      return
    }
  })
  res.status(200).send({ 'data': brand})
  return
});

// router.post('/setSizes',async function(req, res)  {
  
// });



// Added in today's session
router.post('/add', function (req, res) {
  let body = req.body; // let is like var, but scoped
  let num1 = body.num1;
  let num2 = body.num2;

  let result = num1 + num2;

  return res.json({
    "result": result
  });
});

router.get('/countrycodes', function (req, res) {
  var sql = "Select * from Country;"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      for (let i = 0; i < result.length; i++) {
        result[i]["code"] = "😂"; // Replace all country codes with annoying emoji
      }
      return res.send(result);
    }
  });
});
    


module.exports = router;
