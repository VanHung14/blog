const postsRouter = require('./posts')
const categoryRouter = require('./categories')
const usersRouter = require('./users')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const registerRouter = require('./register')

function route(app){

    app.use('/posts', postsRouter)
    app.use('/categories', categoryRouter)
    app.use('/users', usersRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/logout', logoutRouter)
    
}

module.exports = route;
