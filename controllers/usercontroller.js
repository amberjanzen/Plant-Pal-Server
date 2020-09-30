let express = require('express');
let router = express.Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let validateSession = require("../middleware/validate-session");

router.get('/usertest', function(req, res){
    res.send('user endpoint test')
})

// POST: user signup  user/signup

router.post("/signup", (req, res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      admin: req.body.role,
    })
      .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {expiresIn: '1d'});
        res.json({
          user: user,
          message: "Account Successfully Created!",
          sessionToken: token,
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  });


//POST user/login

router.post("/login", (req, res) => {
    User.findOne({where: {email:req.body.email}})
    .then(
      (user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id},
              process.env.SECRETKEY,{expiresIn: "1d",});
              res.status(200).json({
                user: user,
                message: "User logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({error: "Bad Gateway"});
            }
          })
        } else {
          res.status(500).send({error: 'failed to authenticate'});
        }
      },
      (err) => res.status(501).send({error: "Failed to Process"}) 
    )
  });

// PUT update user: http://localhost:4000/user/

router.put("/", validateSession, (req, res) => {
    let userid = req.user.id;

        const updateUser={
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 11),
      };
        const query = { where: {id: userid} };
        User.update(updateUser, query)
          .then((user) => res.status(201).json({ message: `${user} has been updated` }))
          .catch((err) => res.status(500).json({ error: err }));
      });

// DELETE user: http://localhost:4000/user/

router.delete("/", validateSession, function (req, res) {
    if (!req.err && req.user.admin){
    let userid = req.user.id;

    const query = {where: {id: userid}};

    User.destroy(query)
    .then(() => res.status(200).json({ message: "Account Deleted"}))
    .catch((err) => res.status(500).json({error:err}));
  } else { 
    return res.status(500).send({ message: "User not authorized"});
  }}
  )

// GET user: http://localhost:4000/user/


router.get("/all",validateSession,(req, res) => {
    if (!req.err && req.user.admin){
      User.findAll()
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
    } else { 
    return res.status(500).send({ message: "User not authorized"});
  }}
  )



module.exports = router;











