// Morse code as of ITU M.1677-1-200910.

const assert = require('chai').assert;
const curry = require('curry');
const expect = require('chai').expect;
const table = require('./table').table;

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
// :: Int
const wordDotRatio = 7;

// Encode text into morse.
// :: Map -> String -> String
const encode = exports.encode = curry((ctx, s) => {
  return s
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word
        .split('')
        .map(letter => {
          return ctx.lookup(letter)
          .split('')
          .map(ctx.symbolMapper)
          .join(ctx.pause.repeat(symbolDotRatio));
        })
        .join(ctx.pause.repeat(letterDotRatio));
    })
    .join(ctx.pause.repeat(wordDotRatio));
});

const morseCtx = {
  "lookup": letter => table[letter],
  "pause": " ",
  // Identity mapper for morse symbols
  "symbolMapper": symbol => symbol
};

const code = exports.code = encode(morseCtx);

const ditDah = symbol => {
  const dit = "1";
  const dah = dit.repeat(dashDotRatio);
  return "-" == symbol ? dah : dit;
};

const signalCtx = {
  "lookup": letter => table[letter],
  "pause": "0",
  "symbolMapper": ditDah
};

const signal = exports.signal = encode(signalCtx);

// Map "0" -> false, "1" -> true
// :: Character -> Boolean
const toBinary = exports.toBinary = n => +n;

// Map '1' to '=' and '0' to '_'
// :: Character -> Character
const toWikipediaNotation = 
  exports.toWikipediaNotation = 
  a => toBinary(a) ? '=' : '_';

// EOF