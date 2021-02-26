package main

import (
	"admin/routes/index"
	"admin/routes/users"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

func IsLast(index, length int) bool {
	fmt.Printf("Index: %d\n", index)
	fmt.Printf("Length: %d\n", length)

	return index != length-1
}

func main() {
	index.Store.RegisterType(index.SessionData{})
	//engine := html.New("./views", ".html")
	engine := html.New("./views", ".html").AddFunc("IsLast", IsLast)

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
	siteRouter.Get("/:site", users.IsakTechGetRouter)
	siteRouter.Get("/:site/post/:postID", users.PostGetController)
	siteRouter.Post("/:site/post/:postID", users.UpdatePostController)
	siteRouter.Get("/:site/post/:postID/add-image", users.AddImageGetController)
	siteRouter.Post("/:site/post/:postID/add-image", users.AddImagePostController)
	siteRouter.Get("/:site/remove-image/:postID/:imageID", users.RemoveImageController)
	siteRouter.Get("/:site/remove-post/:postID", users.RemovePostController)

	log.Fatal(app.Listen(":8084"))
}
