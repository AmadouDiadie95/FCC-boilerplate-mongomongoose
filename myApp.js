require('dotenv').config();
let mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
;

var Schema = mongoose.Schema;
var PersonSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String, unique: true }]
});
let Person = mongoose.model('Person', PersonSchema);


const createAndSavePerson = (done) => {
  const person = new Person({ name: 'John', age: 23, favoriteFoods: ['Chicken'] });
  person.save((err, data) => err ? done(null) : done(null, data));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => err ? done(err) : done(null, data));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => err ? done(err) : done(null, data));
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => err ? done(err) : done(null, data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById({ _id: personId }, function(err, data) {
    if (err) {
      return done(err);
    }
    else {
      data.favoriteFoods.push(foodToAdd);
      data.save((err, data) => err ? done(err) : done(null, data));

    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, data) => {
      if (err)
        done(err);
      done(null, data);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(error, data) {
    error ? done(error) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 'asc' }).limit(2).select("-age").exec(function(error, people) {
    if (error) {
      done(error);
    }

    done(null, people);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
