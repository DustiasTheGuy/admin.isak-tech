package Image

import (
	"admin/database"
	"admin/models"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

// Image is a struct for storing stuff related to a image row in mysql
type Image struct {
	ID        int64     // the unique identifer for an Image ( Auto Incremented in mysql )
	URL       string    // when a user clicks on the image, where should they be taken?
	Date      time.Time // when the row was created in mysql ( Auto populated )
	PostID    int64     // which post does this image have as it's parent?
	Thumbnail int8      // is this image a thumbnail for a post?
}

// RemoveImage is used for removing an image from the database - Also decrements the totalimages value on the post that it has as it's parent
func RemoveImage(ImageID, postID int64) error {
	db := database.Connect(&database.SQLConfig{ // Create a new connection to mysql
		User:     "root",      // mysql user
		Password: "password",  // mysql password
		Database: "isak_tech", // the database that will be used
	})
	defer db.Close() // close the mysql connection right before returning this func

	images, err := GetImagesWithPostID(postID, db)

	if err != nil {
		return err
	}

	if len(images) <= 1 {
		return errors.New("You cannot remove the last image of a post")
	}

	_, err = db.Exec("DELETE FROM images WHERE id = ?", ImageID) // Delete the image with it's ID

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE posts SET total_images = total_images - 1 WHERE id = ?", // decrement the totalimages on the post that the image had as it's parent
		postID)

	return err // will be nil if everything went fine
}

// SaveNewImage creates a new row in mysql
func SaveNewImage(PostID int64, URL string, updateThumbnail bool, alone bool) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	if !models.CheckLength(URL, 10) {
		fmt.Println("Returning an error")
		return errors.New("Image URL must be 10 characters long")
	}

	result, err := db.Exec(
		"INSERT INTO images (url, post_id) VALUES (?, ?)",
		URL, PostID)

	if err != nil {
		fmt.Printf("Err When Saving Img %v\n", err)
		return err
	}

	ImageID, err := result.LastInsertId()

	if err != nil {
		return err
	}

	if updateThumbnail {
		_, err = db.Exec(
			"UPDATE posts SET thumbnail = ? WHERE id = ?",
			ImageID, PostID)

		if err != nil {
			return err
		}
	}

	if !alone {
		_, err = db.Exec("UPDATE posts SET total_images = total_images + 1 WHERE id = ?", PostID)
	}

	if err != nil {
		return err
	}

	return nil
}

// GetImagesWithPostID is useful when querying posts but is still part of the IMAGE model
func GetImagesWithPostID(postID int64, db *sql.DB) ([]Image, error) {
	var images []Image
	// query relevant images
	rows, err := db.Query("SELECT * FROM images WHERE post_id=?", postID) // select all images with postid

	if err != nil {
		return nil, err
	}

	for rows.Next() { // loop images and append to images slice
		var image Image // temporary variable
		if err := rows.Scan(
			&image.ID,
			&image.URL,
			&image.Date,
			&image.PostID,
			&image.Thumbnail); err != nil {
			return nil, err
		}

		images = append(images, image) // append to slice
	}

	return images, nil
}

func GetImageWithID(imageID int64, db *sql.DB) *Image {
	var image Image

	row := db.QueryRow("SELECT * FROM images WHERE id=?", imageID)

	if err := row.Scan(
		&image.ID,
		&image.URL,
		&image.Date,
		&image.PostID,
		&image.Thumbnail); err != nil {
		return nil
	}

	return &image
}

func GetAllImages() ([]Image, error) {
	var images []Image

	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	rows, err := db.Query("SELECT * FROM images")

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var image Image

		if err := rows.Scan(
			&image.ID,
			&image.URL,
			&image.Date,
			&image.PostID,
			&image.Thumbnail); err != nil {
			return nil, err
		}

		images = append(images, image)
	}

	return images, nil
}
