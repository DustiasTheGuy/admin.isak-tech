package users

import (
	imageModel "admin/models/image"
	postModel "admin/models/post"
	userModels "admin/models/user"
	"admin/routes"
	"fmt"

	"admin/routes/index"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func RemoveImageController(c *fiber.Ctx) error { // level 3
	ImageID, err := strconv.ParseInt(c.Params("imageID"), 10, 64)

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Invalid Parameter Recieved",
			Success: false,
			Data:    nil,
		})
	}

	PostID, err := strconv.ParseInt(c.Params("postID"), 10, 64)

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Invalid Parameter Recieved",
			Success: false,
			Data:    nil,
		})
	}

	if err := imageModel.RemoveImage(ImageID, PostID); err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: "Internal Server Error",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(routes.HTTPResponse{
		Message: fmt.Sprintf("Deleted Image With ID %d", ImageID),
		Success: true,
		Data:    nil,
	})
}

func AddImageGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")
	postID, err := strconv.ParseUint(c.Params("postID"), 10, 64)

	if user == nil {
		return c.Redirect("/sign-in?err=please sign in")
	}

	if err != nil {
		return c.Redirect("/site/main?err=invalid parameter recieved")
	}

	post, err := postModel.GetPostById(postID)

	if err != nil {
		return c.Redirect("/site/main?err=post may have been deleted")
	}

	return c.Render("sites/main/image", fiber.Map{
		"Title":    "Add Image",
		"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
		"User":     user,
		"Post":     post,
		"Breadcrumbs": []map[string]string{
			{"text": "Home", "linkTo": "/"},
			{"text": "Main", "linkTo": "/site/main"},
			{"text": fmt.Sprintf("Post %d", postID), "linkTo": fmt.Sprintf("/site/main/post/%d", postID)},
			{"text": "Add Image", "linkTo": fmt.Sprintf("/site/main/post/%d/add-image", postID)},
		},
		"Error":   c.Query("err"),
		"Success": c.Query("s"),
	}, "layouts/main")
}

func AddImagePostController(c *fiber.Ctx) error {
	adminLevel := index.ParsePrivileges(index.GetSession(c))

	if !userModels.IsAllowedAccess(adminLevel, 1) { // level >= required
		return c.Redirect("/users/sign-out?s=You have been signed out")
	}

	var body imageModel.Image

	postID, err := strconv.ParseInt(c.Params("postID"), 10, 64)

	if err != nil {
		return c.Redirect("/site/main?err=invalid parameter recieved")
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Redirect(fmt.Sprintf("/site/main/post/%d/add-image?err=unable to parse body", postID))
	}

	if err := imageModel.SaveNewImage(postID, body.URL, false); err != nil {
		return c.Redirect(fmt.Sprintf("/site/main/post/%d/add-image?err=an error has occured, url might be too short", postID))
	}

	return c.Redirect(fmt.Sprintf("/site/main/post/%d/add-image?s=image has been saved", postID))
}
