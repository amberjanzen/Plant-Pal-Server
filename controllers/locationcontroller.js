let express = require('express');
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Location = require("../db").import("../models/location");

// POST:  http://localhost:4000/location/create
router.post("/create", validateSession, (req, res) => {
    const location = {
      locationName: req.body.location.locationName,
      locationDescription: req.body.location.locationDescription,
      sunExposure: req.body.location.sunExposure,
      userId: req.user.id,
    };
    Location.create(location)
      .then((location) => res.status(200).json(location))
      .catch((err) => res.status(500).json({ error: err }));
  });
  router.get("/", (req, res) => {
      Location.findOne({
        where:{
          userId: req.user.id
        },

      })
      .then(function createSuccess(data) {
        res.status(200).json({
          message: 'locationInfoFound',
          data:data
        })
      })
      .catch((err) => res.status(500).json({ error: err }));
  });

  // PUT:   http://localhost:4000/location/:id
  // router.put("/:id", validateSession, (req, res) => {
  //   const updateLocation = {
  //       locationName: req.body.location.locationName,
  //       locationDescription: req.body.location.locationDescription,
  //       sunExposure: req.body.location.sunExposure,
  //   };

  //   const query = { where: { id: req.params.id } };
  //   //   const query = { where: { id: req.params.id, userId: req.user.id} };
  //   Location.update(updateLocation, query)
  //     .then((location) => res.status(200).json({message: "Location Updated", location}))
  //     .catch((err) => res.status(500).json({ error: err }));
  // })

  // DEL:   http://localhost:4000/location/:id
  router.delete("/:id",validateSession, (req, res) => {
    Location.destroy({ where: { id: req.params.id } })
      .then((location) => res.status(200).json({message: "Location Deleted"}))
      .catch((err) => res.json(req.err));
    } 
  )


// router.get('/locationtest', function(req, res){
//     res.send('location endpoint test')
// })

module.exports = router
