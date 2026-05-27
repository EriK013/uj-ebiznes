package main

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"strings"

	"zadanie8/server/database"
	"zadanie8/server/models"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/crypto/bcrypt"
)

type credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func newToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func Register(c echo.Context) error {
	var creds credentials
	if err := c.Bind(&creds); err != nil || creds.Email == "" || creds.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Podaj email i hasło"})
	}

	var existing models.User
	if database.DB.Where("email = ?", creds.Email).First(&existing).Error == nil {
		return c.JSON(http.StatusConflict, map[string]string{"error": "Użytkownik już istnieje"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Błąd hashowania"})
	}

	user := models.User{Email: creds.Email, PasswordHash: string(hash)}
	if err := database.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Nie udało się utworzyć użytkownika"})
	}

	return c.JSON(http.StatusCreated, map[string]string{"email": user.Email})
}

func Login(c echo.Context) error {
	var creds credentials
	if err := c.Bind(&creds); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Błędne dane"})
	}

	var user models.User
	if database.DB.Where("email = ?", creds.Email).First(&user).Error != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Złe dane logowania"})
	}

	if bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(creds.Password)) != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Złe dane logowania"})
	}

	user.Token = newToken()
	database.DB.Save(&user)

	return c.JSON(http.StatusOK, map[string]string{
		"email": user.Email,
		"token": user.Token,
	})
}

func Me(c echo.Context) error {
	header := c.Request().Header.Get("Authorization")
	token := strings.TrimPrefix(header, "Bearer ")
	if token == "" {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Brak tokenu"})
	}

	var user models.User
	if database.DB.Where("token = ?", token).First(&user).Error != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Niepoprawny token"})
	}

	return c.JSON(http.StatusOK, map[string]string{"email": user.Email})
}

func main() {
	database.InitDB()

	e := echo.New()
	e.Use(middleware.CORS())

	e.POST("/register", Register)
	e.POST("/login", Login)
	e.GET("/me", Me)

	e.Logger.Fatal(e.Start(":8080"))
}
