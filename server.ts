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

// import { errorHandler } from "common/middlewares/responseHandler";

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
});
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("uploads"));

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
    console.log(`► ${config.dbDialect}: connected .....☪☻✔️`);
  })
  .catch((e: any) =>
    console.log(`${config.dbDialect} : Not connected ️❌️`, e)
  );

/**
 * route not found
 */
app.all("/**", (req: Request, res: Response) => {
  let data: Map<string, number> = new Map<string, number>();
  data.set("age", 1);
  data.set("years", 1999);
  data.set("mount", 1000);
  console.log(data.get("years"), ": years");
  console.log(data);
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
// app.use(errorHandler);
/**
 * running server
 */
httpServer.listen(config.port, () => {
  console.log("Server running on port " + config.port);
});
