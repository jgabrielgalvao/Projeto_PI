const express = require("express");
const db = require("../db/database");
const router = require("../routes/routes");
const cors = require("cors");

// multer file
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();

db.sync();

app.use(express.json());
app.use(express.static("pictures/"));
app.use(cors());
app.use(router);

const port = "8081";
app.listen(port, () => console.log(`Server running on port: ${port}`));