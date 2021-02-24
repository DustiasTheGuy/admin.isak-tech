package index

import (
	"admin/database"
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
	db := database.Connect()
	defer db.Close()
	var user routes.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	row := db.QueryRow("SELECT * FROM users WHERE username=?", user.Username)
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Created, &user.Admin)

	switch {
	case err == sql.ErrNoRows:
		if len(user.Email) <= 8 {
			return c.JSON(routes.HTTPResponse{
				Message: "Email too short",
				Success: false,
				Data:    nil,
			})

		} else if len(user.Username) <= 4 {
			return c.JSON(routes.HTTPResponse{
				Message: "Username too short",
				Success: false,
				Data:    nil,
			})

		} else if len(user.Password) <= 8 {
			return c.JSON(routes.HTTPResponse{
				Message: "Password too short",
				Success: false,
				Data:    nil,
			})

		} else {
			return c.JSON(routes.HTTPResponse{
				Message: "Validation Success",
				Success: true,
				Data:    nil,
			})
		}
	case err != nil:
		return c.JSON(routes.HTTPResponse{
			Message: "Internal Server Error",
			Success: false,
			Data:    nil,
		})
	default:
		return c.JSON(routes.HTTPResponse{
			Message: "Username already in use",
			Success: false,
			Data:    nil,
		})
	}
}

func SignInFormValidation(c *fiber.Ctx) error {
	db := database.Connect()
	defer db.Close()
	var user routes.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})

	}

	if len(user.Username) <= 4 {
		return c.JSON(routes.HTTPResponse{
			Message: "Username too short",
			Success: false,
			Data:    nil,
		})

	} else if len(user.Password) <= 8 {
		return c.JSON(routes.HTTPResponse{
			Message: "Password too short",
			Success: false,
			Data:    nil,
		})
	}

	row := db.QueryRow("SELECT * FROM users WHERE username=?", user.Username)
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Created, &user.Admin)

	switch {
	case err == sql.ErrNoRows:
		return c.JSON(routes.HTTPResponse{
			Message: "There's no user with that username",
			Success: false,
			Data:    nil,
		})
	case err != nil:
		return c.JSON(routes.HTTPResponse{
			Message: "Internal Server Error",
			Success: false,
			Data:    nil,
		})
	default:
		return c.JSON(routes.HTTPResponse{
			Message: "",
			Success: true,
			Data:    nil,
		})
	}
}
