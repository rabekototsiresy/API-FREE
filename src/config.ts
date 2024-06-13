import * as dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

assert(process.env.PORT, "PORT is required");
assert(process.env.DB_NAME, "DB_NAME is required");
assert(process.env.DB_USER, "DB_USER is required");
assert(process.env.DB_HOST, "DB_HOST is required");
assert(process.env.DB_PASSWORD, "DB_PASSWORD is required");
assert(process.env.DB_DIALECT, "DB_DIALECT is required");
assert(process.env.SECRET_TOKEN, "SECRET_TOKEN is required");
assert(process.env.DB_PORT, "DB_PORT is required");
assert(process.env.PLANET_PRESS_URL, "PLANET_PRESS_URL is required");
assert(process.env.ARCHIVE_DOCS_DIRECTORY, "ARCHIVE_DOCS_DIRECTORY is required");

export const config = {
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbDialect: process.env.DB_DIALECT,
    secretToken: process.env.SECRET_TOKEN,
    dbPort: +process.env.DB_PORT,
    planetPressUrl: process.env.PLANET_PRESS_URL,
    archiveDocsDirectory: process.env.ARCHIVE_DOCS_DIRECTORY,
};