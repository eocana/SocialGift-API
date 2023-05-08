const db = require('../daos/users.dao.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  //Retocar el codi
  
  app.post('/gifts', async (req, res) => {
    try {
      const { name, recipient, user_id } = req.body;
      const connection = await pool.getConnection();
      const [results] = await connection.execute(
        'INSERT INTO gifts (name, recipient, user_id) VALUES (?, ?, ?)',
        [name, recipient, user_id]
      );
      connection.release();
      res.json({ id: results.insertId });
    } catch (error) {
      console.error('Error storing gift:', error);
      res.status(500).json({ error: 'Error storing gift' });
    }
  });

  async function createGift (req, res, next) {
    try {
      const data = req.body;
      const 
    } catch (error) {
      return next ({status: 400, error: "El body no es correcto" , trace: error});
    }
  }
