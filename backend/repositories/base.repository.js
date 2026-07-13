const pool = require("../database/db");

class BaseRepository {
  async query(sql, params = []) {
    try {
      return await pool.query(sql, params);
    } catch (error) {
      console.error("Database Error:", error.message);

      throw error;
    }
  }
}

module.exports = BaseRepository;
