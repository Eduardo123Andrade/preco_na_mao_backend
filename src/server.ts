import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./error/errorHandler";

const app = fastify()


app.register(authRoutes)
app.setErrorHandler(errorHandler)

app.listen({
  port: 3333
}).then(console.log)