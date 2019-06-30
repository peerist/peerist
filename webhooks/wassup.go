package handler

import (
	"fmt"
	"net/http"
)

// Handler stuff
func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Called")
	fmt.Fprintf(w, "Wassup")
}
