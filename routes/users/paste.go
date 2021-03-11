package users

import (
	userModels "admin/models/user"
	"admin/routes"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// PasteGetController for handling the - paste.isak-tech.tk || paste
func PasteGetController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/paste/index", fiber.Map{
			"Title":    "Paste",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Paste", "linkTo": "/site/paste"},
			},
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

func PasteSiteInfoController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/paste/site_info", fiber.Map{
			"Title":    "Paste Site Info",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Paste", "linkTo": "/site/paste"},
				{"text": "Site Info", "linkTo": "/site/paste/site-information"},
			},
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

func APIGetController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/paste/api", fiber.Map{
			"Title":    "Paste API",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Paste", "linkTo": "/site/paste"},
				{"text": "API", "linkTo": "/site/paste/api"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}
