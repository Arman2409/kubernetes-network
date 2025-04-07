package crons

import (
	"log"
	"math/rand"
	"time"

	"server/db"
	"server/models"
)

func updateDailyQuote() {
	// Reset the current quote of the day.
	result := db.DbClient.Model(&models.Quote{}).Where("is_quote_of_day = ?", true).Update("is_quote_of_day", false)
	if result.Error != nil {
		log.Printf("failed to reset current quote of the day: %v", result.Error)
		return
	}

	// Select a new random quote.
	var newQuote models.Quote
	var count int64

	if err := db.DbClient.Model(&models.Quote{}).Count(&count).Error; err != nil {
		log.Printf("failed to count quotes: %v", err)
		return
	}

	if count == 0 {
		log.Println("no quotes available to select as quote of the day")
		return
	}

	rand := rand.New(rand.NewSource(time.Now().UnixNano()))
	offset := rand.Int63n(count)

	if err := db.DbClient.Model(&models.Quote{}).Offset(int(offset)).First(&newQuote).Error; err != nil {
		log.Printf("failed to select new quote of the day: %v", err)
		return
	}

	result = db.DbClient.Model(&models.Quote{}).Where("is_quote_of_day = true").Update("is_quote_of_day", false)

	if result.Error != nil {
		log.Printf("Failed to update previous quote of the day: %v", result.Error);
		return
	}

	// Set the new quote as the quote of the day.
	result = db.DbClient.Model(&models.Quote{}).Where("id = ?", newQuote.ID).Update("is_quote_of_day", true)
	if result.Error != nil {
		log.Printf("Failed to set new quote of the day: %v", result.Error)
		return
	}

	log.Println("Daily quote updated successfully")
}

func StartDailyQuoteCron() {
	go func() {
		log.Println("Starting update daily quote cron")

		// Run the update immediately on startup
		updateDailyQuote()
		time.Sleep(1 * time.Second) // Small sleep
		
		for {
			now := time.Now()
			targetTime := time.Date(now.Year(), now.Month(), now.Day()+1, 0, 0, 0, 0, now.Location())
			waitTime := targetTime.Sub(now)

			if waitTime > 0 {
				log.Printf("Waiting %v until next daily quote update.", waitTime)
				time.Sleep(waitTime)
			}

			updateDailyQuote()

			// Small sleep to avoid running multiple times at the exact same moment.
			time.Sleep(1 * time.Second)
		}
	}()
}
