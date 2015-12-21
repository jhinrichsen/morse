// Morse code as of ITU M.1677-1-200910.
//
// As Morse code is a digital protocol at the bottom (signal / no signal), it
// is represented using true (signal) and false (no signal).

// Look mom - no var!
// Look dad - no for!

const assert = require('chai').assert;
const expect = require('chai').expect;

const table = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',

  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',

  '.': '.-.-.-',
  ',': '--..--',
  ':': '---...',
  '?': '..--..',
  '\'': '.----.',
  '-': '-....-',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '"': '.-..-.',
  '=': '-...-',
  '+': '.-.-.',
  '*': '-..-',
  '@': '.--.-.'

};

const controlTable = {
  'understood': '...-.',
  'error': '........',
  'invitation_to_transmit': '-.-',
  'wait': '.-...',
  'end_of_work': '...-.-', 
  // To precede every transmission
  'start': '-.-.-'
};

expect(table.e).to.equal('.');
expect(table['7']).to.equal('--...');

// Representation of a long 'dah'
const dah = '-';

// Representation of a short 'dit'
const dit = '.';

// Representation of pause/ break/ nothing
const pause = ' ';

// Return true if character is a long 'dah' in morse notation.
// :: String[1] -> Boolean
const isDah = c => { return dah === c; };

// Avoid .to.be.true because linter will complain about expression
expect(isDah(dah)).to.equal(true);
expect(isDah(dit)).to.equal(false);

// Return true if character is a short 'dit' in morse notation.
// :: String[1] -> Boolean
const isDit = function (c) {
  return dit === c;
};

expect(isDit(dit)).to.equal(true);
expect(isDit(dah)).to.equal(false);

// 2.1 A dash is equal to three dots.
// :: Int
const dashDotRatio = 3;

// 2.2 The space between the signals forming the same letter is equal to one
// dot.
// :: Int
const symbolDotRatio = 1;

// 2.3 The space between two letters is equal to three dots.
// :: Int
const letterDotRatio = 3;

// 2.4: The space between two words is equal to seven dots.
const wordDotRatio = 7;

// Utility: Flatten array
// :: [a] -> [b]
const flatten = as => { return [].concat.apply([], as); };

// Utility: Create array of length n, and prepopulate with d
// :: a -> Number -> [a]
const mkArray = (d, n) => {
  return Array.apply(null, new Array(n)).map(_ => d);
};

expect(mkArray(true, 2)).to.be.eql([true, true]);
expect(mkArray(0, 3)).to.be.eql([0, 0, 0]);

const mkPause = n => { return mkArray(' ', n).join(''); };
expect(mkPause(2)).to.equal('  ');

// Encode a character text into morse.
// :: String[1] -> String
const encodeLetter = c => { return table[c]; };

expect(encodeLetter('a')).to.equal('.-');

// Encode a word into morse.
// :: String -> String
const encodeWord = s => {
  return s
    .split('')
    .map(encodeLetter)
    .join(mkPause(1));
};

expect(encodeWord('ee')).to.equal('. .');

// Encode text into morse.
// TODO Using a String is suboptimal, because it hardcodes the underlying buffer
// resp. transport representation (could be file based, stream based, ...).
// :: String -> String
const encode = exports.encode = s => {
  return s
    .toLowerCase()
    .split(' ')
    .map(encodeWord)
    .join(mkPause(3));
};

expect(encode('morse code')).to.equal('-- --- .-. ... .   -.-. --- -.. .');
expect(encode('FREIE ENZYKLOPAEDIE'))
    .to
    .equal('..-. .-. . .. .   . -. --.. -.-- -.- .-.. --- .--. .- . -.. .. .');

////////////////////////////////////////////////////////////////////////////////
//
// Signal functions
//
////////////////////////////////////////////////////////////////////////////////

// Map true -> '=' and false -> '_'
// :: Boolean -> Character
const wikipediaNotation = a => { return a ? '=' : '_'; };

expect(wikipediaNotation([ true, true, false ])).to.eql('=', '_', '=');

// Convert a text into a signal (on/ off).
// :: String -> [Boolean]
const signal = exports.signal = s => {
  // ECMAScripts Array.prototype.join() does not offer anything other than
  // Strings, so instead of boolean true and false the implementation is based
  // on characters '0' and '1'.
  const off = '0';
  const on = '1';

  // A little macro-ish like helper
  const sep0 = n => { return mkArray(off, n).join(''); };
  const sep1 = n => { return mkArray(on, n).join(''); };

  const wordSep = sep0(wordDotRatio);
  const letterSep = sep0(letterDotRatio);
  const symbolSep = sep0(symbolDotRatio);

  const dah = sep1(dashDotRatio);
  const dit = sep1(1);
  return s
    .toLowerCase()
    .split(' ')
    .map(word => {
      // console.log('* Word: ' + word);
      return word
        .split('')
        .map(letter => {
          // console.log('* * Letter: ' + letter);
          return encodeLetter(letter)
            .split('')
            .map(symbol => {
              // console.log('* * * Symbol: ' + symbol);
              return (isDah(symbol) ? dah : dit);
            })
            .join(symbolSep);
        })
        .join(letterSep);
    })
    .join(wordSep)
    .split('')
    .map(c => { return c === on ? true : false; });
};

expect(signal('e')).to.eql([true]);
expect(signal('ee')).to.eql([ 
    true, 
    false, false, false, // letter separator
    true ]);

expect(signal('morse code')
    .map(wikipediaNotation)
    .join(''))
  .to
  .equal('===_===___===_===_===___=_===_=___=_=_=___=_______' +
      '===_=_===_=___===_===_===___===_=_=___=');

// EOF
