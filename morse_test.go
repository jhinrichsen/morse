package morse

import (
	"testing"
)

func TestIcuTableE(t *testing.T) {
	want := "."
	got := icuTable['e']
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestIcuTable7(t *testing.T) {
	want := "--..."
	got := icuTable['7']
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestCodeSample1(t *testing.T) {
	want := "- -   - - -   . - .   . . .   .       - . - .   " +
		"- - -   - . .   ."
	got := Code("morse code")
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestCodeSample2(t *testing.T) {
	want := ". . - .   . - .   .   . .   .       .   - .   - - " +
		". .   - . - -   - . -   . - . .   - - -   . - - .   . -" +
		"   .   - . .   . .   ."
	got := Code("FREIE ENZYKLOPAEDIE")
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestSignalE(t *testing.T) {
	want := "1"
	got := Signal("e")
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestSignalEe(t *testing.T) {
	want := "1" + // e
		"000" + // letter separator
		"1" // e
	got := Signal("ee")
	if want != got {
		t.Errorf("want %s but got %s\n", want, got)
	}
}

func TestWikipediaNotation(t *testing.T) {
	want := "===_===___===_===_===___=_===_=___=_=_=___=_______" +
		"===_=_===_=___===_===_===___===_=_=___="
	s := Signal("morse code")
	var got string
	for _, r := range s {
		got += string(WikipediaNotation(r))
	}
	if want != got {
		t.Errorf("\nwant: %s\ngot:  %s\n", want, got)
	}
}
