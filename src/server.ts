import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { errorHandler } from "./error/errorHandler";
import { onRequestHook } from "./hooks/onRequest";
import { authRoutes, marketplaceRoutes, productRoutes, shoppingListRoutes, userRoutes, } from "./routes";

const app = fastify()

app.register(fastifyJwt, { secret: "b4d secr3T!123@@" })

app.register(authRoutes)
app.register(marketplaceRoutes)
app.register(productRoutes)
app.register(userRoutes)
app.register(shoppingListRoutes)

app.setErrorHandler(errorHandler)

app.addHook("onRequest", onRequestHook)

app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(console.log)