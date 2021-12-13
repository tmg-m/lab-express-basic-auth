// app.js
const bcrypt = require('bcryptjs');
const saltRounds = 10;          //more the better usually 10 

const plainPassword1 = 'HelloWorld';
const plainPassword2 = 'helloworld';

const salt = bcrypt.genSaltSync(saltRounds);

const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

const verifyPass1 = bcrypt.compareSync(plainPassword1, hash1);
const verifyPass2 = bcrypt.compareSync('some wrong password', hash2);
