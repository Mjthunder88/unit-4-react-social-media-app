const {User} = require('../models/user')
const {Post} = require('../models/post')

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]                //? attributes is like this section in a query = SELECT "username" FROM User .... 
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log(error, 'Error in controller/ get all posts')
            res.status(400).send('error when getting all posts')
        }
    },
    getCurrentUserPosts: async (req, res) => {
        try {
            const {userId} = req.params
            const userPosts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(userPosts)
        } catch (error) {
            console.log(error, 'Error in controller/ getCurrentUserPosts')
            res.status(400).send('error when getting current user posts')
        }
    },
    addPost: async (req, res) => {
        try {
            const {title, content, status, userId} = req.body
            await Post.create({
                title: title,
                content: content,
                privateStatus: status,
                userId: userId
            })
            res.sendStatus(200)
        } catch (error) {
            console.log(error, 'Error in controller.posts')
            res.status(400).send('error when adding post')
        }
    },
    editPost: async (req, res) => {
        try {
            const {status} = req.body
            const {id} = req.params                     //? always check your endpoints to see if its a param or part of the body
              await Post.update({
                privateStatus: status
             }, {
                where: {id: +id}
             })
             res.status(200).send('Post updated')
        } catch (error) {
            console.log(error, 'Error in controller/ editPost')
            res.status(400).send('error when editing post')
        }
    },
    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({
                where: {id: +id}
            })
            res.status(200).send('Post has been deleted')
        } catch (error) {
            console.log(error, 'error in controller/ deletePost')
            res.status(400).send('error when deleting post')
        }
    }
}