package users

import (
	postModel "admin/models/post"
	"admin/routes/index"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func PostGetController(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("postID"), 10, 64)
	user := index.GetSession(c).Get("User")

	if err != nil {
		panic(err)
	}

	post, err := postModel.GetPostById(id)

	if err != nil {
		panic(err)
	}

	return c.Render("sites/main/post", fiber.Map{
		"Title": fmt.Sprintf("Post %d", post.ID),
		"Post":  post,
		"User":  user,
		"Error": nil,
	}, "layouts/main")
}
