// Morse code as of ITU M.1677-1-200910.
//
// As Morse code is a digital protocol at the bottom (signal / no signal), it
// is represented using true (signal) and false (no signal).

// Look mom - no var!
// Look dad - no for!

const assert = require('chai').assert;
const expect = require('chai').expect;
const table = require('./table').table;

// Representation of a long 'dah'
const dah = '-';

// Representation of a short 'dit'
const dit = '.';

// Representation of pause/ break/ nothing
const pause = ' ';

// Return true if character is a long 'dah' in morse notation.
// :: String[1] -> Boolean
const isDah = c => dah === c;

// Avoid .to.be.true because linter will complain about expression
expect(isDah(dah)).to.equal(true);
expect(isDah(dit)).to.equal(false);

// Return true if character is a short 'dit' in morse notation.
// :: String[1] -> Boolean
const isDit = c => dit === c;

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

// Encode text into morse.
// TODO Using a String is suboptimal, because it hardcodes the underlying buffer
// resp. transport representation (could be file based, stream based, ...).
// :: String -> String
const encode = exports.encode = s => {
  const pause = ' ';
  return s
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word
        .split('')
        .map(letter => {
          return table[letter]
          .split('')
          .map(symbol => {
            // Identity mapper
            return symbol;
          })
          .join(pause.repeat(symbolDotRatio));
        })
        .join(pause.repeat(letterDotRatio));
    })
    .join(pause.repeat(wordDotRatio));
};

// Convert a text into a signal, a series of "0" and "1".
// :: String -> String
const signal = exports.signal = s => {
  // ECMAScripts Array.prototype.join() does not offer anything other than
  // Strings, so instead of boolean true and false the implementation is based
  // on characters '0' and '1'.
  const off = '0';
  const on = '1';
  const pause = '0';

  const dit = on.repeat(1);
  const dah = on.repeat(dashDotRatio);
  return s
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word
        .split('')
        .map(letter => {
          return table[letter]
            .split('')
            .map(symbol => {
              return (isDah(symbol) ? dah : dit);
            })
            .join(pause.repeat(symbolDotRatio));
        })
        .join(pause.repeat(letterDotRatio));
    })
    .join(pause.repeat(wordDotRatio));
};

// Map "0" -> false, "1" -> true
// :: Character -> Boolean
const toBinary = exports.toBinary = n => +n;

// Map '1' to '=' and '0' to '_'
// :: Character -> Character
const toWikipediaNotation = 
  exports.toWikipediaNotation = 
  a => toBinary(a) ? '=' : '_';

// EOF