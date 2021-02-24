package index

import "github.com/gofiber/fiber/v2"

func AccountGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Render("account", fiber.Map{
			"Title": "Account",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/")
}
