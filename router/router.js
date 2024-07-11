const express = require("express");
const router = express.Router();
const customers = require("../model/model");

router.get("/customers", customers.getAll);
router.post("/customers", customers.create);
router.get("/customers/:id", customers.getOne);
router.put("/customers/:id", customers.update);
router.delete("/customers/:id", customers.delete);

module.exports = router;
