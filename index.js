// Morse code as of ITU M.1677-1-200910

var expect = require('chai').expect

var table = {
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

var e = table['e'];
expect(e).to.equal('.')
var _7 = table['7'];
expect(_7).to.equal('--...')

// encodeChar :: String -> String
var encodeChar = function (c) {
  return table[c]
}

expect(encodeChar('a')).to.equal('.-')



