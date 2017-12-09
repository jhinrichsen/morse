package morse

// Morse code as of ITU M.1677-1-200910.
// Golang is different to other languages w/ regard to strings. No wonder considering one of
// the creators also created UTF-8.
// For a detailed introduction, check out https://blog.golang.org/strings

const (
	// 2.1 A dash is equal to three dots
	dashDotRatio = 3

	// 2.2 The space between the signals forming the same letter is equal to one dot
	symbolDotRatio = 1

	// 2.3 The sapce between two letters is equal to three dots
	letterDotRatio = 3

	// The space between two worlds is equal to seven dots
	wordDotRatio = 7
)

type table interface {
	lookup(string) string
	pause() string
	symbolMapper(string) string
}

type morseTable struct{}

func (a morseTable) lookup(r string) string {
	return icuTable[r]
}

func (a morseTable) pause() string {
	return " "
}

// identity mapper for morse symbols
func (a morseTable) symbolMapper(s string) string {
	return s
}

func encode(t table, s string) string {
	return ""
}

// Code creates morse for a given string
func Code(s string) string {
	return encode(morseTable{}, s)
}

// Signal creates a transmission enabled signal
func Signal(s string) string {
	// TODOreturn encode(signalTable, s)
	return ""
}

// ToBinary maps "0" -> false, other -> true
func ToBinary(r rune) bool {
	if r == '0' {
		return false
	}
	return true
}

// WikipediaNotation uses = and _
func WikipediaNotation(r rune) rune {
	if ToBinary(r) {
		return '='
	}
	return '_'
}
