var express = require("express");
var router = express.Router();

// token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// ---authorize---
const authorize = (req, res, next) =>{
  const authorization = req.headers.authorization
  let token = null;

  // Retrieve token
  if(authorization && authorization.split(".").length >=2){
    token = authorization
    console.log("Token: ", token)
  }
  else{
    //console.log("Unauthorize user")
    res.status(401).json({error: true, message: "Unauthorized"})
    return
  }

  // Verify JWT and check exipration date
  try{
    //secret key
    const secretKey = "secret key";
    //
    const decoded = jwt.verify(token, secretKey)
    console.log(decoded);

    if(decoded.exp < Date.now()){
      console.log("Token has expired")
      return
    }
    // Permit user to advance to route
    next()
  }catch(e){
    console.log("Token is not valid: ", err)
    //res.status(401).json({error: true, message: "Unauthorized"})
  }
}
// ---authorize---

//update
router.post("/api/update", authorize, (req, res) => {
  if (!req.body.City || !req.body.CountryCode || !req.body.Pop) {
    res.status(400).json({ message: `Error updating population` });
    console.log(`Error on request body:`, JSON.stringify(req.body));
    return
  } else {
    const filter = {
      Name: req.body.City,
      CountryCode: req.body.CountryCode,
    };
    const pop = {
      Population: req.body.Pop,
    };
    req
      .db("city")
      .where(filter)
      .update(pop)
      .then((_) => {
        res.status(201).json({ message: `Successful update ${req.body.City}` });
        console.log(`successful population update:`, JSON.stringify(filter));
      })
      .catch((error) => {
        res.status(500).json({ message: "Database error - not updated" });
      });
  }
});

module.exports = router;
