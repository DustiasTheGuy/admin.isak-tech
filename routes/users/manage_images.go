package users

import (
	imageModel "admin/models/image"
	"admin/routes"
	"admin/routes/index"
	"fmt"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"
)

func ManageImagesGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")
	images, err := imageModel.GetAllImages()

	if err != nil {
		return c.Redirect("/users/account?err=failed to query images")
	}

	if user != nil {
		return c.Render("account/manage_images", fiber.Map{
			"Title":    "Images",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"Images":   images,
			"User":     user,
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Images", "linkTo": "/users/account/images"},
			},
			"Error":   c.Query("err"),
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return nil
}

func UploadImagePostController(c *fiber.Ctx) error {
	var images []*string
	mpartForm, err := c.MultipartForm()

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	for i := 0; i < len(mpartForm.File["file"]); i++ {
		rand.Seed(time.Now().UnixNano())
		file := mpartForm.File["file"][i]
		selfHash := randSeq(25)

		if err := c.SaveFile(file, fmt.Sprintf("./public/images/uploads/%s_%s", selfHash, file.Filename)); err != nil {
			return c.JSON(routes.HTTPResponse{
				Message: fmt.Sprintf("%v", err),
				Success: false,
				Data:    nil,
			})
		}

		if err := imageModel.SaveNewImage(0, fmt.Sprintf("https://admin.isak-tech.tk/public/images/uploads/%s_%s", selfHash, file.Filename), false, true); err != nil {
			return err
		}

		url := fmt.Sprintf("https://admin.isak-tech.tk/public/images/uploads/%s_%s", selfHash, file.Filename)
		images = append(images, &url)
	}

	return c.JSON(routes.HTTPResponse{
		Message: fmt.Sprintf("Saved %d files", len(mpartForm.File["file"])),
		Success: true,
		Data:    images,
	})
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_")

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
