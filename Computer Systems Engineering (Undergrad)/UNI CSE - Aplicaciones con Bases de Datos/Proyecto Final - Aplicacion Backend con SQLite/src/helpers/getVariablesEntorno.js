export function getVariablesEntorno() {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "localhost";
    return { PORT, HOST };
}

export function getVariablesDB() {
    const DB_PLATFORM = process.env.DB_PLATFORM || "sqlite";
    const DB_NAME     = process.env.DB_NAME     || "cdas.db";
    const USER        = process.env.USER        || "";
    const PASSWORD    = process.env.PASSWORD    || "";
    return { DB_PLATFORM, DB_NAME, USER, PASSWORD };
}
