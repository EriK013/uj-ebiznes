package main

import (
	"net/http"
	"zadanie4/database"
	"zadanie4/models"
	"github.com/labstack/echo/v4"
)

func GetProducts(c echo.Context) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	return c.JSON(http.StatusOK, product)
}


func createProduct(c echo.Context) error {
	var newProduct models.Product
	if err := c.Bind(&newProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}
	database.DB.Create(&newProduct)
	return c.JSON(http.StatusCreated, newProduct)
}

func updateProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	var updatedProduct models.Product
	if err := c.Bind(&updatedProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	product.Name = updatedProduct.Name
	database.DB.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func deleteProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	database.DB.Delete(&product)
	return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted"})
}
	

func main(){
	database.InitDB()
	
	e := echo.New()

	e.GET("/products", GetProducts)
	e.GET("/products/:id", GetProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)
	e.POST("/products", createProduct)



	e.Logger.Fatal(e.Start(":8080"))


}