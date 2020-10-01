let express = require('express');
// const Plant = require('../models/plant');
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Plant = require("../db").import("../models/plant");
// const Location =require("../db").import("../models")


// POST plants by location:  http://localhost:4000/plant/:locationId

router.post("/:locationId", validateSession, (req, res) => {
  const plantEntry = {
    plantName: req.body.plant.plantName,
    plantType: req.body.plant.plantType,
    sunRequirement: req.body.plant.sunRequirement,
    waterNeeds: req.body.plant.waterNeeds,
    plantCare: req.body.plant.plantCare,
    userId: req.user.id,
    locationId: req.params.locationId,
  };
  Plant.create(plantEntry)
  .then((plant) => res.status(200).json(plant))
  .catch((err) => res.status(500).json({ error: err }));
});

// POST plants without location:  http://localhost:4000/plant/create
router.post("/create", validateSession, (req, res) => {
  const plantEntry = {
    plantName: req.body.plant.plantName,
    plantType: req.body.plant.plantType,
    sunRequirement: req.body.plant.sunRequirement,
    waterNeeds: req.body.plant.waterNeeds,
    plantCare: req.body.plant.plantCare,
    userId: req.user.id,
    // locationId: req.location.id
  };
  Plant.create(plantEntry)
  .then((plant) => res.status(200).json(plant))
  .catch((err) => res.status(500).json({ error: err }));
});

//GET get plants by location: http://localhost:4000/plant/:locationId

router.get('/plantlocation/:locationId', validateSession, (req,res) => {
  let userid = req.user.id
  Plant.findAll({
      where: {
          userId: userid,
          locationId: req.params.locationId
      },
  
  })
  .then(plant=> res.status(200).json(plant))
  .catch(err => res.status(500).json({message: 'could not get plants.', error: err}))
})


//GET plants by user: http://localhost:4000/plant/:locationId

// router.get('/userplants/:userId', validateSession, (req,res) => {
//   // let userid = req.user.id
//   Plant.findAll({
//       where: {
//           userId: req.params.userId,
//           // locationId: req.params.locationId
//       }
//   })
//   .then(plant=> res.status(200).json(plant))
//   .catch(err => res.status(500).json({message: 'could not get plants.', error: err}))
// })

// GET all user plants :   http://localhost:4000/plant/ *same get as above
router.get("/myplants", validateSession, (req, res) => {
    Plant.findAll({
      where: { userId: req.user.id,
      },

    })
      .then(function createSuccess(data){
        res.status(200).json({
          message: 'plantinfo found',
          data:data
        })
      })
      .catch((err) => res.status(500).json({ error: err }));
  });


// GET all plants:   http://localhost:4000/plant/all
router.get("/all", validateSession, (req, res) => {
  Plant.findAll()
    .then((plant) => res.status(200).json(plant))
    .catch((err) => res.status(500).json({ error: err }));
});


// PUT  update plant:   http://localhost:4000/plant/:id
router.put("/update/:id", validateSession, (req, res) => {
  const updatePlantEntry = {
    plantName: req.body.plant.plantName,
    plantType: req.body.plant.plantType,
    sunRequirement: req.body.plant.sunRequirement,
    waterNeeds: req.body.plant.waterNeeds,
    plantCare: req.body.plant.plantCare,
  };
  const query = { where: { 
    plantId: req.params.id, 
     }};
 


  Plant.update(updatePlantEntry, query)
    .then((plant) => res.status(200).json(plant))
    .catch((err) => res.status(500).json({ error: err }));
});

// DELETE: delete a plant http://localhost:4000/plant/:id
router.delete("/:id", (req, res) => {
    Plant.destroy({ where: { plantId: req.params.id } })
      .then((plant) => res.status(200).json({plant, message: "plant entry has successfully deleted"}))
      .catch((err) => res.json(req.errors));
  });

// router.get('/planttest', function(req, res){
//     res.send('plant endpoint test')
// })

module.exports = router



