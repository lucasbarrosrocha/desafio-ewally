const express = require("express");
const router = express.Router();
const boletoController = require("../controllers/boletoController");

router.get("/:barcode", boletoController.getDetails);

module.exports = router;
