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
	// Initialize default config

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
	indexRouter.Get("/account", index.AccountGetController)
	indexRouter.Get("/sign-out", index.SignOutController)
	indexRouter.Post("/validate-form/:form", index.FormValidationRouter)

	siteRouter := app.Group("/site")
	siteRouter.Get("/isak-tech", users.IsakTechGetHandler)
	siteRouter.Get("/isak-tech-portal", users.IsakTechPortalGetHandler)
	siteRouter.Get("/isak-tech-paste", users.IsakTechPasteGetHandler)

	log.Fatal(app.Listen(":8084"))
}
