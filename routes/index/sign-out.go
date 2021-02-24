package index

import "github.com/gofiber/fiber/v2"

func SignOutController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		if err := GetSession(c).Destroy(); err != nil {
			panic(err)
		}

		return c.Redirect("/sign-in")
	}

	return c.Redirect("/")
}
