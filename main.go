package main

import (
	"github.com/ivpusic/golog"
	"github.com/ivpusic/neo"
	"github.com/ivpusic/neo/middlewares/logger"
)

var (
	log = golog.GetLogger("application")
)

func main() {
	log.Info("Regards from Neo")

	app := neo.App()
	app.Use(logger.Log)

	app.Get("/", func(this *neo.Ctx) {
		this.Res.Text("Works!", 200)
	})

	app.Start()
}
