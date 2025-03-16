package models

import (
	"time"
)

type Quote struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	Text         string `json:"text" gorm:"not null"`
	Author       string `json:"author" gorm:"not null"`
	IsQuoteOfDay bool   `json:"isQuoteOfDay" gorm:"default:false"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
