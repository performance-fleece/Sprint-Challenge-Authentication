const router = require('express').Router();

const Auth = require('./authDb.js');
const bcrypt = require('bcryptjs');
const genToken = require('./genToken.js');

router.post('/register', async (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newUser = await Auth.add(user);
    const token = genToken(newUser);
    res.status(201).json({ message: `Welcome ${user.username}`, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  try {
    Auth.findbyFilter({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = genToken(user);

          res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
