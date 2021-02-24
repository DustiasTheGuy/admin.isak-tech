package routes

// HTTPResponse is how any json response should be formatted so the client always gets the same data
type HTTPResponse struct {
	Message string      `json:"message"`
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
}
