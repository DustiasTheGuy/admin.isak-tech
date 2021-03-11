package users

import (
	"admin/models/user"
	userModels "admin/models/user"
	"admin/routes"
	"admin/routes/index"
	"fmt"
	"os"
	"strconv"

	"github.com/DustiasTheGuy/servman/service"
	"github.com/gofiber/fiber/v2"
)

var processes []*Process

type Process struct {
	Service *service.Service
	Config  *processConfig
}

type processConfig struct {
	WorkingDir string
	ServerAddr string
	Domain     string
}

func settingsSetup(s string) *processConfig {
	switch s {
	case "isak_tech":
		return &processConfig{
			WorkingDir: "D:/Development/GO/isak_tech/server",
			ServerAddr: "http://localhost:8081",
			Domain:     "https://isak-tech.tk",
		}
	case "portal":
		return &processConfig{
			WorkingDir: "D:/Development/GO/portal",
			ServerAddr: "http://localhost:8083",
			Domain:     "https://portal.isak-tech.tk",
		}
	case "paste":
		return &processConfig{
			WorkingDir: "D:/Development/GO/paste/server",
			ServerAddr: "http://localhost:8082",
			Domain:     "https://paste.isak-tech.tk",
		}
	default:
		return nil
	}
}

func GetProcesses(c *fiber.Ctx) error {
	for i := 0; i < len(processes); i++ {
		fmt.Println(processes[i])
	}

	return c.JSON(routes.HTTPResponse{
		Message: "",
		Success: true,
		Data:    processes,
	})
}

// StartService starts a service with its service label
func StartService(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 3) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	if !user.IsAllowedAccess(1, 2) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges to access this route",
			Success: false,
			Data:    nil,
		})
	}

	serviceParam := c.Params("service")

	for i := 0; i < len(processes); i++ {
		if processes[i].Service.Label == serviceParam {
			return c.JSON(routes.HTTPResponse{
				Message: "Process is already running",
				Success: false,
				Data:    nil,
			})
		}
	}

	fmt.Printf("Start - %s\n", serviceParam)
	serviceConf := settingsSetup(serviceParam)

	if serviceConf != nil {
		s := &service.Service{
			Label:      serviceParam,
			Path:       "main.exe",
			WorkingDir: serviceConf.WorkingDir,
		}

		if err := s.StartService(); err != nil {
			return c.JSON(routes.HTTPResponse{
				Message: fmt.Sprintf("%v", err),
				Success: false,
				Data:    nil,
			})
		}

		newProcess := &Process{
			Service: s,
			Config:  serviceConf,
		}

		processes = append(processes, newProcess)

		return c.JSON(routes.HTTPResponse{
			Message: fmt.Sprintf("Process Started: %d", *s.ProcessID),
			Success: true,
			Data:    newProcess,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "Invalid Parameter Received",
		Success: false,
		Data:    nil,
	})
}

// StopService stop a service with its pid
func StopService(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 3) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	fmt.Printf("Stop - %s\n", c.Params("pid"))
	pid, err := strconv.ParseInt(c.Params("pid"), 10, 64)

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	if err := stopService(int(pid)); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: fmt.Sprintf("Stopped Process: %d", pid),
		Success: true,
		Data:    nil,
	})
}

func stopService(pid int) error {
	p, err := os.FindProcess(pid)

	if err != nil {
		return err
	}

	if err := p.Kill(); err != nil {
		return err
	}

	for i := 0; i < len(processes); i++ {
		if *processes[i].Service.ProcessID == pid {
			// remove process from the slice
			processes = append(processes[:i], processes[i+1:]...)
		}
	}

	return nil
}

func statusService(s *service.Service) error {
	return nil
}
