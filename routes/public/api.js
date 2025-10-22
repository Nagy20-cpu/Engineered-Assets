const { v4 } = require('uuid');
const db = require('../../connectors/db');
const bcrypt=require('bcrypt')

function handlePublicBackendApi(app) {

  app.post('/api/v1/user/login', async function(req, res) {
    const { email, password } = req.body
    if (!email) {
      return res.status(400).send('email is required');
    }
    if (!password) {
      return res.status(400).send('Password is required');
    }

    // validate the provided password against the password in the database
    // if invalid, send an unauthorized code
    let user = await db.select('*').from('inventory_system.Users').where('email', email);
    console.log("user : : ",user)
    if (user.length == 0) {
      return res.status(400).send('user does not exist');
    }
    user = user[0];
    const isTrue=await bcrypt.compare(password,user.password)
    if (isTrue==false) {
      return res.status(400).send('Password does not match');
    }

    const token = v4();
    const currentDateTime = new Date();
    const expiresAt = new Date(+currentDateTime + 18000000); // expire in 3 minutes

    const session = {
      userID: user.userID, // Correct column name: user.userID
      token,
      expiresAt,
    };
    try {
      await db('inventory_system.Session').insert(session);
      // In the response, set a cookie on the client with the name "session_cookie"
      // and the value as the UUID we generated. We also set the expiration time.
      return res.cookie("session_token", token, { expires: expiresAt }).status(200).send('login successful');
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not create session');
    }
});

app.post('/api/v1/users/new', async function (req, res) {
  try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          return res.status(400).send({ message: 'Username, email, and password are required.' });
      }

      const userExists = await db.select('*').from('inventory_system.Users').where('email', email);
      if (userExists.length > 0) {
          return res.status(400).send({ message: 'User already exists.' });
      }
      const hashed = await bcrypt.hash(password,10)
      // Store the plain password directly (not recommended in production)
      const newUser = { 
        username,
         email,
          password:hashed,
           role : "standard user" };
      const user = await db('inventory_system.Users')
          .insert(newUser)
          .returning(['userID', 'username', 'email']); // Return only safe fields

      return res.status(201).json({ message: 'User registered successfully.', user });
  } catch (e) {
      console.error('Error:', e.message);
      return res.status(500).send({ message: 'Could not register user.', error: e.message });
  }
});
};

module.exports = {handlePublicBackendApi};