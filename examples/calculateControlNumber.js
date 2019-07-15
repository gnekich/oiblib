const {
  transformStringToArrayOfDigits,
  calculateOIBControlNumber,
  calculateJMBGControlNumber,
} = require('./../src/index');

const inputOIB = '1234567890';
const OIBControlNumber = calculateOIBControlNumber(transformStringToArrayOfDigits(inputOIB)); // Note 10 digits
console.log(`For first 10 digits of OIB: ${inputOIB}, the control number is: ${OIBControlNumber}`);

const inputJMBG = '010199036000';
const JMBGControlNumber = calculateJMBGControlNumber(transformStringToArrayOfDigits(inputJMBG)); // Note 12 digits
console.log(`For first 12 digits of JMBG: ${inputJMBG}, the control number is: ${JMBGControlNumber}`);
