package database

import (
	"zadanie4/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	db, err := gorm.Open(sqlite.Open("zadanie4.db"), &gorm.Config{})
    if err != nil {
        panic("Nie udało się połączyć z bazą danych")
    }
    DB = db
	DB.AutoMigrate(&models.Product{})
}