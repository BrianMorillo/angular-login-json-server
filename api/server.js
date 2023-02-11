const jwt = require('jsonwebtoken')
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)
server.use(middlewares);

/**
 * Login handling
 */
server.post('/login', (req, res) => {
  const users = router.db.get('users').value();
  const { email, password } = req.body;
  const privateKey = 'private-fake-key';

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ sub: user.id }, privateKey, { expiresIn: '1h' })
    res.send({ access_token: token })
  } else {
    res.status(401).send({ message: 'Credentials are incorrect.' })
  }
})


server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});