package index

import (
	"admin/database"
	"admin/routes"
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/mysql"
	"golang.org/x/crypto/bcrypt"
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
	db := database.Connect()
	defer db.Close()
	var user routes.User

	if err := c.BodyParser(&user); err != nil {
		log.Fatal(err)
	}

	hash, err := hashPassword(user.Password)

	if err != nil {
		return c.Redirect("/sign-up")
	}

	_, err = db.Exec("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
		user.Username, user.Email, hash)

	if err != nil {
		return c.Redirect("/sign-up")
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
	db := database.Connect()
	var body routes.User
	var user routes.User

	if err := c.BodyParser(&body); err != nil {
		c.Redirect("/sign-in")
	}

	row := db.QueryRow("SELECT * FROM users WHERE username=?", body.Username)
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Created, &user.Admin)

	switch {
	case err == sql.ErrNoRows:
		return c.Redirect("/sign-in")
	case err != nil:
		return c.Redirect("/sign-in")
	default:
		if comparePassword([]byte(user.Password), body.Password) {
			fmt.Println("Sign in success")
			// set a cookie

			sess, err := Store.Get(c)

			if err != nil {
				return c.Redirect("/sign-in")
			}

			sess.Set("User", SessionData{
				ID:       user.ID,
				Username: user.Username,
				Email:    user.Email,
			})

			if err := sess.Save(); err != nil {
				return c.Redirect("/")
			}

			return c.Redirect("/")
		}

		return c.Redirect("/sign-in")
	}
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)

	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func comparePassword(hash []byte, password string) bool {
	if err := bcrypt.CompareHashAndPassword(hash, []byte(password)); err != nil {
		return false
	}

	return true
}
