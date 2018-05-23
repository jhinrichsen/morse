package morse

import (
	"fmt"
	"strings"
)

const (
	// 2.1 A dash is equal to three dots
	dashDotRatio = 3

	// 2.2 The space between the signals forming the same letter is equal to
	// one dot
	symbolDotRatio = 1

	// 2.3 The sapce between two letters is equal to three dots
	letterDotRatio = 3

	// 2.4 The space between two words is equal to seven dots
	wordDotRatio = 7
)

type Mapper func(rune) string

// Code creates morse for a given string
func Code(s string) string {
	// identity mapper
	return encode(s, ' ', func(r rune) string {
		return string(r)
	})
}

// Signal creates a transmission enabled signal
func Signal(s string) string {
	return encode(s, '0', DitDah)
}

const Dit = "1"
const Dah = "111" // strings.Repeat(Dit, dashDotRatio) is not a constant

// DitDah returns Dit for a '.', Dah for a '-', and panics otherwise.
func DitDah(r rune) string {
	switch r {
	case '.':
		return Dit

	case '-':
		return Dah
	default:
		panic(fmt.Errorf("want '.' or '-' but got %c\n", r))
	}
}

// ToBinary maps "0" to false and "1" to true.
// panics otherwise.
func ToBinary(r rune) bool {
	switch r {
	case '0':
		return false
	case '1':
		return true
	default:
		panic(fmt.Errorf("want '0' or '1' but got %+v\n", r))
	}
}

// WikipediaNotation uses = and _
func WikipediaNotation(r rune) rune {
	if ToBinary(r) {
		return '='
	}
	return '_'
}

func encode(s string, pause rune, mapper Mapper) string {
	var sb strings.Builder
	repeat := func(r rune, n int) {
		for i := 0; i < n; i++ {
			sb.WriteRune(r)
		}
	}
	words := strings.Fields(strings.ToLower(s))
	for i, word := range words {
		for j, letter := range word {
			t := icuTable[letter]
			for k, symbol := range t {
				mapped := mapper(symbol)
				sb.WriteString(mapped)
				// separator if more to come
				if k+1 < len(t) {
					repeat(pause, symbolDotRatio)
				}
			}
			if j+1 < len(word) {
				repeat(pause, letterDotRatio)
			}
		}
		if i+1 < len(words) {
			repeat(pause, wordDotRatio)
		}
	}
	return sb.String()
}
