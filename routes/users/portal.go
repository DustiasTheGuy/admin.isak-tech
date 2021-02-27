package users

import (
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SitePasteHandler for handling the - paste.isak-tech.tk || paste
func PasteGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/paste/index", fiber.Map{
			"Title": "Paste",
			"User":  user,
			"Error": c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Paste", "linkTo": "/site/paste"},
			},
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}
