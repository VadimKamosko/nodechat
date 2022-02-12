const bd = require("../db");

let chatModule = {
  setMessage: async (roomid, data, user, text, typemes) => {
    return await bd.query(
      `INSERT INTO "chat" ("roomid","data",name,text,typemes) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [roomid, data, user, text, typemes]
    );
  },
  getMsgs: async (id) => {
    return await bd.query(`SELECT * from chat where "roomid" = $1`, [id]);
  },
};

module.exports = chatModule;
// CREATE TABLE "chat"
// (
//     Id SERIAL PRIMARY KEY,
//     roomid INTEGER,
//     data char(10),
//     name char(50),
//     text text,
//     typemes char(50),
//     FOREIGN KEY ("roomid") REFERENCES "group"(id) ON DELETE CASCADE

// );
