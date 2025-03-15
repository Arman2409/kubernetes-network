package models

import (
	"time"
)

type Quote struct {
	ID        uint      `gorm:"primaryKey"` 
	Text      string    `gorm:"not null"`  
	Author    string    `gorm:"not null"`   
	CreatedAt time.Time 
	UpdatedAt time.Time 
}
