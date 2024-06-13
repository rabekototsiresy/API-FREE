import jwt from "jsonwebtoken";
import moment from "moment";
import { IUser } from "common/interfaces/IUser";
import { config } from "./../../config";

export function signToken(user: IUser): string {
  const tokenPayload = {
    sub: {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    iat: moment().toDate().getTime(),
  };
  // console.log(tokenPayload);
  // Assuming 'exp' is specified in minutes as a string like '60m'
  const expInMinutes = "60m";

  // Convert 'exp' from minutes to seconds
  const expInSeconds = parseInt(expInMinutes) * 60;

  // Calculate the expiration time in Unix timestamp format
  const expirationTimestamp = Math.floor(Date.now() / 1000) + expInSeconds;

  // console.log(expirationTimestamp);



  return jwt.sign(tokenPayload, config.secretToken, {
    expiresIn: expirationTimestamp,
  });
}

export function decodeToken(
  token: string
): string | { [key: string]: string } | null {
  return jwt.decode(token);
}
