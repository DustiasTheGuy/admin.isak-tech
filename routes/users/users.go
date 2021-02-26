package users

import (
	postModels "admin/models/post"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// IsakTechGetRouter routes traffic depending on the /:site parameter
func IsakTechGetRouter(c *fiber.Ctx) error {
	switch c.Params("site") {
	case "main":
		return SiteMainHandler(c) // isak-tech.tk
	case "portal":
		return SitePortalHandler(c) // portal.isak-tech.tk
	case "paste":
		return SitePasteHandler(c) // paste.isak-tech.tk
	default:
		return c.Redirect("/?err=site does not exist")
	}
}

// SiteMainHandler for handling the - isak-tech.tk || main
func SiteMainHandler(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")
	posts, err := postModels.GetAllPosts()

	if err != nil {
		return c.Redirect("/?err=error while querying posts")
	}

	if user != nil {
		return c.Render("sites/main/index", fiber.Map{
			"Title": "Main",
			"User":  user,
			"Posts": posts,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Main", "linkTo": "/site/main"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

// SitePortalHandler for handling the - portal.isak-tech.tk || portal
func SitePortalHandler(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

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
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

// SitePasteHandler for handling the - paste.isak-tech.tk || paste
func SitePasteHandler(c *fiber.Ctx) error {
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
