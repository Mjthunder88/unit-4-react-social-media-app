require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { sequelize } = require('./util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')

const { PORT } = process.env

const { login, logout, register } = require('./controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts')

const { isAuthenticated } = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())


User.hasMany(Post)
Post.belongsTo(User)


app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated , addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated , deletePost)



//? the force: true is for development -- it DROPS tables!!!
//? you can use it if you like while you are building
//? sequelize.sync({ force: true })

sequelize.sync() 
.then(() => {
    app.listen(PORT, () => console.log(`Listining on ${PORT}`)) //* we put this inside the .then becaues it will sync our database up before it starts the server. 
})
.catch((err) => console.log(err))

