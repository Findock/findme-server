let month = new Date().getMonth() + 1;
month = month < 10 ? "0" + month : month;
let day = new Date().getDate() + 1;
day = day < 10 ? "0" + day : day;
const year = new Date().getFullYear();

module.exports = {
    type: process.env.DB_ENGINE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [ "dist/**/*.entity{.ts,.js}" ],
    migrations: [ "dist/src/find-me-db/migrations/**/*.js" ],
    cli: { migrationsDir: `src/find-me-db/migrations/${year}-${month}-${day}` },
    migrationsTableName: "migrations_history",
    migrationsRun: process.env.DB_AUTO_MIGRATE,
    ssl: true,
    extra: { ssl: { rejectUnauthorized: false } },
};
