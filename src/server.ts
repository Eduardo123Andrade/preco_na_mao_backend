import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./error/errorHandler";
import fastifyJwt from "@fastify/jwt";
import { onRequestHook } from "./hooks/onRequest";
import { userRoutes } from "./routes/user";
import { shoppingListRoutes } from "./routes/shoppingList";
import { marketplaceRoutes } from "./routes/marketplace";
import { productRoutes } from "./routes/products";

const app = fastify()

app.register(fastifyJwt, { secret: "b4d secr3T!123@@" })

app.register(authRoutes)
app.register(marketplaceRoutes)
app.register(productRoutes)
app.register(userRoutes)
app.register(shoppingListRoutes)

// app.setErrorHandler(errorHandler)

app.addHook("onRequest", onRequestHook)


app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(console.log)