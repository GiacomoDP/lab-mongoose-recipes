const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // Second iteration
  .then(() => {
    return Recipe.create({
    title:"Carbonara",
    level:"Easy Peasy",
    ingredients: ["Rigatoni", "Guanciale", "Eggs", "Pepper", "Pecorino"],
    cuisine:"Italian",
    dishType:"main_course",
    duration: 15,
    creator: "Giacomo",
  })
  })
  .then((response)=> console.log(response.title))
// Third iteration
.then(() => {
  return Recipe.insertMany([data])
})
.then((response)=> console.log(response.title))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
