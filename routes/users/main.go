package users

import (
	postModels "admin/models/post"
	"admin/routes"
	"admin/routes/index"

	"github.com/DustiasTheGuy/servman/service"
	"github.com/gofiber/fiber/v2"
)

// Services contains all running services
var services []*service.Service

// SiteMainHandler for handling the - isak-tech.tk || main
func MainGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")
	posts, err := postModels.GetAllPosts()

	if err != nil {
		return c.Redirect("/?err=error while querying posts")
	}

	if user != nil {
		return c.Render("sites/main/index", fiber.Map{
			"Title": "Main",
			"User":  user,
			"Posts": posts,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func MainSiteInfoController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/main/site_info", fiber.Map{
			"Title": "Main Site Info",
			"User":  user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": "Site Info", "linkTo": "/site/main/site-information"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func AnalyticsGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/main/analytics", fiber.Map{
			"Title": "Analytics",
			"User":  user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": "Analytics", "linkTo": "/site/main/analytics"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func ExecuteAction(c *fiber.Ctx) error {
	var proccessID *int
	var success bool

	switch c.Params("action") {
	case "start":
		proccessID, success = StartService(&service.Service{
			Label:      "isak_tech",
			ProccessID: nil,
			Debug:      true,
			Path:       "main.exe",
			WorkingDir: "D:/Development/GO/isak_tech/server",
		})
	case "stop":
		proccessID, success = StopService("isak_tech")
	case "status":
		proccessID, success = StatusService()
	default:
	}

	if !success {
		return c.JSON(routes.HTTPResponse{
			Message: "An error has occured",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "",
		Success: true,
		Data:    proccessID,
	})
}

func StartService(s *service.Service) (*int, bool) {

	for i := 0; i < len(services); i++ {
		if services[i].Label == s.Label {
			return nil, false
		}
	}

	if err := s.StartService(); err != nil {
		return nil, false
	}

	services = append(services, s)

	return s.ProccessID, true
}

// StopService returns a proccessID and if a service was found
func StopService(label string) (*int, bool) {
	var foundService bool

	for i := 0; i < len(services); i++ {
		if services[i].Label == label {
			services[i].KillService()
			copy(services[i:], services[i+1:])
			services[len(services)-1] = nil // or the zero value of T
			services = services[:len(services)-1]
			foundService = true
		}
	}

	return nil, foundService
}

func StatusService() (*int, bool) {
	return nil, false
}
