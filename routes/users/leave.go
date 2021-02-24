package users

import (
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SignOutController destroy a session and sign user out
func SignOutController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		if err := index.GetSession(c).Destroy(); err != nil {
			panic(err)
		}

		return c.Redirect("/sign-in")
	}

	return c.Redirect("/")
}