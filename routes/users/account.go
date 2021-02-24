package users

import (
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// AccountGetController renders the account template where a user can view their account information
func AccountGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("account", fiber.Map{
			"Title": "Account",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/")
}
