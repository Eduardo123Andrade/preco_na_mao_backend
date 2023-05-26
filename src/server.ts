import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./error/errorHandler";
import fastifyJwt from "@fastify/jwt";
import { onRequestHook } from "./hooks/onRequest";
import { userRoutes } from "./routes/user";

const app = fastify()


app.register(fastifyJwt, { secret: "b4d secr3T!123@@" })

app.register(userRoutes)
app.register(authRoutes)

app.setErrorHandler(errorHandler)

app.addHook("onRequest", onRequestHook)


app.listen({
  port: 3333
}).then(console.log)