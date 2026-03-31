package com.example.app 
import org.scalatra._

case class Product(id: Int, name: String, price: Double)

class ProductController extends ScalatraServlet {
  var products: List[Product] = List(
    Product(1, "Test1", 100.00),
    Product(2, "Test2", 40.00),
    Product(3, "Test3", 39.99)
  )

    get("/") {
        products.mkString("\n")
    }

    get("/:id") {
        val id = params("id").toInt
        products.find(_.id == id) match {
            case Some(product) => product.toString
            case None => halt(404,  s"Product $id not found")
        }
    }

    post("/") {
        val id = if (products.isEmpty) 1 else products.map(_.id).max + 1
        val name = params("name")
        val price = params("price").toDouble
        val newProduct = Product(id, name, price)
        products = products :+ newProduct
        s"Product $id created"
    }

    put("/:id") {
        val id = params("id").toInt
        val name = params("name")
        val price = params("price").toDouble
        products.find(_.id == id) match {
            case Some(_) =>
                products = products.map {
                    case p if p.id == id => Product(id, name, price)
                    case p => p
                }
                s"Product $id updated"
            case None => halt(404, s"Product $id not found")
        }
    }

    delete("/:id") {
        val id = params("id").toInt
        products.find(_.id == id) match {
            case Some(_) =>
                products = products.filterNot(_.id == id)
                s"Product $id deleted"
            case None => halt(404, s"Product $id not found")
        }
    }
}