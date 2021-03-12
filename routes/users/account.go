package users

import (
	userModels "admin/models/user"
	"admin/routes/index"

	"github.com/gofiber/fiber/v2"
)

// AccountGetController renders the account template where a user can view their account information
func AccountGetController(c *fiber.Ctx) error {

	adminLevel := index.ParsePrivileges(index.GetSession(c))

	if !userModels.IsAllowedAccess(adminLevel, 0) { // level >= required
		return c.Redirect("/users/sign-out?s=You have been signed out")
	}

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
		return c.Render("account", fiber.Map{
			"Title":    "Account",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/?err=please sign in")
}
