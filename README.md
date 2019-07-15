# OIBLIB [![npm version](https://badge.fury.io/js/oiblib.svg)](https://www.npmjs.com/package/oiblib )

OIBLIB - Library for validating and generating Croatian permanent national identification number \"OIB\", it is a number of every Croatian citizen and legal persons domiciled in the Republic of Croatia.

https://en.wikipedia.org/wiki/Personal_identification_number_(Croatia)

[![NPM](https://nodei.co/npm/oiblib.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/oiblib )

It also supports checks for legacy \"unique master citizen number\" also known as \"JMBG\".

https://en.wikipedia.org/wiki/Unique_Master_Citizen_Number

## Installation

### npm
```bash
$ npm i oiblib --save
```

### yarn
```bash
$ yarn add oiblib
```

## Example

````javascript
const oiblib = require('oiblib');
const { validateOIB, validateJMBG } = oiblib;

// Valid OIB
console.log(validateOIB('00000000001')); // true

// Invalid OIB
console.log(validateOIB('00000000003')); // false

// Valid JMBG
console.log(validateJMBG('0101990360007')); // true

// Invalid JMBG
console.log(validateJMBG('0101990360005')); // false

````

````javascript
const {
  validateOIB,
  validateJMBG,
  generatePossibleOIB,
  generatePossibleJMBG,
} = require('oiblib');

// Generate new valid OIB
const newOIB = generatePossibleOIB();
console.log(`Generated OIB: ${newOIB}, is valid oib: ${validateOIB(newOIB)}`);

// Generate new valid JMBG
const newJMBG = generatePossibleJMBG();
console.log(`Generated JMBG: ${newJMBG}, is valid jmbg: ${validateJMBG(newJMBG)}`);

````

````javascript
const {
  transformStringToArrayOfDigits,
  calculateOIBControlNumber,
  calculateJMBGControlNumber,
} = require('oiblib');

const inputOIB = '1234567890'; // Note 10 digits
const OIBControlNumber = calculateOIBControlNumber(transformStringToArrayOfDigits(inputOIB));
console.log(`For first 10 digits of OIB: ${inputOIB}, the control number is: ${OIBControlNumber}`);

const inputJMBG = '010199036000'; // Note 12 digits
const JMBGControlNumber = calculateJMBGControlNumber(transformStringToArrayOfDigits(inputJMBG));
console.log(`For first 12 digits of JMBG: ${inputJMBG}, the control number is: ${JMBGControlNumber}`);

````

- See `./examples` for more examples.

## Note

OIB and JMBG are NOT numbers, you should consider both OIB and JMBG to always be a string, thus sending anything else than a string type to `validateOIB` or `validateJMBG` should return `false`.

`calculateOIBControlNumber` and `calculateJMBGControlNumber` are looking for array of numbers, in order to do \"control number\" calculation, for that you can use helper function `transformStringToArrayOfDigits`. It transforms `'1234567890'` to `[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]`

## Todo

- [ ] Fully support JMBG
  - [x] Generate valid JMBG based on random date.
  - [ ] validateJMBG should check if parts of predefined digits are in range. (DD, MM, YYY, RR, BBB, K)
  - [ ] JMBG parsing to extract (DD, MM, YYY, RR, BBB, K)
  - [ ] Pass params to random JBMG generator to respect predefined options like (DD, MM, YYY, RR, BBB, K)

## Thanks

+ [Gordan Nekić](https://github.com/gnekich)

## Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3


## MIT license
Copyright (c) 2019 Gordan Nekić

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
