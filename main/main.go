package main

import (
	"admin/routes/index"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

func main() {
	index.Store.RegisterType(index.SessionData{})

	engine := html.New("./views", ".html")
	// Initialize default config

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Static("/public", "./public")

	indexRouter := app.Group("/", func(c *fiber.Ctx) error {
		return c.Next()
	})

	indexRouter.Get("/", func(c *fiber.Ctx) error {
		user := index.GetSession(c).Get("User")

		return c.Render("index", fiber.Map{
			"Title": "Home",
			"User":  user,
		}, "layouts/main")
	})

	indexRouter.Get("/sign-in", index.SignInGetController)
	indexRouter.Post("/sign-in", index.SignInPostController)

	indexRouter.Get("/sign-up", index.SignUpGetController)
	indexRouter.Post("/sign-up", index.SignUpPostController)

	indexRouter.Get("/account", func(c *fiber.Ctx) error {
		user := index.GetSession(c).Get("User")

		if user != nil {
			return c.Render("account", fiber.Map{
				"Title": "Account",
				"User":  user,
			}, "layouts/main")
		}

		return c.Redirect("/")
	})

	indexRouter.Get("/sign-out", func(c *fiber.Ctx) error {
		user := index.GetSession(c).Get("User")
		fmt.Println(user)

		if user != nil {
			if err := index.GetSession(c).Destroy(); err != nil {
				panic(err)
			}

			return c.Redirect("/sign-in")
		}

		return c.Redirect("/")
	})

	indexRouter.Post("/validate-form/:form", index.FormValidationRouter)
	log.Fatal(app.Listen(":8084"))
}
