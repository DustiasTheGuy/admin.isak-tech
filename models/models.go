package models

func CheckLength(str string, minLength int) bool {
	return len(str) >= minLength
}
