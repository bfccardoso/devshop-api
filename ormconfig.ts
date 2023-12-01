// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { DataSource } from "typeorm"

const connectionSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB),
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    synchronize: false,
    logging: false,
    entities: ["src/**/*.entity{.js,.ts}"],
    migrations: ["src/migration/*{.js,.ts}"]
});

export default connectionSource;