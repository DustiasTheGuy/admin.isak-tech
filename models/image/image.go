package Image

import (
	"admin/database"
	"database/sql"
	"time"
)

type Image struct {
	ID        uint
	URL       string
	Date      time.Time
	PostID    uint
	Thumbnail int8
}

func RemoveImage(ImageID, postID uint64) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	_, err := db.Exec("DELETE FROM images WHERE id=?", ImageID)

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE posts SET totalimages = totalimages - 1 WHERE id = ?",
		postID)

	if err != nil {
		return err
	}

	return nil
}

func SaveNewImage(PostID uint64, URL string) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	_, err := db.Exec(
		"INSERT INTO images (url, postid) VALUES (?, ?)",
		URL, PostID)

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE posts SET imageurl = ?, totalimages = totalimages + 1 WHERE id = ?",
		URL, PostID)

	if err != nil {
		return err
	}

	return nil
}

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
