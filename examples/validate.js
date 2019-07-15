const { validateOIB, validateJMBG } = require('./../src/index');

// Valid OIB
console.log(validateOIB('00000000001')); // true

// Invalid OIB
console.log(validateOIB('00000000003')); // false

// Valid JMBG
console.log(validateJMBG('0101990360007')); // true

// Invalid JMBG
console.log(validateJMBG('0101990360005')); // false
