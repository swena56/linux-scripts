const program = require('commander');

const args = require('minimist')(process.argv.slice(2));
// Require logic.js file and extract controller functions using JS destructuring assignment
const { addContact, getContact } = require('./logic');

for (let j = 0; j < process.argv.length; j++) {  
    console.log(j + ' -> ' + (process.argv[j]));
}

console.log(process.argv.length);

if( process.argv.length <= 2 ){
  console.log('exit');
  process.exit(0);
}

program
  .version('0.0.1')
  .description('Contact management system');

const { prompt } = require('inquirer'); // require inquirerjs library

// Craft questions to present to users
const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];

program
  .command('addContact <firstame> <lastname> <phone> <email>')
  .alias('a')
  .description('Add a contact')
  .action((firstname, lastname, phone, email) => {
    addContact({firstname, lastname, phone, email});
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

program.parse(process.argv);