package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os/exec"

	"github.com/caarlos0/env"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type Config struct {
	Port string `env:"VITE_PORT" envDefault:"8080"`
}

type Question struct {
	Query string `json:"query"`
	Questioner string `json:"questioner"`
	IsGiveExample bool `json:"is_give_example"`
}


func main() {
	app := fiber.New()

	app.Static("/", "./dist")

	app.Use(cors.New())

	app.Get("/", func (c *fiber.Ctx) error {
		return c.SendFile("./dist/index.html")
	})

	app.Post("/api/qa", func (c *fiber.Ctx) error {
		question := new(Question)

		err := c.BodyParser(question)

		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with the input data.", "data": err})
		}

		var example string
		if question.IsGiveExample {
			example = "explain me with example"
		} else {
			example = ""
		}

		cmd := exec.Command("python3", "qa.py", `query_text=` + question.Query, `questioner=` + question.Questioner, `is_give_example=` + example)

		out, err := cmd.Output()

		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message":"Something's wrong with running the script.", "data": err})
		}
		
		
		var iot json.RawMessage
		err = json.Unmarshal(out, &iot)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message":"Something's wrong with parsing returned json data.", "data": err})
		}

		// return c.Status(200).JSON(fiber.Map{"status": "success", "message":"Api request Success.", "data": out})
		fmt.Println("Request accepted")
		return c.Status(200).JSON(&iot)
	})

	godotenv.Load()
	cfg := Config{}
	env.Parse(&cfg)

	log.Fatal(app.Listen(":" + cfg.Port))
}