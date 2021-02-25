package post

import (
	"admin/database"
	"time"
)

/* isak-tech structs */

type Post struct {
	ID          uint
	Post        string
	Title       string
	Category    string
	Date        time.Time
	UserID      uint
	Archived    int8
	ImageURL    string
	TotalImages uint
	Images      []Image
}

type Image struct {
	ID        uint
	URL       string
	Date      time.Time
	PostID    uint
	Thumbnail int8
}

/* isak-tech structs */

// GetAllPosts is used for getting all posts from the database
func GetAllPosts() ([]Post, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	var posts []Post                             // store the posts that will be queried
	rows, err := db.Query("SELECT * FROM posts") // execute a query

	if err != nil {
		// return an error
		return nil, err
	}

	// i=0; i <rows.length; i++;
	for rows.Next() { // loop over query results
		var post Post // storage for every single iteration

		if err := rows.Scan( // scan content of query results index into post variable
			&post.ID,
			&post.Post,
			&post.Title,
			&post.Category,
			&post.Date,
			&post.UserID,
			&post.Archived,
			&post.ImageURL,
			&post.TotalImages); err != nil {
			return nil, err
		}

		posts = append(posts, post) // append to posts slice
		// i++
	}

	return posts, nil
}

// GetPostById selects one post with its primary key
func GetPostById(ID uint64) (*Post, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	var post Post      // will be populated with data from mysql
	var images []Image // will be populated with data from mysql

	row := db.QueryRow("SELECT * FROM posts WHERE id=?", ID) // select one row with primary key

	if err := row.Scan( // scan row into post variable
		&post.ID,
		&post.Post,
		&post.Title,
		&post.Category,
		&post.Date,
		&post.UserID,
		&post.Archived,
		&post.ImageURL,
		&post.TotalImages); err != nil {
		return &Post{}, err
	}

	// query relevant images
	rows, err := db.Query("SELECT * FROM images WHERE postid=?", post.ID) // select all images with postid

	if err != nil {
		return &Post{}, err
	}

	for rows.Next() { // loop images and append to images slice
		var image Image // temporary variable
		if err := rows.Scan(
			&image.ID,
			&image.URL,
			&image.Date,
			&image.PostID,
			&image.Thumbnail); err != nil {
			return &Post{}, err
		}

		images = append(images, image) // append to slice
	}

	post.Images = images // update images to slice populated with images from mysql

	return &post, nil
}
