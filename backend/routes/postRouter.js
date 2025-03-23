const {Router} = require('express')
const { getPosts, createPost, getFeaturedPost, getSinglePost, getCatPost, getUserPost, editPost, deletePost } = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware, createPost)
router.get('/', getPosts)
router.get('/featured', getFeaturedPost)
router.get('/:id', getSinglePost)
router.get('/categories/:category', getCatPost)
router.get('/users/:id', getUserPost)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id',authMiddleware, deletePost)

module.exports = router