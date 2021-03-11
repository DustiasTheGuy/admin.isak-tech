package user

import (
	"admin/database"

	"database/sql"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// User contains all nessecary information about a user
type User struct {
	ID       uint      `json:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
	Created  time.Time `json:"created"`
	Admin    int8      `json:"admin"`
}

/*
	Admin Privileges Levels:

		Level 0: Can view data but not create, update or delete data

			GET /users/account
			GET /users/management
			GET /users/analytics
			GET /users/sign-out
			GET /site/main
			GET /site/main/post/add-new
			GET /site/portal
			GET /site/portal/page/add-page
			GET /site/paste
			GET /site/paste/api
			GET /sign-up
			GET /sign-in
			GET /site/main/post/:id/add-image
			GET /site/main/post/:id
			GET /site/portal/page/:id

		Level 1: Can view, create data but not update or delete
		Level 2: Can view, create, update data but not delete
		Level 3: Can view, create, update, delete data plus modify user privileges, suspend users, remove users.
*/

// IsAllowedAccess checks if user admin level is greater or equal to the required level. First argument is the user admin level and the second argument is the required level to access an endpoint
func IsAllowedAccess(a, b int8) bool {
	return a >= b
}

// HashPassword generates a hash from a string
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)

	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

// ComparePassword compares a hash and a string and checks the validity
func ComparePassword(savedPassword string, password string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(savedPassword), []byte(password)); err != nil {
		fmt.Println(err)
		return false
	}

	return true
}

// GetUserByUsername select a user from database by its username
func (u *User) GetUserByUsername() (User, error) {
	var user User
	// "root:password@/isak_tech_admin?parseTime=true"
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	row := db.QueryRow("SELECT * FROM users WHERE username=?", u.Username)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
		&user.Created,
		&user.Admin)

	switch {
	case err == sql.ErrNoRows:
		return User{}, err
	case err != nil:
		return User{}, err
	default:
		return user, nil
	}
}

// CreateNewUser inserts a new user row into the database
func (u *User) CreateNewUser() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	hash, err := HashPassword(u.Password)

	if err != nil {
		return err
	}

	_, err = db.Exec("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
		u.Username, u.Email, hash)

	if err != nil {
		return err
	}

	return nil
}
