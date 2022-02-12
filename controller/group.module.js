let db = require("../db");

let groupmodel = {
  createGroup: async (name, id) => {
    return await db.query(`INSERT INTO "group" ("name","id_group") VALUES ($1,$2) RETURNING id`, [
      name,
      id,
    ]);
  },
  createUserToGroup: async (idgroup, idusers) => {
    let str = "";
    for (let i = 0; i < idusers.length; i++) {
      str += `(${idgroup},${idusers[i]}),`;
    }
    str = str.slice(0, -1);
    let query = `insert into "groupUser" ("groupid","userid") VALUES ` + str;
    return await db.query(query);
  },
  getGroup: async (id) => {
    return await db.query(
      `SELECT * FROM "public"."group" where "id" in (SELECT "groupid" FROM "public"."groupUser" where "userid" =  $1)`,
      [id]
    );
  },
};

module.exports = groupmodel;

// CREATE TABLE "groupUser"
// (
//     Id SERIAL PRIMARY KEY,
//     groupid INTEGER,
//     userid INTEGER,
//     FOREIGN KEY ("groupid") REFERENCES "group"(id) ON DELETE CASCADE,
//     FOREIGN KEY ("userid") REFERENCES "user"(id) ON DELETE CASCADE
// );
// CREATE TABLE "group"
// ( id serial NOT NULL PRIMARY KEY,
//   name char(50) NOT NULL,
//   id_group char(50) NOT NULL
// );
// CREATE TABLE "chat"
// (
