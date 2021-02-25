package users

import (
	userModels "admin/models/user"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// AccountGetController renders the account template where a user can view their account information
func AccountGetController(c *fiber.Ctx) error {
	var err error
	user := index.GetSession(c).Get("User")
	x, ok := user.(index.SessionData)

	if !ok {
		panic("type assertion failed")
	}

	tempUser := userModels.User{Username: x.Username}

	user, err = tempUser.GetUserByUsername()

	if err != nil {
		panic(err)
	}

	if user != nil {
		return c.Render("account", fiber.Map{
			"Title": "Account",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/")
}
