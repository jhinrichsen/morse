// Morse code as of ITU M.1677-1-200910.

package morse

type Table map[rune]string

var icuTable = Table{
	'a': ".-",
	'b': "-...",
	'c': "-.-.",
	'd': "-..",
	'e': ".",
	'f': "..-.",
	'g': "--.",
	'h': "....",
	'i': "..",
	'j': ".---",
	'k': "-.-",
	'l': ".-..",
	'm': "--",
	'n': "-.",
	'o': "---",
	'p': ".--.",
	'q': "--.-",
	'r': ".-.",
	's': "...",
	't': "-",
	'u': "..-",
	'v': "...-",
	'w': ".--",
	'x': "-..-",
	'y': "-.--",
	'z': "--..",

	'1': ".----",
	'2': "..---",
	'3': "...--",
	'4': "....-",
	'5': ".....",
	'6': "-....",
	'7': "--...",
	'8': "---..",
	'9': "----.",
	'0': "-----",

	'.':  ".-.-.-",
	',':  "--..--",
	':':  "---...",
	'?':  "..--..",
	'\\': ".----.",
	'-':  "-....-",
	'/':  "-..-.",
	'(':  "-.--.",
	')':  "-.--.-",
	'\'': ".-..-.",
	'=':  "-...-",
	'+':  ".-.-.",
	'*':  "-..-",
	'@':  ".--.-.",
}

var controlTable = map[string]string{
	"understood":             "...-.",
	"error":                  "........",
	"invitation_to_transmit": "-.-",
	"wait":        ".-...",
	"end_of_work": "...-.-",
	// To precede every transmission
	"start": "-.-.-",
}
