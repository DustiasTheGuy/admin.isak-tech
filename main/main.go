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

	indexRouter.Get("/test", func(c *fiber.Ctx) error {
		return c.Redirect("/sign-in?err=abc dfg")
	})

	usersRouter := app.Group("/users")
	usersRouter.Get("/account", users.AccountGetController)
	usersRouter.Get("/sign-out", users.SignOutController)

	siteRouter := app.Group("/site")
	siteRouter.Get("/:site", users.IsakTechGetRouter)
	siteRouter.Get("/:site/post/:postID", users.PostGetController)
	siteRouter.Post("/:site/post/:postID", users.UpdatePostController)
	siteRouter.Get("/:site/post/:postID/add-image", users.AddImageGetController)
	siteRouter.Post("/:site/post/:postID/add-image", users.AddImagePostController)
	siteRouter.Get("/:site/remove-image/:postID/:imageID", users.RemoveImageController)

	log.Fatal(app.Listen(":8084"))
}
