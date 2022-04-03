const express = require("express");
const router = express.Router();
const JobController = require('../controllers/JobController');

router.get("/", JobController.allJob);
router.get("/detail/:id", JobController.detailJob)
router.post("/addJob", JobController.addJob);
router.put("/editJob/:id", JobController.editJob);
router.delete("/delete/:id", JobController.deleteJob);

module.exports = router;