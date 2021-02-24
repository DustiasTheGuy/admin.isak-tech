package index

import (
	models "admin/models/user"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/mysql"
)

type SessionData struct {
	ID       uint
	Username string
	Email    string
}

var Store = session.New(session.Config{
	Storage: mysql.New(mysql.Config{
		Username: "root",
		Password: "password",
		Database: "admin_db",
		Table:    "fiber_storage",
	}),
})

func GetSession(c *fiber.Ctx) *session.Session {
	sess, err := Store.Get(c)

	if err != nil {
		panic(err)
	}

	return sess
}

func SignUpPostController(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		log.Fatal(err)
	}

	if err := user.CreateNewUser(); err != nil {
		return c.Redirect("/")
	}

	return c.Redirect("/")
}

// SignInGetController bla bla bla
func SignInGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")
	fmt.Println(user)

	if user != nil {
		return c.Redirect("/")
	}

	return c.Render("sign-in", fiber.Map{
		"Title": "Sign In",
		"User":  nil,
	}, "layouts/main")
}

// SignUpGetController bla bla
func SignUpGetController(c *fiber.Ctx) error {
	user := GetSession(c).Get("User")

	if user != nil {
		return c.Redirect("/")
	}

	return c.Render("sign-up", fiber.Map{
		"Title": "Sign Up",
		"User":  nil,
	}, "layouts/main")
}

// SignInPostController bla bla
func SignInPostController(c *fiber.Ctx) error {
	var tempUser models.User

	if err := c.BodyParser(&tempUser); err != nil {
		fmt.Println(err)
		c.Redirect("/sign-in")
	}

	user, err := tempUser.GetUserByUsername()

	if err != nil {
		fmt.Println(err)
		return c.Redirect("/sign-in")
	}

	if models.ComparePassword(user.Password, tempUser.Password) {
		sess, err := Store.Get(c)

		if err != nil {
			fmt.Println(err)
			return c.Redirect("/sign-in")
		}

		sess.Set("User", SessionData{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		})

		if err := sess.Save(); err != nil {
			fmt.Println(err)
			return c.Redirect("/")
		}

		return c.Redirect("/account")
	}

	fmt.Println("Passwords do not match")

	return c.Redirect("/sign-in")
}
