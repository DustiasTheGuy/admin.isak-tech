package index

import (
	models "admin/models/user"
	"admin/routes"
	"database/sql"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/mysql"
)

// SessionData contains useful information about a session
type SessionData struct {
	ID       uint
	Username string
	Email    string
	Admin    int8
}

// Store is a new mysql sessions storage
var Store = session.New(session.Config{
	Storage: mysql.New(mysql.Config{
		Username: "root",
		Password: "password",
		Database: "isak_tech_admin",
		Table:    "fiber_storage",
	}),
})

func ParsePrivileges(sessData interface{}) int8 {
	fmt.Printf("Parsing: %v\n", &sessData)

	value, ok := sessData.(SessionData)

	if !ok {
		fmt.Println("Parsing Error")
		return 0
	}

	fmt.Printf("User Admin Level: %d\n", value.Admin)

	return value.Admin
}

// GetSession get the current session as a pointer
func GetSession(c *fiber.Ctx) *session.Session {
	sess, err := Store.Get(c)

	if err != nil {
		panic(err)
	}

	return sess
}

// FormValidationRouter routes the incomming form validation post request
func FormValidationRouter(c *fiber.Ctx) error {
	switch c.Params("form") {
	case "sign-in":
		return SignInFormValidation(c)
	case "sign-up":
		return SignUpFormValidation(c)
	default:
		return c.JSON(routes.HTTPResponse{
			Message: "Internal Server Error",
			Success: false,
			Data:    nil,
		})
	}
}

// SignUpFormValidation checks if a user with the requested username exists
func SignUpFormValidation(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	_, err := user.GetUserByUsername()

	if err == sql.ErrNoRows {
		return c.JSON(routes.HTTPResponse{
			Message: "No user with that username",
			Success: true,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "User with that username might already exist",
		Success: false,
		Data:    nil,
	})
}

// SignInFormValidation checks if a user exists before making a form submission
func SignInFormValidation(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	_, err := user.GetUserByUsername()

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Error",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "",
		Success: true,
		Data:    nil,
	})
}
