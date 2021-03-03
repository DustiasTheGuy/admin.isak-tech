package users

import (
	"admin/routes"
	"errors"

	"github.com/DustiasTheGuy/servman/service"
	"github.com/gofiber/fiber/v2"
)

// Services contains all running services
// var services []*service.Service

func settingsSetup(s string) (string, error) {
	switch s {
	case "isak_tech":
		return "D:/Development/GO/isak_tech/server", nil
	case "isak_tech_portal":
		return "D:/Development/GO/portal", nil
	case "isak_tech_paste":
		return "D:/Development/GO/paste/server", nil
	default:
		return "", errors.New("Invalid Service")
	}
}

func ExecuteAction(c *fiber.Ctx) error {
	var err error

	s := &service.Service{
		Label:      c.Params("service"),
		ProccessID: nil,
		Debug:      true,
		Path:       "main.exe",
		WorkingDir: "",
	}

	wd, err := settingsSetup(c.Params("service"))

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Invalid Service",
			Success: false,
			Data:    nil,
		})
	}

	s.WorkingDir = wd
	switch c.Params("action") {
	case "start":
		err = StartService(s)
	case "stop":
		err = StopService(s)
	case "status":
		err = StatusService(s)
	default:
		err = errors.New("Bad Parameter")
	}

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "An error has occured",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "",
		Success: true,
		Data:    s.ProccessID,
	})
}

func StartService(s *service.Service) error {
	return s.StartService()
}

// StopService returns a proccessID and if a service was found
func StopService(s *service.Service) error {
	return s.KillService()
}

func StatusService(s *service.Service) error {
	return nil
}
