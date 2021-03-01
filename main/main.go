package main

import (
	"admin/routes/index"
	"admin/routes/users"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

// IsLast is a tempalte function for checking if an element is last
func IsLast(index, length int) bool {
	// fmt.Printf("Index: %d\n", index)
	// fmt.Printf("Length: %d\n", length)

	return index != length-1
}

// FormatDate is a template function for parsing dates and making them look nice
func FormatDate(date time.Time) string {
	// 2021-02-26 05:25:13 +0000 UTC
	// fmt.Println(date)

	return date.Format("Jan 2, 15.00")
}

func main() {
	index.Store.RegisterType(index.SessionData{}) // register the struct that will be held in each session
	//engine := html.New("./views", ".html")
	engine := html.New("./views", ".html")
	engine = engine.AddFunc("IsLast", IsLast)         // add custom template func to check if element is last in an array, primarily used to apply CSS to last element in a range
	engine = engine.AddFunc("FormatDate", FormatDate) // format date for nicer display

	app := fiber.New(fiber.Config{
		Views: engine, // assign the html view engine
	})

	app.Static("/public", "./public") // serve static files from /public folder

	indexRouter := app.Group("/")                                        // group every route that ONLY can be accessed without a session or can always be accessed
	indexRouter.Get("/", index.HomeGetController)                        // RENDER | display home page template
	indexRouter.Get("/sign-in", index.SignInGetController)               // RENDER | display the user sign in template
	indexRouter.Post("/sign-in", index.SignInPostController)             // POST   | request a new session with username and password
	indexRouter.Get("/sign-up", index.SignUpGetController)               // RENDER | display the user sign up form template
	indexRouter.Post("/sign-up", index.SignUpPostController)             // POST   | create a new user account
	indexRouter.Post("/validate-form/:form", index.FormValidationRouter) // gets called through javascript to ensure form is valid before making a submit request

	usersRouter := app.Group("/users")                      // Group all routes related to a users account
	usersRouter.Get("/account", users.AccountGetController) // RENDER | display users account information
	usersRouter.Get("/sign-out", users.SignOutController)   // UPDATE | request to clear session

	mainRouter := app.Group("/site/main")                                              // Group all routes that are related to just isak-tech.tk the main site
	mainRouter.Get("/", users.MainGetController)                                       // RENDER | display all posts template
	mainRouter.Post("/post/add-new", users.AddNewPostController)                       // POST   | create a new post, form submit
	mainRouter.Get("/post/add-new", users.AddNewGetController)                         // RENDER | display the form where you can add a new post
	mainRouter.Get("/post/:postID", users.PostGetController)                           // RENDER | display single post template
	mainRouter.Get("/post/:postID/add-image", users.AddImageGetController)             // RENDER | display add new image template
	mainRouter.Post("/post/:postID/add-image", users.AddImagePostController)           // POST   | request add new image post request
	mainRouter.Post("/post/:postID", users.UpdatePostController)                       // UPDATE | request existing post
	mainRouter.Get("/post/:postID/:imageID/remove-image", users.RemoveImageController) // DELETE | request image get request ( might be changed to post request )
	mainRouter.Get("/post/:postID/remove-post", users.RemovePostController)            // DELETE | request an existing post permanently
	mainRouter.Get("/site-information", users.MainSiteInfoController)                  // RENDER | display information about the site
	mainRouter.Get("/analytics", users.AnalyticsGetController)                         // RENDER | show some analytics about the site
	mainRouter.Get("/:action", users.ExecuteAction)

	// A page is a row in mysql that contains all data associated with a page that I find interesting
	portalRouter := app.Group("/site/portal")                                 // Group all routes that are related to portal.isak-tech.tk
	portalRouter.Get("/", users.PortalGetController)                          // RENDER | display all available pages template
	portalRouter.Get("/page/add-page", users.PortalAddNewGetController)       // RENDER | request create a new page template
	portalRouter.Post("/page/add-page", users.PortalAddNewPostController)     // CREATE | create a new page in mysql
	portalRouter.Get("/page/:pageID", users.PortalGetPageController)          // RENDER | display a single page template
	portalRouter.Post("/page/:pageID/update", users.PortalUpdateController)   // UPDATE | request update an existing page
	portalRouter.Get("/page/:pageID/delete", users.PortalDeleteOneController) // DELETE | request delete an existing page permanently
	portalRouter.Get("/site-information", users.PortalSiteInfoController)     // RENDER | display information about the site

	pasteRouter := app.Group("/site/paste")                             // Group all routes that are related to paste.isak-tech.tk
	pasteRouter.Get("/", users.PasteGetController)                      // RENDER | display all the pastes that have been submitted
	pasteRouter.Get("/site-information", users.PasteSiteInfoController) // RENDER | display information about the site
	pasteRouter.Get("/api", users.APIGetController)                     // REDNER | display template how the api works
	log.Fatal(app.Listen(":8084"))                                      // attempt to listen for incomming requests, exit program with an error message
}
