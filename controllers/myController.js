var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
require('../Models/brands')
require('../Models/size')
require('../Models/userToken')
require('../Models/info')
const info = mongoose.model('info')
const tokenUser = mongoose.model('userToken')
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
  var sql = "insert into users (name, password, email) values ('" + name + "','" + password + "','" + email + "');"
  db.mycon.query(sql, function (err, result) {
    console.log(email, name, password, "Result: " + JSON.stringify(result));
    if (err) {
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
  let sql = "select * from users where email = '" + email + "' and password = '" + password + "';"
  db.mycon.query(sql, function (err, result) {
    console.log(result)
    if (err) {
      res.sendStatus(400);
    } else {
      if (result[0] != undefined) {
      require('crypto').randomBytes(48, async function(err, buffer) {
        var token = buffer.toString('hex');
        const saveToken = new tokenUser({"Email":email,"Token":token})
        await saveToken.save(function (err) {
          if (err) {
            console.log(`Error occured when adding brand: ${err}`)
            res.status(500).send({ 'error': err })
            return
          }
          else
          {
            res.status(200).send({"token":token});
            return
          }
        })
      });
      }
      else
        res.sendStatus(403);
        return
    }
  });
});

router.get('/getUser', function (req, res) {
  console.log("getUser");
  var email = req.query.email;
  let sql = "select * from users where email = '" + email + "';"
  db.mycon.query(sql, function (err, result) {
    console.log(result)
    if (err) {
      res.sendStatus(400);
    } else {
      if (result[0] != undefined) {
        res.status(200).send(result[0]);
      }
      else
        res.sendStatus(403);
    }
  });
});

router.get('/getBrands', async function (req, res) {
  console.log("got getbrands");
  try {
    const brand = await brands.find()
    console.log(brand)
    res.status(200).send({ 'data': brand })
  } catch (e) {
    res.status(500).send({ 'error': err })
  }
});

router.get('/logout', async function (req, res) {
  console.log("logout");
  try {
    const checkToken = await tokenUser.findOneAndDelete({"Email":req.query.email})
   res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500)
  }
});

router.get('/checkToken', async function (req, res) {
  console.log("got checkToken");
  try {
    const checkToken = await tokenUser.find({"Email":req.query.email})
    if(checkToken[0].Token == req.query.token)
      res.sendStatus(200)
    else{
      res.sendStatus(403)
    }
  } catch (e) {
    res.sendStatus(500)
  }
});

router.get('/setAddress', async function (req, res) {
  console.log("got putaddress");
  email = req.query.email
  address = req.query.address;
  try {
    const found = await info.findOneAndUpdate({"Email":req.query.email},{$set:{"address":address}},async (err) => {
      try{
          console.log(found)
      }catch(e){
          const information = new info({"Email":email,"address":address})
          await information.save()
      }
        if(err)
          res.sendStatus(404);
        else
          res.status(200).send({"result":"Ok"});
    })
    } catch (e) {
        res.sendStatus(500)
  }
});
router.get('/getAddress', async function (req, res) {
  console.log("got getaddress");
  email = req.query.email;
  try {
      const userAddress = await info.findOne({"Email":email})
      res.status(200).send({"address":userAddress.address})
    } catch (e) {
        res.sendStatus(500)
  }
});
router.get('/changePassword', async function (req, res) {
  console.log("change password");
  var password = req.query.newPassword;
  var email = req.query.email;
  console.log(password, "  dsad  ", email)
  var sql = "update users set password = '" + password + "' where email = '" + email + "';"
  console.log(sql)
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200)
    }
  });
});

router.post('/putBrand', async function (req, res) {
  console.log(req.body)
  const brand = new brands(req.body);
  await brand.save(function (err) {
    if (err) {
      console.log(`Error occured when adding brand: ${err}`)
      res.status(500).send({ 'error': err })
      return
    }
  })
  res.status(200).send({ 'data': brand })
  return
});
router.post('/putImage', async function (req, res) {
  var img = new image;
  img.ID = req.body.ID;
  console.log(req)
  // img.dataImage = new Buffer(req.body.Image).toString('base64');
  // img.save(function (err, ds) {
  //   if (err){
  //     res.sendStatus(500);
  //   }
  //   else{
      res.sendStatus(200);
  //   };
  // })
});

router.post('/setSize', async function (req, res) {
  size.find({ "Email": req.Email }, async function (err, docs) {
    if (docs.length) {
      console.log(docs)
    } else {
      try {
        const sizes = new size(req.body);
        await sizes.save()
        res.sendStatus(200)
      }
      catch (err) {
        res.status(500).send({ "error": err })
      }
    }
  });
});



module.exports = router;
