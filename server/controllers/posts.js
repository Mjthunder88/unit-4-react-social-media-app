

module.exports = {
    getAllPosts: (req, res) => {
        console.log('Grabbing Posts')
        res.status(200).send('endpoint accessed')
    },
    getCurrentUserPosts: (req, res) => {
        console.log('Grabbing current user posts')
        res.status(200).send('endpoint accessed')
    },
    addPost: (req, res) => {
        console.log('Adding post')
        res.status(200).send('endpoint accessed')
    },
    editPost: (req, res) => {
        console.log('Editing post')
        res.status(200).send('endpoint accessed')
    },
    deletePost: (req, res) => {
        console.log('Deleting post')
        res.status(200).send('endpoint accessed')
    }
}