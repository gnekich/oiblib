const { validateOIB, validateJMBG } = require('./../src/index');
const { generatePossibleOIB, generatePossibleJMBG } = require('./../src/index');

const assert = require('assert');

describe('Validate OIB and JMBG', function() {

  it('OIB', function(done) {
    assert.equal(validateOIB(3), false);
    assert.equal(validateOIB('00000000001'), true);
    assert.equal(validateOIB('00000000003'), false);
    done();
  })

  it('JMBG', function(done) {
    assert.equal(validateJMBG(3), false);
    assert.equal(validateJMBG('0000000000000'), true);
    assert.equal(validateJMBG('0000000000001'), false);
    assert.equal(validateJMBG('0000000000002'), false);
    assert.equal(validateJMBG('0000000000003'), false);
    assert.equal(validateJMBG('0000000000004'), false);
    assert.equal(validateJMBG('0000000000005'), false);
    assert.equal(validateJMBG('0000000000006'), false);
    assert.equal(validateJMBG('0000000000007'), false);
    assert.equal(validateJMBG('0000000000008'), false);
    assert.equal(validateJMBG('0000000000009'), false);
    done();
  })

});

describe('Generate random valid OIB and JMBG', function() {

  it('Generate OIB', function(done) {
    const newOIB = generatePossibleOIB();
    // console.log(`Generated OIB: ${newOIB}`, validateOIB(newOIB));
    assert.equal(validateOIB(newOIB), true);
    done();
  })

  it('JMBG', function(done) {
    const newJMBG = generatePossibleJMBG();
    // console.log(`Generated JMBG: ${newJMBG}`, validateJMBG(newJMBG));
    assert.equal(validateJMBG(newJMBG), true);
    done();
  })

});