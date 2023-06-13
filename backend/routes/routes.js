const express = require("express");

// Controllers
const animalController = require("../controller/animalController");

// Handlers
const router = express.Router();

// multer file
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'pictures/',
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Animals
router.get("/animal", animalController.getAllAnimals);
router.get("/animal/:id", animalController.getAnimalById);
router.get("/animais", animalController.getAnimalsFilter);
router.get("/picture/:id", animalController.getAnimalPictureById);
router.post("/animal", upload.single('picture'), animalController.createAnimal);

module.exports = router;