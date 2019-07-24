package handler

import (
	"fmt"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello.go called.")
	fmt.Fprintf(w, "Hello, world!")
}