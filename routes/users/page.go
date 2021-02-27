package users

import (
	"admin/models/page"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SitePortalHandler for handling the - portal.isak-tech.tk || portal
func SitePortalController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	pages, err := page.GetAllPages()

	if err != nil {
		return c.Redirect("/?err=internal server error")
	}

	if user != nil {
		return c.Render("sites/portal/index", fiber.Map{
			"Title": "Portal",
			"User":  user,
			"Error": c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Portal", "linkTo": "/site/portal"},
			},
			"Pages":   pages,
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}
