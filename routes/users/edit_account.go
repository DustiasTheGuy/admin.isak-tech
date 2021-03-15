package users

import (
	userModels "admin/models/user"
	"admin/routes/index"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func EditUserAccountGetController(c *fiber.Ctx) error {
	adminLevel := index.ParsePrivileges(index.GetSession(c).Get("User"))

	if !userModels.IsAllowedAccess(adminLevel, 3) { // level >= required
		return c.Redirect("/users/sign-out?s=You have been signed out")
	}

	userTarget := userModels.User{Username: c.Params("username")}
	userTarget, err := userTarget.GetUserByUsername()

	if err != nil {
		return c.Redirect("/users/account?err=unable to find user")
	}

	return c.Render("account/edit_account", fiber.Map{
		"Title":      "Edit Account",
		"Subtitle":   "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
		"User":       index.GetSession(c).Get("User"),
		"UserTarget": userTarget,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
			{"text": "Account", "linkTo": "/users/account"},
			{"text": "User Accounts", "linkTo": "/users/user_accounts"},
			{"text": "Edit Account", "linkTo": fmt.Sprintf("/users/edit_account/%s", userTarget.Username)},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

func EditUserAccountPostController(c *fiber.Ctx) error {
	var user userModels.User

	if err := c.BodyParser(&user); err != nil {
		fmt.Println(err)
		return c.Redirect("/users/account?err=Unable to parse body")
	}

	fmt.Println(user)

	if len(user.Password) > 5 {
		// update user password
		fmt.Println("Update User Password...")
		if err := user.UpdateUserPassword(); err != nil {
			return c.Redirect(fmt.Sprintf("/users/edit_account/%s?err=Unable to update password", user.Username))
		}
	}

	if err := user.UpdateUserData(); err != nil {
		return c.Redirect(fmt.Sprintf("/users/edit_account/%s?err=Unable to update user", user.Username))
	}

	return c.Redirect(fmt.Sprintf("/users/user_accounts?s=%s has been updated", user.Username))
}
