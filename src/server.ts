import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./error/errorHandler";
import fastifyJwt from "@fastify/jwt";

const app = fastify()


app.register(fastifyJwt, { secret: "b4d secr3T!123@@" })

app.register(authRoutes)
app.setErrorHandler(errorHandler)

// app.addHook("onRequest", (request, reply, done) => {
//   console.log("oi")
//   const path = request.routerPath
//   console.log({ path })
//   if (path === "/auth/logout")
//     return reply.status(httpStatus.UNAUTHORIZED).send({ massage: "flw" })
//   done()
// })


app.listen({
  port: 3333
}).then(console.log)