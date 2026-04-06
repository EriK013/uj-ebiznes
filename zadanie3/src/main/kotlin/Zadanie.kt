import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json


@Serializable
data class Message (val content: String)

fun main() = runBlocking {
    val webhookUrl = System.getenv("DISCORD_WEBHOOK_URL") ?: error("DISCORD_WEBHOOK_URL error")
    
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    println("Enter a message to send to the webhook:")
    val messageContent = readLine() ?: "Test message"

    val response = client.post(webhookUrl) {
        contentType(ContentType.Application.Json)
        setBody(Message(content = messageContent))
    }

    println("Response : ${response.status}")
    client.close()
}