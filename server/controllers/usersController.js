const User = require('../models/User');

class UsersController {
  async getUserById(req, res) {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);

      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'User search error' });
    }
  }
}

module.exports = new UsersController();
