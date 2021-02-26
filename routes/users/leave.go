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
			return c.Redirect("/sign-in?err=session invalid")
		}

		return c.Redirect("/sign-in?s=farewell user")
	}

	return c.Redirect("/?err=please sign in")
}
