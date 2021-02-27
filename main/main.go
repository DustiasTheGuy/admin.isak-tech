package main

import (
	"admin/routes/index"
	"admin/routes/users"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

func IsLast(index, length int) bool {
	// fmt.Printf("Index: %d\n", index)
	// fmt.Printf("Length: %d\n", length)

	return index != length-1
}

func FormatDate(date time.Time) string {
	// 2021-02-26 05:25:13 +0000 UTC
	// fmt.Println(date)

	return date.Format("Jan 2, 15.00")
}

func main() {
	index.Store.RegisterType(index.SessionData{})
	//engine := html.New("./views", ".html")
	engine := html.New("./views", ".html")
	engine = engine.AddFunc("IsLast", IsLast)
	engine = engine.AddFunc("FormatDate", FormatDate)

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

	mainRouter := app.Group("/site/main")
	mainRouter.Get("/", users.SiteMainController)
	mainRouter.Get("/post/:postID", users.PostGetController)
	mainRouter.Get("/post/:postID/add-image", users.AddImageGetController)
	mainRouter.Post("/post/:postID", users.UpdatePostController)
	mainRouter.Post("/post/:postID/add-image", users.AddImagePostController)
	mainRouter.Get("/remove-image/:postID/:imageID", users.RemoveImageController)
	mainRouter.Get("/remove-post/:postID", users.RemovePostController)

	portalRouter := app.Group("/site/portal")
	portalRouter.Get("/", users.SitePortalController)

	pasteRouter := app.Group("/site/paste")
	pasteRouter.Get("/", users.PasteGetController)

	log.Fatal(app.Listen(":8084"))
}
