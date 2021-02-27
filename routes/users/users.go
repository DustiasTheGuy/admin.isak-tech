package users

import (
	postModels "admin/models/post"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// SiteMainHandler for handling the - isak-tech.tk || main
func SiteMainController(c *fiber.Ctx) error {
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
