const express = require("express");
require("express-async-errors");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const boletoRouter = require("./routers/boletoRouter");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.use("/boleto", boletoRouter);

module.exports = app;
