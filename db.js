const { Pool } = require("pg");

const pool = new Pool({
  host: "hattie.db.elephantsql.com",
  port: "5432",
  user: "nelqfcyz",
  password: "JUDVmiidUj483xX1Jq3DsoKtg94appdh",
  max: 20,
  database: "nelqfcyz",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
