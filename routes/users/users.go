package users

import (
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

func IsakTechGetHandler(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("isak-tech", fiber.Map{
			"Title": "Isak Tech",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/sign-in")
}

func IsakTechPortalGetHandler(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("isak-tech-portal", fiber.Map{
			"Title": "Isak Tech Portal",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/sign-in")
}

func IsakTechPasteGetHandler(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("isak-tech-paste", fiber.Map{
			"Title": "Isak Tech Paste",
			"User":  user,
			"Error": nil,
		}, "layouts/main")
	}

	return c.Redirect("/sign-in")
}
