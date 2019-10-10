const router = require("express").Router();
// const exampleRoute = require('./exampleRoute');
// router.use('/exampleRoute', exampleRoute);

router.get("/json", (req, res) => {
  res.status(200).json({ message: "Success" });
});

module.exports = router;
