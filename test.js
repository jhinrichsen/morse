const assert = require('chai').assert;
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
      expect(morse.signal('e')).to.eql([true]);
      expect(morse.signal('ee')).to.eql([ 
          true, 
          false, false, false, // letter separator
          true ]);
    });
  });
});

// EOF
