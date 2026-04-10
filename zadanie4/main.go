package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ID int `json:"id"`
	Name string `json:"name"`
}

var products []Product
var nextID int = 1

func GetProducts(c echo.Context) error {
    return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	for _, product := range products {
		if product.ID == id {
			return c.JSON(http.StatusOK, product)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}


func createProduct(c echo.Context) error {
	var newProduct Product
	if err := c.Bind(&newProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}
	newProduct.ID = nextID
	nextID++
	products = append(products, newProduct)
	return c.JSON(http.StatusCreated, newProduct)
}

func updateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}
	var updatedProduct Product
	if err := c.Bind(&updatedProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}
	for i, product := range products {
		if product.ID == id {
			products[i].Name = updatedProduct.Name
			return c.JSON(http.StatusOK, products[i])
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func deleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}
	for i, product := range products {
		if product.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted"})
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func main(){
	e := echo.New()

	e.GET("/products", GetProducts)
	e.GET("/products/:id", GetProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)
	e.POST("/products", createProduct)



	e.Logger.Fatal(e.Start(":8080"))


}