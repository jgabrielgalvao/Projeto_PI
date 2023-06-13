const animalRepository = require("../repository/animalRepository");

async function getAllAnimals() {
    try {
        let animals = await animalRepository.getAllAnimals();
        return animals;
    } catch (error) {
        console.log(error);
    }
}

async function getAnimalById(animalId) {
    try {
        let animal = await animalRepository.getAnimalById(animalId);
        return animal;
    } catch (error) {
        console.log(error);
    }
}

async function getAnimalPictureById(animalId) {
    try {
        var animal = await animalRepository.getAnimalById(animalId);
        return animal.picture;
    } catch (error) {
        console.error(error);
    }
}

async function getAnimalsFilter(breed, age, gender){
    try{
        let animais = await animalRepository.getAnimalsFilter(breed, age, gender);
        return animais;
    } catch(error){
        console.error(error);
    }
}

async function createAnimal(animal) {
    try {
        await animalRepository.createAnimal(animal);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllAnimals, getAnimalById, getAnimalPictureById, createAnimal , getAnimalsFilter};