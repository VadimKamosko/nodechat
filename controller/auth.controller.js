const db = require("../db");

let AuthController = {
  getUser: async (email) => {
    return await db.query(`SELECT * from "user" where "email" =$1`, [email]);
  },
  getAllUser: async () => {
    return await db.query(`SELECT * from "user" limit 100`);
  },
  addUser: async (email, password) => {
    let ans = await db.query(
      `INSERT INTO "user" ("email","password") VALUES ($1,$2) RETURNING id`,
      [email, password]
    );
    return ans;
  },
  updateUser: async (email, password) => {
    let ans = await db.query(`UPDATE "user" SET "password" = $1 WHERE "email" =$2 RETURNING id`, [
      password,
      email,
    ]);
    return ans;
  },
  deleteUser: async (id) => {
    let ans = await db.query("SELECT * from User where id =$1", [id]);
    return ans;
  },
};

module.exports = AuthController;
