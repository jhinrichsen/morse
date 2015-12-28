// Morse test cases

const expect = require('chai').expect;

const morse = require('./index');

describe('morse', function () {
  describe('#encode()', function () {
    it('should return the proper morse code in . and - notation', 
        function () {
      expect(morse.encode('morse code'))
        .to
        .equal('- -   - - -   . - .   . . .   .       - . - .   ' +
          '- - -   - . .   .');
      expect(morse.encode('FREIE ENZYKLOPAEDIE'))
          .to
          .equal('. . - .   . - .   .   . .   .       .   - .   - - ' +
            '. .   - . - -   - . -   . - . .   - - -   . - - .   . -' +
            '   .   - . .   . .   .');
    });
  });
  describe('#signal()', function () {
    it('should return the proper transmission ready on/off pulsed signal', 
        function () {
      expect(morse.signal('e')).to.equal("1");
      expect(morse.signal('ee')).to.equal( 
          "1" + 
          "000" + // letter separator
          "1");
    });
  });
  describe('#toWikipediaNotation', function () {
    it('should return a series of = and _', function () {
      expect(morse.signal('morse code')
          .split('')
          .map(morse.toWikipediaNotation)
          .join(''))
        .to
        .equal('===_===___===_===_===___=_===_=___=_=_=___=_______' +
            '===_=_===_=___===_===_===___===_=_=___=');
    })
  })
});

// EOF
