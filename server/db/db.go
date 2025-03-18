package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"server/models"
)

var DbClient *gorm.DB

func InitDB() error {

	var err error

	DbClient, err = gorm.Open(
		postgres.Open(os.Getenv("DATABASE_URL")),
		&gorm.Config{},
	)

	if err != nil {
		log.Printf("Failed to connect to database: %v", err)

		return fmt.Errorf("failed to connect to database")
	}

	log.Println("Database connected successfully!")

	err = DbClient.AutoMigrate(&models.Quote{})
	if err != nil {
		log.Printf("Failed to migrate the database: %v", err)

		return fmt.Errorf("failed to migrate the database")
	}

	log.Println("Database migrated successfully!")
	return nil
}
