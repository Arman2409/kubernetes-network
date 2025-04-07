package quotes_handlers

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"server/db"
	"server/models"
)

type QuotesHandler struct{}

func NewQuotesHandler() *QuotesHandler {
	return &QuotesHandler{}
}

func (h *QuotesHandler) GetRandom(c *gin.Context) {
	var quote models.Quote
	var count int64

	result := db.DbClient.Model(&models.Quote{}).Count(&count)

	if result.Error != nil {
		log.Printf("failed to count the quotes: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to count the quotes",
		})
		return
	}

	rand := rand.New(rand.NewSource(time.Now().UnixNano()))
	offset := rand.Int63n(count)

	result = db.DbClient.Model(&models.Quote{}).Offset(int(offset)).First(&quote)

	if result.Error != nil {
		log.Printf("failed to get random quote: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to count the quotes",
		})
		return
	}

	c.JSON(http.StatusOK, quote)
}

func (h *QuotesHandler) GetQuoteOfDay(c *gin.Context) {
	var quote models.Quote
	err := db.DbClient.Where("is_quote_of_day = ?", true).First(&quote).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "No quote of the day available.",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error.",
		})
		return
	}

	c.JSON(http.StatusOK, quote)
}
