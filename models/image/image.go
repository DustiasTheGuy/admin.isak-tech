package Image

import (
	"admin/database"
	"admin/models"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

// Image is always accociated with a Post
type Image struct {
	ID        uint      // the unique identifer for an Image ( Auto Incremented in mysql )
	URL       string    // when a user clicks on the image, where should they be taken?
	Date      time.Time // when the row was created in mysql ( Auto populated )
	PostID    uint      // which post does this image have as it's parent?
	Thumbnail int8      // is this image a thumbnail for a post?
}

// RemoveImage is used for removing an image from the database - Also decrements the totalimages value on the post that it has as it's parent
func RemoveImage(ImageID, postID uint64) error {
	db := database.Connect(&database.SQLConfig{ // Create a new connection to mysql
		User:     "root",      // mysql user
		Password: "password",  // mysql password
		Database: "isak_tech", // the database that will be used
	})
	defer db.Close() // close the mysql connection right before returning this func

	_, err := db.Exec("DELETE FROM images WHERE id=?", ImageID) // Delete the image with it's ID

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE posts SET totalimages = totalimages - 1 WHERE id = ?", // decrement the totalimages on the post that the image had as it's parent
		postID)

	return err // will be nil if everything went fine
}

// SaveNewImage creates a new row in mysql
func SaveNewImage(PostID uint64, URL string) error {
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

	_, err := db.Exec(
		"INSERT INTO images (url, postid) VALUES (?, ?)",
		URL, PostID)

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE posts SET imageurl = ?, totalimages = totalimages + 1 WHERE id = ?",
		URL, PostID)

	return err
}

// GetImagesWithPostID is useful when querying posts but is still part of the IMAGE model
func GetImagesWithPostID(postID uint, db *sql.DB) ([]Image, error) {
	var images []Image
	// query relevant images
	rows, err := db.Query("SELECT * FROM images WHERE postid=?", postID) // select all images with postid

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
