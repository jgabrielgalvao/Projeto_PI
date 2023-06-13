const animalService = require("../service/animalService");
const path = require('path');

function getAllAnimals(req, res) {
    let animals = animalService.getAllAnimals();
    animals.then((result) => res.json(result));
}

function getAnimalById(req, res) {
    let parsedId = parseInt(req.params.id);
    let animal = animalService.getAnimalById(parsedId);
    animal.then((result) => res.json(result));
}

function getAnimalsFilter(req, res) {
    let {breed, age, gender} = req.query    ;
    console.log(breed, age, gender);
    let animais = animalService.getAnimalsFilter(breed, age, gender);
    animais.then((result) => res.json(result));
}

const getAnimalPictureById = async (req, res) => {
    let parsedId = parseInt(req.params.id);
    let animalPicture = await animalService.getAnimalPictureById(parsedId);
    const filePath = path.join('/home/josegabriel/Área de Trabalho/Projeto_PI/backend/pictures', `${animalPicture}`);
    res.sendFile(filePath);
    // animalPicture.then((result) => res.json(result));
}

const createAnimal = (req, res) => {
    let animalRequest = {
        name: req.body.name,
        breed: req.body.breed,
        gender: req.body.gender,
        age: req.body.age,
        size: req.body.size,
        city: req.body.city,
        state: req.body.state,
        dewormed: req.body.dewormed,
        castrated: req.body.castrated,
        vaccinated: req.body.vaccinated,
        special_care: req.body.special_care,
        picture: req.file.filename,
    };

    animalService.createAnimal(animalRequest).then((result) => res.json(result));
}

module.exports = { getAllAnimals, getAnimalById, getAnimalPictureById, createAnimal, getAnimalsFilter };