let crud = require('./crud-database');


//crud.delete('cars')
crud.create('cars',{'name': 'innoson','price':'$4000'});
crud.update('cars-updated',{name:'Toyota',price:'$550'})
let r = crud.read('cars');
console.log(r);
