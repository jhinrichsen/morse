// Morse code as of ITU M.1677-1-200910.
//
// As Morse code is a digital protocol at the bottom (signal / no signal), it
// is represented using true (signal) and false (no signal).

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
  '0': '-----'

  // TODO Add punctuation from 1.1.3
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
const isDah = function (c) {
  return dah === c;
};

expect(isDah(dah)).to.be.true;
expect(isDah(dit)).to.be.false;

// Return true if character is a short 'dit' in morse notation.
// :: String[1] -> Boolean
const isDit = function (c) {
  return dit === c;
};

expect(isDit(dit)).to.be.true;
expect(isDit(dah)).to.be.false;

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
const flatten = function (as) {
  return [].concat.apply([], as);
};

// Utility: Create array of length n, and prepopulate with d
// :: a -> Number -> [a]
const mkArray = function (d, n) {
  return Array.apply(null, new Array(n)).map(_ => d);
};

expect(mkArray(true, 2)).to.be.eql([true, true]);
expect(mkArray(0, 3)).to.be.eql([0, 0, 0]);

const mkPause = function (n) {
  return mkArray(' ', n).join('');
}
expect(mkPause(2)).to.equal('  ');

// Encode a character text into morse.
// :: String[1] -> String
const encodeLetter = function (c) {
  return table[c];
};

expect(encodeLetter('a')).to.equal('.-');

// Encode a word into morse.
// :: String -> String
const encodeWord = function(s) {
  // HERE const separator = mkPause(3);
  const separator = mkPause(1);
  return s.split('').map(encodeLetter).join(separator);
}

expect(encodeWord('ee')).to.equal('. .');

// Encode text into morse.
// Follows ITU spec 2.4: The space between two words is equal to seven dots.
// TODO Using a String is suboptimal, because it hardcodes the underlying buffer
// resp. transport representation (could be file based, stream based, ...).
// :: String -> String
const encode = function (s) {
  // HERE const separator = mkPause(wordDotRatio);
  const separator = mkPause(3);
  return s
    .toLowerCase()
    .split(' ')
    .map(encodeWord)
    .join(separator);
}

expect(encode('morse code')).to.equal('-- --- .-. ... .   -.-. --- -.. .');
expect(encode('FREIE ENZYKLOPAEDIE'))
    .to
    .equal('..-. .-. . .. .   . -. --.. -.-- -.- .-.. --- .--. .- . -.. .. .');

// Convert morse into time notation, where short is represented as '.' and
// a long '-' as '='.
// Characters other than 'dit' and 'dah' are represented as '?'.
// :: String[1] -> String[1]
const timeNotation = function (b) {
  return isDit(b) ? '.' : (isDah(b) ? '=' : '?');
};
expect(table.c
    .split('')
    .map(timeNotation)
    .join(''))
  .to.equal('=.=.');

const s3 = '===.===...===.===.===...=.===.=...=.=.=...=' +
  '.......===.=.===.=...===.===.===...===.=.=...=';
// EOF
