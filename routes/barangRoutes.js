const express = require("express");
const router = express.Router();

//IMPORT CONTROLLER
const barangController = require("../controller/barangController");

//ROUTING
router.post("/createBarang", barangController.createBarang);
router.delete("/deleteBarang/:id", barangController.deleteBarang);
router.put("/updateBarang/:id", barangController.updateBarang);
//count barang
router.get("/viewBarang", barangController.viewBarang);
module.exports = router;
