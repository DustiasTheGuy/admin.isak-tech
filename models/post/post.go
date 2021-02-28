package post

import (
	"admin/database"
	"admin/models"
	imageModel "admin/models/image"
	"errors"
	"time"
)

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
	Images      []imageModel.Image
}

func RemovePost(postID uint64) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	_, err := db.Exec("DELETE FROM posts WHERE id = ?", postID)

	return err
}

func (p *Post) SaveNewPost() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	if !models.CheckLength(p.Post, 25) {
		return errors.New("You forgot to enter a post")
	} else if !models.CheckLength(p.Title, 10) {
		return errors.New("You forgot to enter a title")
	} else if !models.CheckLength(p.Category, 10) {
		return errors.New("You forgot to enter a category")
	} else if !models.CheckLength(p.ImageURL, 10) {
		return errors.New("You forgot to enter an image url")
	}

	_, err := db.Exec("INSERT INTO posts (post, title, category, userid, imageurl) VALUES (?, ?, ?, ?, ?)",
		p.Post, p.Title, p.Category, p.UserID, p.ImageURL)

	return err
}

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
		images, err := imageModel.GetImagesWithPostID(post.ID, db)

		if err != nil {
			return nil, err
		}

		post.Images = images        // update images to slice populated with images from mysql
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

	var post Post // will be populated with data from mysql

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
		return nil, err
	}

	images, err := imageModel.GetImagesWithPostID(post.ID, db)

	if err != nil {
		return nil, err
	}

	post.Images = images // update images to slice populated with images from mysql

	return &post, nil
}

func (p *Post) UpdatePostWithID() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	_, err := db.Exec("UPDATE posts SET title=?, post=?, category=?, archived=?, imageurl=? WHERE id=?",
		p.Title, p.Post, p.Category, p.Archived, p.ImageURL, p.ID)

	if err != nil {
		return err
	}

	return nil
}
