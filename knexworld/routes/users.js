var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ---login---
router.post('/login', async function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    res.status(400).json(
      {
        error: true,
        message: "Request body incomplete - email and password needed.",  
      }
    );

    return
  }

    const queryUsers = await req.db
    .from('users')
    .select("*")
    .where("email", "=", email);

  if(queryUsers.length === 0){
    res.json({
      error:true,
      meessage: "User not exits"
    });
    return;
  }

  const user = queryUsers[0];
  console.log("user: ", user);
  // ---await bcrypt---
  const match = await bcrypt.compare(password, user.hash);
  // ---await bcrypt---
  console.log("match: ", match);

  if(!match){
    res.json({error: true, message:"Password don't match"});
    return;
  }

  const secretKey = "secret key";
  const expiresIn = 60*60*24;//1 day
  const exp = Date.now() + expiresIn * 1000;
  const token = jwt.sign({email, exp}, secretKey);
  res.json({toke_type: "Bearer", token, expiresIn});

})
// ---login---

// ---register---
router.post("/register", async function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    res.status(400).json(
      {
        error: true,
        message: "Request body incomplete - email and password needed.",  
      }
    );
    return
  }
  const queryUsers = await req.db
    .from('users')
    .select("*")
    .where("email", "=", email);

  if(queryUsers.length>0){
    res.json({
      error:true,
      meessage: "User already exits"
    });
    return;
  }

  console.log("No matchinig users");

  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  await req.db.from("users").insert({email, hash});
  console.log("Successfully iniserted user");
  res.json({error: false, message:" no error"});
})
// ---register---

// ---update watchlist---
router.post("/updatewatchlist", async function(req, res, next){
  const email = req.body.email;
  const wlist = req.body.symbol;

  const querySym = await req.db
    .from('wlist')
    .select('*')
    .where("email", "=", email);

 if(querySym.length >  0){
    await req.db.from("wlist").update({email, wlist}).where("email", "=", email);
  }
  else{
    await req.db.from("wlist").insert({email, wlist});
  }

  console.log("Successfully iniserted user");
  res.json({error: false, message:" no error"});
})
// ---update watchlist---

// ---get watchlist---
router.get("/getwatchlist/:s", async function (req, res, next) {
  try {
    let row = req.db.from("wlist").select("email", "wlist");
    row = row.where("email", "=", req.params.s);
    res.json({ Error: false, Message: "Success", wlist: await row });
  } catch (err) {
    console.log(err);
    res.json({ Error: true, Message: "Error in MySQL query" });
  }
});
// ---get watchlist---



module.exports = router;
