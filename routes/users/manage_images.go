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

const serverAddr = "http://localhost:8084"

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
	var images []map[string]interface{}
	mpartForm, err := c.MultipartForm()

	if err != nil {
		return c.JSON(routes.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	for i := 0; i < len(mpartForm.File["file"]); i++ {
		rand.Seed(time.Now().UnixNano())  // seed the rand
		file := mpartForm.File["file"][i] // a big fat slice of bytes
		// hash will look something like: CaL8cG90BWoNiB_PPLxFv6lGC
		imageHash := randSeq(25)                           // grab a good unique file name
		ext, ok := imgExt(file.Header.Get("Content-Type")) // check if file is an image and get the extention if it is
		// allowed_file_types = [image/jpeg, image/png, image/jpg, image/gif]
		fullURL := fmt.Sprintf("%s/public/images/uploads/%s.%s", serverAddr, imageHash, ext) // full url which can be used to access image on client
		storage := fmt.Sprintf("./public/images/uploads/%s.%s", imageHash, ext)              // where should the images be stored?

		if ok { // if the file type is an image
			if err := c.SaveFile(file, storage); err != nil { // save image to disk
				return c.JSON(routes.HTTPResponse{
					Message: fmt.Sprintf("%v", err),
					Success: false,
					Data:    nil,
				})
			}

			ImageID, err := imageModel.SaveNewImage(0, fullURL, false, true)

			if err != nil {
				return c.JSON(routes.HTTPResponse{
					Message: fmt.Sprintf("%v", err),
					Success: false,
					Data:    nil,
				})
			}

			images = append(images, map[string]interface{}{
				"url": fullURL,
				"id":  ImageID,
			}) // append imageurl to slice
		}
	}

	return c.JSON(routes.HTTPResponse{
		Message: fmt.Sprintf("Saved %d files", len(images)),
		Success: true,
		Data:    images,
	})
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_")

func imgExt(filetype string) (string, bool) {
	switch filetype {
	case "image/jpeg":
		return "jpeg", true
	case "image/jpg":
		return "jpg", true
	case "image/png":
		return "png", true
	case "image/gif":
		return "gif", true
	default:
		return "", false
	}
}

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
