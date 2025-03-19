package quotes_controller

import (
	"server/handlers"

	"github.com/gin-gonic/gin"
)

func SetUpQuotesController(router *gin.Engine) {
    handler := quotes_handlers.NewQuotesHandler()

	quoteGroup := router.Group("/quotes")
	{
		quoteGroup.GET("/random", handler.GetRandom)
		quoteGroup.GET("/for-today", handler.GetQuoteOfDay)
	}
}

