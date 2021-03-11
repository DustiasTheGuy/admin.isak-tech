package users

import (
	userModels "admin/models/user"
	"admin/routes"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SignOutController destroy a session and sign user out
func SignOutController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		if err := index.GetSession(c).Destroy(); err != nil {
			return c.Redirect("/sign-in?err=session invalid")
		}

		return c.Redirect("/sign-in?s=farewell user")
	}

	return c.Redirect("/?err=please sign in")
}
