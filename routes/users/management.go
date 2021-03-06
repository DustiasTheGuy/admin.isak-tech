package users

import (
	userModels "admin/models/user"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

func ManagementGetController(c *fiber.Ctx) error {
	var err error
	user := index.GetSession(c).Get("User")
	x, ok := user.(index.SessionData)

	if !ok {
		return c.Redirect("/?err=an error has occured")
	}

	tempUser := userModels.User{Username: x.Username}
	user, err = tempUser.GetUserByUsername()

	if err != nil {
		return c.Redirect("/?err=session invalid")
	}

	if user != nil {
		return c.Render("management", fiber.Map{
			"Title": "Management",
			"User":  user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Management", "linkTo": "/users/management"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/?err=please sign in")
}
