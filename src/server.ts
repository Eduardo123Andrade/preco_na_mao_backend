import fastify from "fastify";
import { authRoutes } from "./routes/auth";

const app = fastify()


app.register(authRoutes)

app.listen({
  port: 3333
}).then(console.log)