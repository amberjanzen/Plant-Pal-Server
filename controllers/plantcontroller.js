let express = require('express');
// const Plant = require('../models/plant');
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Plant = require("../db").import("../models/plant");
// const Location =require("../db").import("../models")




// POST:  http://localhost:4000/plant/create
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


// GET user plants:   http://localhost:4000/plant/
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id;
    Plant.findAll({
      where: { userId: userid },
      // where: {userId: req.user.id , locationId: req.location.id},
    })
      .then((plant) => res.status(200).json(plant))
      .catch((err) => res.status(500).json({ error: err }));
  });


// GET:   http://localhost:4000/plant/all
router.get("/all", validateSession, (req, res) => {
  Plant.findAll()
    .then((plant) => res.status(200).json(plant))
    .catch((err) => res.status(500).json({ error: err }));
});


// PUT  update plant:   http://localhost:4000/plant/:id
router.put("/update/:id", validateSession, (req, res) => {
  const updatePlant = {
    plantName: req.body.plant.plantName,
    plantType: req.body.plant.plantType,
    sunRequirement: req.body.plant.sunRequirement,
    waterNeeds: req.body.plant.waterNeeds,
    plantCare: req.body.plant.plantCare,
    // locationId: req.location.id
  };
//   const query = { where: { id: req.params.id, userId: req.user.id, locationId: req.location.id } };
  const query = { where: { id: req.params.id, userId: req.user.id } };


  Plant
    .update(updatePlant, query)
    .then((plant) => res.status(200).json({plant, message: "Plant Updated"}))
    .catch((err) => res.status(500).json({ error: err }));
});

// DELETE: delete a plant http://localhost:4000/plant/:id
router.delete("/:id", (req, res) => {
    Plant.destroy({ where: { id: req.params.id } })
      .then((plant) => res.status(200).json({plant, message: "plant entry has successfully deleted"}))
      .catch((err) => res.json(req.errors));
  });

// router.get('/planttest', function(req, res){
//     res.send('plant endpoint test')
// })

module.exports = router



