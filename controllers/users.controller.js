const db = require("../daos/users.dao.js");

async function all(req, res) {

    try {
        const users = await db.all();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

async function item(req, res) {
  try {
    const row = await db.item(req.params.id);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex.message});
  }
}

module.exports = {
  all,
  item,
};
