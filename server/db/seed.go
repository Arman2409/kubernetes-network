package db

import (
	"log"
	"server/models"
)

var quotes = []models.Quote{
	{Text: "The only limit to our realization of tomorrow is our doubts of today.", Author: "Franklin D. Roosevelt"},
	{Text: "Do what you can, with what you have, where you are.", Author: "Theodore Roosevelt"},
	{Text: "Life is what happens when you're busy making other plans.", Author: "John Lennon"},
}

func Seed() error {
	var count int64
	DbClient.Model(&models.Quote{}).Count(&count)

	if count == 0 {
		err := DbClient.Create(&quotes).Error

		if err != nil {
			log.Printf("Failed to seed the database, %v", err)
			return err
		}

		log.Println("Database seeded with quotes!")
	} else {
		log.Println("Database already seeded. Skipping...")
	}
	return nil
}
