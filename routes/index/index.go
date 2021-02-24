package index

import (
	models "admin/models/user"

	"github.com/gofiber/fiber/v2"
)

func HomeGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	return c.Render("index", fiber.Map{
		"Title": "Home",
		"User":  user,
		"Error": nil,
	}, "layouts/main")
}

// SignInGetController bla bla bla
func SignInGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Redirect("/")
	}

	return c.Render("sign-in", fiber.Map{
		"Title": "Sign In",
		"User":  nil,
		"Error": nil,
	}, "layouts/main")
}

// SignUpGetController bla bla
func SignUpGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Redirect("/")
	}

	return c.Render("sign-up", fiber.Map{
		"Title": "Sign Up",
		"User":  nil,
		"Error": nil,
	}, "layouts/main")
}

func SignUpPostController(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.Redirect("/")
	}

	if err := user.CreateNewUser(); err != nil {
		return c.Redirect("/")
	}

	return c.Redirect("/")
}

// SignInPostController bla bla
func SignInPostController(c *fiber.Ctx) error {
	var tempUser models.User

	if err := c.BodyParser(&tempUser); err != nil {
		return c.Redirect("/sign-in")
	}

	user, err := tempUser.GetUserByUsername()

	if err != nil {
		return c.Redirect("/sign-in")
	}

	if models.ComparePassword(user.Password, tempUser.Password) {
		sess, err := Store.Get(c)

		if err != nil {
			return c.Redirect("/sign-in")
		}

		sess.Set("User", SessionData{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		})

		if err := sess.Save(); err != nil {
			return c.Redirect("/")
		}

		return c.Redirect("/account")
	}

	return c.Redirect("/sign-in")
}
