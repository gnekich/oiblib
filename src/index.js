/*
  OIB Library in Javascript
  Author: Gordan Nekić <gordan@neki.ch>
  Email: <gordan@neki.ch>
  Date: 13.07.2019.
*/
// --------------------------------------------------------------------------------
// Helper functions.

// Number padding with zero characters. (and yes, you can do it with padStart)
const padNumber = (numIn, size, char = '0') => {
  const num = `${numIn}`;
  return (Array(size + 1).join(`${char}`) + num).substr(-size);
};

// Trying to support regular Javascript number type as valid oib input.
const transformJsTypeToValidOibString = (inputObj) => {
  if (typeof inputObj === 'number') { return `${padNumber(inputObj, 11, '0')}`; }
  if (typeof inputObj === 'string') { return inputObj; }
  return `${padNumber(inputObj, 11, '0')}`;
};

// Transform input to array of numbers
const transformStringToArrayOfDigits = (input) => {
  const oibStrInput = `${input}`;
  const arrayNumbersOibDigits = oibStrInput.split('').map((item) => {
    return parseInt(item, 10);
  });
  return arrayNumbersOibDigits;
};

// Used to get random first 10 digits of possible oib number or first 12 for jmbg.
const randomId = (_n, _possible) => {
  let text = '';
  const possible = _possible || 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < _n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// --------------------------------------------------------------------------------
// OIB Calculations etc.

// Calculate OIB control number. Ref: ISO7064, MOD 11,10
const calculateOIBControlNumber = (arrayOfTenNumbersOibDigits) => {
  // Reference: https://regos.hr/app/uploads/2018/07/KONTROLA-OIB-a.pdf
  const preCalculatedControlNumber = arrayOfTenNumbersOibDigits.reduce((acc, item) => {
    acc = acc + item;
    acc = acc % 10;
    if (acc === 0) {
      acc = 10;
    }
    acc = acc * 2;
    acc = acc % 11;

    return acc;
  }, 10); // Note that we start with the value of 10.

  // 11 has to be reduced by preCalculatedControlNumber, if it is 10 then it is 0.
  const elevenMinusPreCalculatedControlNumber = 11 - preCalculatedControlNumber;
  const calculatedControlNumber = (elevenMinusPreCalculatedControlNumber ===  10) ? 0 : elevenMinusPreCalculatedControlNumber;

  // Return the final value.
  return calculatedControlNumber;
};

// Validate OIB by parsing control number and comparing it with an input.
const validateOIB = (oib) => {
  // Check if input is a string.
  if (typeof oib !== 'string') { return false; }

  // Check if string matches the 11 digit format 10 + "checksum" (control number).
  const oibPattern = /^(\d{11})$/;
  if (!oib.match(oibPattern)) { return false; }

  // Parse all string digits to Array of number types.
  const oibDigits = oib.split('').map((item) => {
    return parseInt(item, 10);
  });

  // Extract control number.
  const inputControlNumber = oibDigits.pop(); // Get and remove the last digit.

  // Do the actual math.
  const calculatedControlNumber = calculateOIBControlNumber(oibDigits);

  // Boolean
  const isValid = inputControlNumber === calculatedControlNumber;

  return isValid;
};

// Generate random number that has valid control number. (Fake but possible OIB)
const generatePossibleOIB = () => {
  const oibWithoutControlNumberInput = `${randomId(10, '0123456789')}`;
  const calculatedControlNumber = calculateOIBControlNumber(transformStringToArrayOfDigits(oibWithoutControlNumberInput));
  // Return both the random and control number
  return `${oibWithoutControlNumberInput}${calculatedControlNumber}`;
};

// --------------------------------------------------------------------------------
// JMBG Calculations etc.

// Check for JMBG control number.
const calculateJMBGControlNumber = (jmbgWithoutControlNumber) => {
  const elevenMinusPreCalculatedControlNumber = 11 - ( 7*(jmbgWithoutControlNumber[0]+jmbgWithoutControlNumber[6]) + 6*(jmbgWithoutControlNumber[1]+jmbgWithoutControlNumber[7]) + 5*(jmbgWithoutControlNumber[2]+jmbgWithoutControlNumber[8]) + 4*(jmbgWithoutControlNumber[3]+jmbgWithoutControlNumber[9]) + 3*(jmbgWithoutControlNumber[4]+jmbgWithoutControlNumber[10]) + 2*(jmbgWithoutControlNumber[5]+jmbgWithoutControlNumber[11]) ) % 11;
  const calculatedControlNumber = (elevenMinusPreCalculatedControlNumber > 9) ? 0 : elevenMinusPreCalculatedControlNumber;

  // Return the final value.
  return calculatedControlNumber;
};

// Validate JMBG by parsing control number and comparing it with an input.
const validateJMBG = (jmbg) => {
  // Check if input is a string.
  if (typeof jmbg !== 'string') { return false; }

  // Check if string matches the 13 digit format 12 + "checksum" (control number).
  const jmbgPattern = /^(\d{13})$/;
  if (!jmbg.match(jmbgPattern)) { return false; }

  // Parse all string digits to Array of number types.
  const jmbgDigits = jmbg.split('').map((item) => {
    return parseInt(item, 10);
  });

  // Extract control number.
  const inputControlNumber = jmbgDigits.pop(); // Get and remove the last digit.

  // Do the actual math.
  const calculatedControlNumber = calculateJMBGControlNumber(jmbgDigits);

  // Boolean
  const isValid = inputControlNumber === calculatedControlNumber;

  return isValid;
};

// Generate random number that has valid control number. (Fake but possible JMBG)
const generatePossibleJMBG = () => {
  const jmbgWithoutControlNumberInput = `${randomId(12, '0123456789')}`;
  const calculatedControlNumber = calculateJMBGControlNumber(transformStringToArrayOfDigits(jmbgWithoutControlNumberInput));
  // Return both the random and control number
  return `${jmbgWithoutControlNumberInput}${calculatedControlNumber}`;
};

module.exports = {
  transformStringToArrayOfDigits,
  calculateOIBControlNumber,
  calculateJMBGControlNumber,
  validateOIB,
  validateJMBG,
  isOIB: validateOIB,
  isJMBG: validateJMBG,
  checkOIB: validateOIB,
  checkJMBG: validateJMBG,
  generatePossibleOIB,
  generatePossibleJMBG,
};