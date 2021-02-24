package index

import (
	models "admin/models/user"
	"admin/routes"
	"database/sql"

	"github.com/gofiber/fiber/v2"
)

func FormValidationRouter(c *fiber.Ctx) error {
	switch c.Params("form") {
	case "sign-in":
		return SignInFormValidation(c)
	case "sign-up":
		return SignUpFormValidation(c)
	default:
		return c.JSON(routes.HTTPResponse{
			Message: "Internal Server Error",
			Success: false,
			Data:    nil,
		})
	}
}

func SignUpFormValidation(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	_, err := user.GetUserByUsername()

	if err == sql.ErrNoRows {
		return c.JSON(routes.HTTPResponse{
			Message: "No user with that username",
			Success: true,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "User with that username might already exist",
		Success: false,
		Data:    nil,
	})
}

func SignInFormValidation(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	_, err := user.GetUserByUsername()

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Error",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "",
		Success: true,
		Data:    nil,
	})
}
