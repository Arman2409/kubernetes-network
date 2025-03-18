package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	quotes_controller "server/controllers"
	"server/crons"
	"server/db"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("No .env file found, exitng...")
		return
	}

	// Check for CMD commands
	if len(os.Args) > 1 {
		switch os.Args[1] {
		case "migrate":
			db.InitDB()
			return
		case "seed":
			db.InitDB()
			db.Seed()
			return
		}
	}

	err = db.InitDB()

	if err != nil {
		log.Fatalf("Failed to initialize the database")
	}

	err = db.Seed()

	if err != nil {
		log.Fatalf("Failed to seed the database")
	}

	crons.StartDailyQuoteCron()

	router := gin.Default()

	router.Use(cors.Default())
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Server running!")
	})

	quotes_controller.SetUpQuotesController(router)

	router.Run(":8080")
}
