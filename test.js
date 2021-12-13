// app.js
const bcrypt = require('bcryptjs');
const saltRounds = 10;          //more the better usually 10 

const plainPassword1 = 'HelloWorld';
const plainPassword2 = 'HelloWorld';

const salt = bcrypt.genSaltSync(saltRounds);

const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

const verifyPass1 = bcrypt.compareSync(plainPassword1, hash1);
const verifyPass2 = bcrypt.compareSync(plainPassword1, hash2);

console.log(`Hash 1: ${hash1}`);
console.log(`Hash 2: ${hash2}`);
console.log('----------------------------------------');
console.log(`Is plainPassword1 corresponding to the created hash1: ${verifyPass1}`);
console.log(`Is plainPassword2 corresponding to the created hash2: ${verifyPass2}`);

if( verifyPass2 !== true) {
    console.log("your password is not the same, please reenter password")
} else {
    console.log("Both of your password is the same")
}
