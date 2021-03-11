package users

import (
	pageModel "admin/models/page"
	userModels "admin/models/user"
	"admin/routes"
	"admin/routes/index"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// SitePortalHandler for handling the - portal.isak-tech.tk || portal
func PortalGetController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	pages, err := pageModel.GetAllPages()

	if err != nil {
		return c.Redirect("/?err=internal server error")
	}

	if user != nil {
		return c.Render("sites/portal/index", fiber.Map{
			"Title":    "Portal",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Portal", "linkTo": "/site/portal"},
			},
			"Pages":   pages,
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/sign-in?err=please sign in")
}

func PortalGetPageController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

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
			"Title":    fmt.Sprintf("Page %d", pageID),
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
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
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 2) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	fmt.Println("Request From: ", c.OriginalURL())
	var p pageModel.Page
	user := index.GetSession(c).Get("User")

	if err := c.BodyParser(&p); err != nil {
		return c.Redirect("/site/portal/page/add-page?err=unable to parse body")
	}

	if user != nil {
		if err := p.UpdatePage(); err != nil {
			return c.Redirect(fmt.Sprintf("/site/portal/page/add-page?err=%v", err))
		}

		return c.Redirect("/site/portal?s=page has been updated")
	}

	return c.Redirect("/?err=session invalid")
}

func PortalDeleteOneController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 3) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	fmt.Println("Request From: ", c.OriginalURL())
	user := index.GetSession(c).Get("User")

	if user != nil {
		id, err := strconv.ParseUint(c.Params("pageID"), 10, 64)

		if err != nil {
			return c.Redirect("/site/portal?err=invalid parameter recieved")
		}

		if err := pageModel.DeleteOnePage(id); err != nil {
			return c.Redirect("/site/portal/?err=unable to delete post")
		}

		return c.Redirect("/site/portal?s=page has been deleted")
	}

	return c.Redirect("/?err=session invalid")
}

func PortalAddNewGetController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/portal/add_new", fiber.Map{
			"Title":    "Add New",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Portal", "linkTo": "/site/portal"},
				{"text": "Add New", "linkTo": "/site/portal/page/add-page"},
			},
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/site/portal?err=an error has occured")
}

func PortalAddNewPostController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 1) {
		return c.JSON(routes.HTTPResponse{
			Message: "You lack the nessecary privileges",
			Success: false,
			Data:    nil,
		})
	}

	var p pageModel.Page
	user := index.GetSession(c).Get("User")

	if err := c.BodyParser(&p); err != nil {
		return c.Redirect("/site/portal/page/add-page?err=unable to parse body")
	}

	if user != nil {

		if err := p.SaveNewPage(); err != nil {
			return c.Redirect(fmt.Sprintf("/site/portal/page/add-page?err=%v", err))
		}

		return c.Redirect("/site/portal?s=page has been saved")
	}

	return c.Redirect("/?err=an error has occured")
}

func PortalSiteInfoController(c *fiber.Ctx) error {
	if !userModels.IsAllowedAccess(index.ParsePrivileges(index.GetSession(c)), 0) {
		return c.Redirect("/site/portal?err=You lack the nessecary privileges")
	}

	user := index.GetSession(c).Get("User")

	if user != nil {
		return c.Render("sites/portal/site_info", fiber.Map{
			"Title":    "Portal Site Info",
			"Subtitle": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may",
			"User":     user,
			"Error":    c.Query("err"),
			"Breadcrumbs": []map[string]string{
				{"text": "Home", "linkTo": "/"},
				{"text": "Portal", "linkTo": "/site/portal"},
				{"text": "Site Info", "linkTo": "/site/portal/site-information"},
			},
			"Success": c.Query("s"),
		}, "layouts/main")
	}

	return c.Redirect("/site/portal?err=an error has occured")
}
