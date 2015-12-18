// Morse code as of ITU M.1677-1-200910.
//
// As Morse code is a digital protocol at the bottom (signal / no signal), it
// is represented using true (signal) and false (no signal).

const assert = require('chai').assert
const expect = require('chai').expect

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
  '0': '-----'

  // TODO Add punctuation from 1.1.3
};

const e = table['e'];
expect(e).to.equal('.')
const _7 = table['7'];
expect(_7).to.equal('--...')

// :: String -> String
const encodeChar = function (c) {
  return table[c]
}

expect(encodeChar('a')).to.equal('.-')

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

// 2.4 The space between two words is equal to seven dots.
// :: Int
const wordDotRatio = 3;

// Return true if character is a dot in morse notation.
// :: String[1] -> Boolean
const isDot = function (c) {
  return '.' === c;
}
expect(isDot('.')).to.be.true;
expect(isDot('-')).to.be.false;

// Convert from morse notation ('.' and '-') into a bit pulse (true and false).
// :: String[1] -> [Boolean]
const encode = function(morse) {
  assert.equal(1, morse.length);
  return (isDot(morse)
    ? [ true ]
    // 2.1 
    : Array.apply(null, new Array(dashDotRatio)).map(_ => true))
    // 2.2
    // This hardcoded array does not take symbolDotRatio into account.
    // Once Morse itself changes, i need to update the next line...
    // push() returns the last index pushded to, which will be the return value
    // of the function - bad
    // .push(false);
    .concat([ false ])
}
expect(encode('.')).to.be.an('array');
expect(encode('.')).to.have.length(2);
expect(encode('.')).to.eql([ true, false ]);

// :: [a] -> [b]
const flatten = function (as) {
  return [].concat.apply([], as);
}

const encodeLetter = function(morse) {
  return flatten(morse.split('').map(encode))
}

console.log(encodeLetter('--...'));
expect(encodeLetter('--...')).to.eql([ true, true, true, false, 
    true, true, true, false, 
    true, false,
    true, false,
    true, false
  ]);

// Convert a morse bit into Wikipedia Notation, i.e. '=' for true and '.' for
// false.
// :: boolean -> String[1]
const wikipediaNotation = function (b) {
  return b ? '=' : '.'
}
expect([ true, true, false, true, false ]
    .map(wikipediaNotation)
    .join(''))
  .to.equal('==.=.')

const s1 = encodeLetter('morse code')
const s2 = '===.===...===.===.===...=.===.=...=.=.=...=' +
  '.......===.=.===.=...===.===.===...===.=.=...='
expect(s1).to.equal(s2);

// EOF
