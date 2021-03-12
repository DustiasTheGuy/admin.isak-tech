package users

import (
	postModel "admin/models/post"
	userModels "admin/models/user"
	"admin/routes"
	"admin/routes/index"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func PostGetController(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("postID"), 10, 64)
	user := index.GetSession(c).Get("User")

	if err != nil {
		return c.Redirect("/site/main?err=invalid parameter recieved")
	}

	post, err := postModel.GetPostById(id)

	if err != nil {
		return c.Redirect("/site/main?err=post may have been moved or deleted")
	}

	if user != nil {
		return c.Render("sites/main/post", fiber.Map{
			"Title":    fmt.Sprintf("Post %d", post.ID),
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"Post":     post,
			"User":     user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": fmt.Sprintf("Post %d", post.ID), "linkTo": fmt.Sprintf("/site/main/post/%d", post.ID)},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func AddNewGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/main/add_new", fiber.Map{
			"Title":    "New Post",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Main", "linkTo": "/site/main"},
				{"text": "Add New", "linkTo": "/site/main/add-new"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=you must be signed in to view that page")
}

func AddNewPostController(c *fiber.Ctx) error {
	adminLevel := index.ParsePrivileges(index.GetSession(c))

	if !userModels.IsAllowedAccess(adminLevel, 1) { // level >= required
		return c.Redirect("/users/account?err=You lack the nessecary privileges to perform that action")
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		var p postModel.Post

		if err := c.BodyParser(&p); err != nil {
			return c.Redirect("/site/main/post/add-new?err=unable to parse body")
		}

		if err := p.SaveNewPost(); err != nil {
			return c.Redirect(fmt.Sprintf("/site/main/post/add-new?err=%v", err))
		}

		return c.Redirect("/site/main?s=saved new post")
	}

	return c.Redirect("/?err=you must be signed in to view that page")
}

func RemovePostController(c *fiber.Ctx) error {
	adminLevel := index.ParsePrivileges(index.GetSession(c))

	if !userModels.IsAllowedAccess(adminLevel, 3) { // level >= required
		return c.Redirect("/users/account?err=You lack the nessecary privileges to perform that action")
	}

	postID, err := strconv.ParseUint(c.Params("postID"), 10, 64)

	if err != nil {
		return c.Redirect("/site/main?err=invalid parameter recieved")
	}

	if err := postModel.RemovePost(postID); err != nil {
		return c.Redirect(fmt.Sprintf("/site/main/post/%d?err=internal server error", postID))
	}

	return c.Redirect("/site/main?s=post has been deleted")
}

func UpdatePostController(c *fiber.Ctx) error { // level 2
	var post postModel.Post

	if err := c.BodyParser(&post); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	if err := post.UpdatePostWithID(); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Cannot update post",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: "Recieved",
		Success: true,
		Data:    post,
	})
}
