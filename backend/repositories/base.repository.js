const pool = require("../database/db");

class BaseRepository {
  async query(sql, params = [], client = null) {
    const db = client || pool;

    try {
      return await db.query(sql, params);
    } catch (error) {
      console.error("Database Error:", error.message);
      throw error;
    }
  }
}

module.exports = BaseRepository;
