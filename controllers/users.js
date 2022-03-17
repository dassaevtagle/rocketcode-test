const pool = require('../database/database')

const addUser = async (req, res) => {
  try{
    await pool.query(`INSERT INTO ${process.env.DATABASE_TEST_TABLE} set ?`, [req.body]);
    res.status(200).json({
      succes: true,
      user: {...req.body}
    })
  } catch {
    res.status(500).json({
      succes: false,
      message: "User could not be saved. Try again."
    })
  }
}

module.exports = { addUser}