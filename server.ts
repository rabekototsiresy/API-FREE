import { handleMspController } from "./src/modules/msp/controllers/handleMspController";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./src/config";
import { AppRoute } from "./src/router";
export * from "./src/common/models";
import { dbInstance } from "./src/common/services/DBService";
import { ApiResponse } from "./src/common/helpers/ApiResponse";
import { SERVER_ERROR_CODE_500 } from "./src/common/constants/HTTP_CODE";
import { JwtAuth } from "./src/common/services/PassportService";
import { Server } from "socket.io";
import { createServer } from "http";
import morgan from "morgan";

import { scheduleOldDataDeletion } from "./src/common/helpers/utilsHelper";
import { pgSocketController } from "./src/modules/article/pgSocketController";
import axios from "axios";

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
});
// app.use(morgan("combined"));
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("uploads"));
morgan.token("date", () => {
  return new Date().toISOString(); // Retourne une date ISO 8601 (exemple : 2025-01-10T12:34:56.789Z)
});

// Jeton pour inclure le corps de la requête
morgan.token("api-response", (req: any) => {
  return req.apiResponse ? JSON.stringify(req.apiResponse) : "-";
});

// Configuration de morgan avec les jetons personnalisés
app.use(
  morgan(
    ":date :method :url :status :res[content-length] - :response-time ms - PP Response: :api-response"
  )
);

/**
 * app oute
 */

app.use("/api/v1", AppRoute);

/**
 * ping server
 */

app
  .route("/")
  .get((req: Request, res: Response, next: NextFunction) =>
    res.sendStatus(200)
  );

/**
 * passport config
 */

JwtAuth().catch((err) => {
  console.error(err);
});

dbInstance
  .authenticate()
  .then(async () => {
    await dbInstance.sync({ alter: false });
    if (config.mode === "dev") {
      console.log(`► ${config.dbDialect}: connected .....☪☻✔️ `);
    }
  })
  .catch((e: any) => {
    if (config.mode === "dev") {
      console.log(`${config.dbDialect} : Not connected ️❌️`, e);
    }
  });

/**
 * route not found
 */
app.all("/**", (req: Request, res: Response) => {
  res.status(404).send("Page not found ");
});

/**
 * handle error
 */
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  return ApiResponse(
    res,
    SERVER_ERROR_CODE_500,
    false,
    "Oops something went wrong:" + err
  );
});

/**
 * SOCKET
 */

io.on("connection", (socket) => {
  socket.on("on_pg_pending", async (body) => {
    await pgSocketController(socket, body);
  });
  socket.on("on_rmsp_pending", async (body) => {
    await handleMspController(socket, body);
  });
});
/**
 * END SOCKET
 */
// app.use(errorHandler);
/**
 * running server
 */
httpServer.listen(config.port, async () => {
  scheduleOldDataDeletion();
  if (config.mode === "dev") {
    console.log("SERVER: OK - PORT: " + config.port);
  } else {
    console.log("WELCOME TO FREE APP");
  }
});
