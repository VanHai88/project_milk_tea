// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
server.use(jsonServer.bodyParser)

const adapter = new FileSync('db.json')
const db = low(adapter)

server.use(middlewares)

server.post('/users', (req, res) => {
    const { email } = req.body;
    const userExist = db.get('users')
        .find({ email: email })
        .value()

    console.log(userExist);

    try {
        if (userExist) {
            res.jsonp({
                message: 'User exist'
            });

            return;
        };

        db.get('users')
            .push(req.body)
            .write()

        const token = jwt.sign({ email: req.body.email }, 'shhhhhsdadasdsadasd');
        res.jsonp({
            token,
            message: 'register successfuly'
        })
    } catch (error) {
        res.status(500);
    }

})

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("sasasadsad")
    const userExist = db.get('users')
        .find({ email: email })
        .value()

    console.log(userExist);

    try {
        if (!userExist) {
            res.jsonp({
                message: 'User not exist'
            });

            return;
        };
        if (password !== userExist.password) {
            res.jsonp({
                message: 'password incorrect'
            });

            return;
        }

        const token = jwt.sign({ email: req.body.email }, 'shhhhhsdadasdsadasd');
        res.jsonp({
            token,
            message: 'Login successfuly'
        })
    } catch (error) {
        res.status(500);
    }

})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})