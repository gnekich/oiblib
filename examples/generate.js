const {
  validateOIB,
  validateJMBG,
  generatePossibleOIB,
  generatePossibleJMBG,
} = require('./../src/index');

// Generate new valid OIB
const newOIB = generatePossibleOIB();
console.log(`Generated OIB: ${newOIB}, is valid oib: ${validateOIB(newOIB)}`);

// Generate new valid JMBG
const newJMBG = generatePossibleJMBG();
console.log(`Generated JMBG: ${newJMBG}, is valid jmbg: ${validateJMBG(newJMBG)}`);
