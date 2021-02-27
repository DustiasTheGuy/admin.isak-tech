package users

import (
	pageModel "admin/models/page"
	"admin/routes/index"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// SitePortalHandler for handling the - portal.isak-tech.tk || portal
func PortalGetController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	pages, err := pageModel.GetAllPages()

	if err != nil {
		return c.Redirect("/?err=internal server error")
	}

	if user != nil {
		return c.Render("sites/portal/index", fiber.Map{
			"Title": "Portal",
			"User":  user,
			"Error": c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Portal", "linkTo": "/site/portal"},
			},
			"Pages":   pages,
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

func PortalGetPageController(c *fiber.Ctx) error {
	user := index.GetSession(c).Get("User")

	pageID, err := strconv.ParseUint(c.Params("pageID"), 10, 64)

	if err != nil {
		return c.Redirect("/site/portal?err=invalid parameter recieved")
	}

	page, err := pageModel.GetSinglePage(pageID)

	if err != nil {
		return c.Redirect("/site/portal?err=page may have been moved or deleted")
	}

	if user != nil {
		return c.Render("sites/portal/page", fiber.Map{
			"Title": fmt.Sprintf("Page %d", pageID),
			"User":  user,
			"Error": c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Account", "linkTo": "/users/account"},
				{"text": "Portal", "linkTo": "/site/portal"},
				{"text": fmt.Sprintf("Page %d", pageID), "linkTo": fmt.Sprintf("/site/portal/page/%d", pageID)},
			},
			"Page":    page,
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

func PortalUpdateController(c *fiber.Ctx) error {
	return c.Redirect(fmt.Sprintf("/site/portal/page/%s?err=page under construction", c.Params("pageID")))
}

func PortalDeleteOneController(c *fiber.Ctx) error {
	return nil
}

func PortalAddNewController(c *fiber.Ctx) error {
	return nil
}
