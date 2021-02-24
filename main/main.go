package main

import (
	"admin/routes/index"
	"admin/routes/users"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

func main() {
	index.Store.RegisterType(index.SessionData{})
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Static("/public", "./public")

	indexRouter := app.Group("/")
	indexRouter.Get("/", index.HomeGetController)
	indexRouter.Get("/sign-in", index.SignInGetController)
	indexRouter.Post("/sign-in", index.SignInPostController)
	indexRouter.Get("/sign-up", index.SignUpGetController)
	indexRouter.Post("/sign-up", index.SignUpPostController)
	indexRouter.Post("/validate-form/:form", index.FormValidationRouter)

	usersRouter := app.Group("/users")
	usersRouter.Get("/account", users.AccountGetController)
	usersRouter.Get("/sign-out", users.SignOutController)

	siteRouter := app.Group("/site")
	siteRouter.Get("/isak-tech/:site", users.IsakTechGetRouter)

	log.Fatal(app.Listen(":8084"))
}
