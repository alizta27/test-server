const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");
const userRouter = require("./userRouter");
const jobRouter = require("./jobRouter");
const companiesRouter = require("./companiesRouter");
const { authUser } = require('../middlewere/auth');

router.get("/", Controller.home)
router.get("/search", Controller.search)
router.get("/detail/:id", Controller.detail)
router.use("/user", userRouter);

router.use(authUser)
router.use('/jobs', jobRouter)
router.use('/companies', companiesRouter)

module.exports = router;