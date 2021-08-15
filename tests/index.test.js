const { validateOIB, validateJMBG } = require('./../src/index');
const { generatePossibleOIB, generatePossibleJMBG } = require('./../src/index');

const assert = require('assert');

describe('Validate OIB and JMBG', function() {

  it('OIB', function(done) {
    assert.strictEqual(validateOIB(3), false);
    assert.strictEqual(validateOIB('00000000001'), true);
    assert.strictEqual(validateOIB('00000000003'), false);
    done();
  })

  it('JMBG', function(done) {
    assert.strictEqual(validateJMBG(3), false);
    assert.strictEqual(validateJMBG('0000000000000'), true);
    assert.strictEqual(validateJMBG('0000000000001'), false);
    assert.strictEqual(validateJMBG('0000000000002'), false);
    assert.strictEqual(validateJMBG('0000000000003'), false);
    assert.strictEqual(validateJMBG('0000000000004'), false);
    assert.strictEqual(validateJMBG('0000000000005'), false);
    assert.strictEqual(validateJMBG('0000000000006'), false);
    assert.strictEqual(validateJMBG('0000000000007'), false);
    assert.strictEqual(validateJMBG('0000000000008'), false);
    assert.strictEqual(validateJMBG('0000000000009'), false);
    done();
  })

});

describe('Generate random valid OIB and JMBG', function() {

  it('Generate OIB', function(done) {
    const newOIB = generatePossibleOIB();
    // console.log(`Generated OIB: ${newOIB}`, validateOIB(newOIB));
    assert.strictEqual(validateOIB(newOIB), true);
    done();
  })

  it('JMBG', function(done) {
    const newJMBG = generatePossibleJMBG();
    // console.log(`Generated JMBG: ${newJMBG}`, validateJMBG(newJMBG));
    assert.strictEqual(validateJMBG(newJMBG), true);
    done();
  })

});