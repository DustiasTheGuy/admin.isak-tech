package page

import (
	"admin/database"
	"admin/models"
	"errors"
	"time"
)

// Page contains all data accociated with a page
type Page struct {
	ID          uint      `json:"id"`          // unique identifier
	URL         string    `json:"url"`         // where should the user be taken when clicking
	Description string    `json:"description"` // describe it, should be short and concise
	ImageURL    string    `json:"imgUrl"`      // imageurl, self explainatory
	Created     time.Time `json:"created"`     // auto populated in mysql
}

func GetAllPages() ([]Page, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_portal",
	})
	defer db.Close()

	rows, err := db.Query("SELECT * FROM pages")

	if err != nil {
		return nil, err
	}

	var pages []Page
	for rows.Next() {
		var page Page

		if err := rows.Scan(
			&page.ID,
			&page.URL,
			&page.Description,
			&page.ImageURL,
			&page.Created); err != nil {
			return nil, err
		}

		pages = append(pages, page)
	}

	return pages, nil
}

func GetSinglePage(ID uint64) (*Page, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_portal",
	})
	defer db.Close()

	row := db.QueryRow("SELECT * FROM pages WHERE id = ?", ID)

	var page Page
	if err := row.Scan(
		&page.ID,
		&page.URL,
		&page.Description,
		&page.ImageURL,
		&page.Created); err != nil {
		return nil, err
	}

	return &page, nil
}

func (p *Page) SaveNewPage() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_portal",
	})
	defer db.Close()

	if !models.CheckLength(p.URL, 7) {
		return errors.New("URL too short, minimum 7 characters")
	} else if !models.CheckLength(p.Description, 10) {
		return errors.New("Description too short, minimum 10 characters")
	} else if !models.CheckLength(p.ImageURL, 10) {
		return errors.New("Image URL too short, minimum 10 characters")
	}

	_, err := db.Exec("INSERT INTO pages (url, description, imageurl) VALUES (?, ?, ?)",
		p.URL, p.Description, p.ImageURL)

	return err
}

func (p *Page) UpdatePage() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_portal",
	})
	defer db.Close()

	if !models.CheckLength(p.URL, 7) {
		return errors.New("URL too short, minimum 7 characters")
	} else if !models.CheckLength(p.Description, 10) {
		return errors.New("Description too short, minimum 10 characters")
	} else if !models.CheckLength(p.ImageURL, 10) {
		return errors.New("Image URL too short, minimum 10 characters")
	}

	_, err := db.Exec("UPDATE pages SET url = ?, description = ?, imageurl = ? WHERE id = ?",
		p.URL, p.Description, p.ImageURL, p.ID)

	return err
}

func DeleteOnePage(ID uint64) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_portal",
	})
	defer db.Close()

	_, err := db.Exec("DELETE FROM pages WHERE id = ?", ID)

	return err
}
