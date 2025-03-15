package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	quotes_controller "server/controllers"
	"server/db"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("No .env file found, exitng...")
		return
	}

	err = db.InitDB()

	if err != nil {
		log.Fatalf("Failed to initialize the database")
	}

	err = db.Seed()

	if err != nil {
		log.Fatalf("Failed to seed the database")
	}

	router := gin.Default()

	router.Use(cors.Default())
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Server running!")
	})

	quotes_controller.SetUpQuotesController(router)

	router.Run(":8080")
}
