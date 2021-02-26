package index

import (
	models "admin/models/user"

	"github.com/gofiber/fiber/v2"
)

// HomeGetController is currently doing nothing
func HomeGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	return c.Render("index", fiber.Map{
		"Title": "Home",
		"User":  user,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

// SignInGetController is only used for rendering the signin template
func SignInGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Redirect("/?err=error")
	}

	return c.Render("sign-in", fiber.Map{
		"Title": "Sign In",
		"User":  nil,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
			{"text": "Sign In", "linkTo": "/sign-in"},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

// SignUpGetController is only for rendering the signup template
func SignUpGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Redirect("/?err=error")
	}

	return c.Render("sign-up", fiber.Map{
		"Title": "Sign Up",
		"User":  nil,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
			{"text": "Sign Up", "linkTo": "/sign-up"},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

// SignUpPostController gets called when formdata has been validated in the SignUpFormValidation controller
func SignUpPostController(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.Redirect("/?err=unable to parse body")
	}

	if err := user.CreateNewUser(); err != nil {
		return c.Redirect("/?err=error while creating user")
	}

	return c.Redirect("/?s=your account has been created")
}

// SignInPostController gets called to generate a session when formdata has been validated in SignInFormValidation
func SignInPostController(c *fiber.Ctx) error {
	var tempUser models.User

	if err := c.BodyParser(&tempUser); err != nil {
		return c.Redirect("/sign-in?err=unable to parse body")
	}

	user, err := tempUser.GetUserByUsername()

	if err != nil {
		return c.Redirect("/sign-in?err=internal server error")
	}

	if models.ComparePassword(user.Password, tempUser.Password) {
		sess, err := Store.Get(c)

		if err != nil {
			return c.Redirect("/sign-in?err=invalid session")
		}

		sess.Set("User", SessionData{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		})

		if err := sess.Save(); err != nil {
			return c.Redirect("/?err=unable to retrieve session")
		}

		return c.Redirect("/users/account?s=you have been signed in")
	}

	return c.Redirect("/sign-in?err=an error has occured")
}
