const Cryptr = require('cryptr');
const cryptr = new Cryptr('SecuredKey@123');
 
const encryptedString = cryptr.encrypt('password');//original String
const decryptedString = cryptr.decrypt(encryptedString);
 
console.log(encryptedString); 
console.log(decryptedString); 