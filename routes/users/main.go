package users

import (
	postModels "admin/models/post"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SiteMainHandler for handling the - isak-tech.tk || main
func MainGetController(c *fiber.Ctx) error {
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
				{"text": "Main", "linkTo": "/site/main"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func MainSiteInfoController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/main/site_info", fiber.Map{
			"Title": "Main Site Info",
			"User":  user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": "Site Info", "linkTo": "/site/main/site-information"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func AnalyticsGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/main/analytics", fiber.Map{
			"Title": "Analytics",
			"User":  user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": "Analytics", "linkTo": "/site/main/analytics"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}
