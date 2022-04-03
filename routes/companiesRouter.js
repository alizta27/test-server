const express = require("express");
const router = express.Router();
const CompaniesController = require('../controllers/CompaniesController');

router.get("/", CompaniesController.allCompanies);
router.post("/add", CompaniesController.addCompany);
router.delete("/delete/:id", CompaniesController.deleteCompanies);
router.get("/detail/:id", CompaniesController.detailCompanies);
// router.post("/register", CustomerController.registerUser);

module.exports = router;