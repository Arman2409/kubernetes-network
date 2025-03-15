package quotes_handlers

import (
	"net/http"
	"server/models"

	"github.com/gin-gonic/gin"
)

type QuotesHandler struct {}

func NewQuotesHandler() *QuotesHandler {
	return &QuotesHandler{}
}

var quote = &models.Quote{
	Text: "Random Quote",
	Author: "Hello World",
}

var todaysQuote = &models.Quote{
	Text: "Today's Quote",
	Author: "Hello World",
}

func (h *QuotesHandler) GetRandom (c *gin.Context) {

	c.JSON(http.StatusOK, quote)
}

func (h *QuotesHandler) GetForToday (c *gin.Context) {

	c.JSON(http.StatusOK, todaysQuote)
}
