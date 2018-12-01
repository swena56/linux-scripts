
let mongoose = require('mongoose');

let database_name = 'database';
mongoose.connect(`mongodb://localhost:27017/${database_name}`, { useNewUrlParser: true });
let db = mongoose.connection;

let Kitten = require('./schema/kitten');

let fluffy = Kitten({ name: 'test', age: 5 });
fluffy.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});



// let results = [];

// results = Kitten.find();


 Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

// kittySchema.methods.speak = function () {
//         var greeting = this.name
//           ? "Meow name is " + this.name
//           : "I don't have a name";
//         console.log(greeting);
//       };

let database = {
    create: function(name){

      if( !name ){
        throw Error('Need name for first parameter');
      }
     
    },

    read: function(){

        let results = [];

        Kitten.find(function (err, kittens) {
          if (err) return console.error(err);
          console.log(kittens);
          results.push(kittens);
        });

        return results;
        // Kitten.find({ name: /^fluff/ }, function(item){
        //   console.log('a',item);
        // });
    },
    update: function(){},
    delete: function(){},
};

// database.create('fluffy');
// db.close();
//module.exports = database;

