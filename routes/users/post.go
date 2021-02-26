package users

import (
	postModel "admin/models/post"
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

	return c.Render("sites/main/post", fiber.Map{
		"Title": fmt.Sprintf("Post %d", post.ID),
		"Post":  post,
		"User":  user,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
			{"text": "Account", "linkTo": "/users/account"},
			{"text": "Main", "linkTo": "/site/main"},
			{"text": fmt.Sprintf("Post %d", post.ID), "linkTo": fmt.Sprintf("/site/main/post/%d", post.ID)},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

func RemovePostController(c *fiber.Ctx) error {
	postID, err := strconv.ParseUint(c.Params("postID"), 10, 64)

	if err != nil {
		return c.Redirect("/site/main?err=invalid parameter recieved")
	}

	if err := postModel.RemovePost(postID); err != nil {
		return c.Redirect(fmt.Sprintf("/site/main/post/%d?err=internal server error", postID))
	}

	return c.Redirect("/site/main?s=post has been deleted")
}

func UpdatePostController(c *fiber.Ctx) error {
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
