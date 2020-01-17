var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Sample Post request
router.post('/sendSMS', function (req, res) {
  console.log("got post request");
  var phone = req.query.phone;
  var body = req.query.body;
  var sql = "insert into mytable (phone, body, sent) values ('"+phone+"','"+body+"', 0);"
  db.mycon.query(sql, function (err, result) {
    console.log(phone, body, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    } else {
      res.sendStatus(200) 
    }
      });
});
router.get('/getSMS', function (req, res) {
  console.log("getSMS"); 
  let sql = "select * from mytable where sent = 0 order by id ASC limit 1;"
  db.mycon.query(sql, function (err, result) {
    console.log(result[0])
    if(err){
      res.status(400).send("error");
    } else {
      if(result[0])
      res.status(200).send(result[0]);
      else
      res.status(200).send({"ID":"-1"})
    }
  });
});

router.get('/sentSMS', function (req, res) {
  console.log("got sentSMS");
  let sql = "update mytable set sent = 1 where ID ="+ req.query.ID+ ";";
  db.mycon.query(sql, function(err, result){
    if(err){
      res.status(400).send("error");
    }else{
      res.status(200).send({"message":"OK"});
    }
  })
});

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
